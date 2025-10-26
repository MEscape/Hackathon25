import Constants from 'expo-constants';
// Import model from assets (no Python needed!)
// @ts-ignore
import MODEL_FILE from '@assets/models/e5-small/model.onnx';

// Conditional import für ONNX Runtime
let InferenceSession: any = null;
let Tensor: any = null;
let onnxAvailable = false;

const isExpoGo = Constants.appOwnership === 'expo';

if (!isExpoGo) {
  try {
    // More robust ONNX Runtime import with better error handling
    const onnx = require('onnxruntime-react-native');
    
    // Check if the ONNX Runtime is properly loaded
    if (onnx && onnx.InferenceSession && onnx.Tensor) {
      InferenceSession = onnx.InferenceSession;
      Tensor = onnx.Tensor;
      onnxAvailable = true;
      console.log('✅ ONNX Runtime successfully loaded in embeddingModel');
    } else {
      console.log('⚠️ ONNX Runtime module loaded but InferenceSession/Tensor not available');
    }
  } catch (error) {
    console.log('❌ ONNX Runtime nicht verfügbar in embeddingModel:', error);
    // Ensure variables remain null
    InferenceSession = null;
    Tensor = null;
    onnxAvailable = false;
  }
} else {
  console.log('📱 Running in Expo Go - ONNX Runtime not available');
}

export class EmbeddingModel {
  private session: typeof InferenceSession | null = null;
  private readonly MAX_LENGTH = 512;
  private readonly EMBEDDING_DIM = 384;

  /**
   * Load model - runs entirely on Android device
   * No Python, no server required!
   */
  async initialize(): Promise<boolean> {
    try {
      if (!onnxAvailable || !InferenceSession || !Tensor) {
        console.log(
          'ℹ️ ONNX Runtime nicht verfügbar - EmbeddingModel im Fallback-Modus'
        );
        return false;
      }

      console.log('🚀 Loading model on Android device...');

      // Create ONNX session - this runs in C++ on your Android device
      this.session = await InferenceSession.create(MODEL_FILE, {
        executionProviders: ['cpu'], // Can use 'nnapi' for Android Neural Networks API
        graphOptimizationLevel: 'all',
        enableCpuMemArena: true,
      });

      console.log('✅ Model loaded successfully on Android!');
      console.log('📋 Model inputs:', this.session.inputNames);
      console.log(' Model outputs:', this.session.outputNames);

      return true;
    } catch (error) {
      console.error('❌ Failed to load model:', error);
      return false;
    }
  }

  /**
   * Generate embeddings - runs on Android CPU/GPU
   * Processing happens locally on your phone
   */
  async embed(text: string): Promise<Float32Array | null> {
    if (!onnxAvailable || !this.session || !Tensor || !InferenceSession) {
      console.log('🔄 ONNX not available - skipping embedding generation');
      return null;
    }

    try {
      // 1. Tokenize text (simple version - see proper tokenization below)
      const tokens = this.tokenize(text);

      // 2. Create input tensors
      const inputIds = new Tensor(
        'int64',
        BigInt64Array.from(tokens.inputIds.map(BigInt)),
        [1, this.MAX_LENGTH]
      );

      const attentionMask = new Tensor(
        'int64',
        BigInt64Array.from(tokens.attentionMask.map(BigInt)),
        [1, this.MAX_LENGTH]
      );

      // 3. Run inference ON YOUR ANDROID DEVICE
      const feeds = {
        input_ids: inputIds,
        attention_mask: attentionMask,
      };

      console.log('🔄 Running inference on device...');
      const startTime = Date.now();

      const outputs = await this.session.run(feeds);

      const endTime = Date.now();
      console.log(`✅ Inference completed in ${endTime - startTime}ms`);

      // 4. Extract embeddings
      const lastHiddenState =
        outputs.last_hidden_state || outputs[this.session.outputNames[0]];
      return this.meanPooling(
        lastHiddenState.data as Float32Array,
        tokens.attentionMask
      );
    } catch (error) {
      console.error('Inference error:', error);
      return null;
    }
  }

  /**
   * Simple tokenization (runs on Android)
   * For production, use a proper tokenizer library
   */
  private tokenize(text: string): {
    inputIds: number[];
    attentionMask: number[];
  } {
    // Add E5 query prefix
    const prefixedText = `query: ${text}`;

    // Simple character-based tokenization (replace with proper tokenizer)
    const CLS_TOKEN = 101;
    const SEP_TOKEN = 102;
    const PAD_TOKEN = 0;

    const tokens = [CLS_TOKEN];

    // Convert text to tokens
    for (
      let i = 0;
      i < prefixedText.length && tokens.length < this.MAX_LENGTH - 1;
      i++
    ) {
      const charCode = prefixedText.charCodeAt(i);
      tokens.push(charCode % 30000); // Simple vocab mapping
    }

    tokens.push(SEP_TOKEN);

    // Create attention mask (1 for real tokens, 0 for padding)
    const attentionMask = tokens.map(() => 1);

    // Pad to MAX_LENGTH
    while (tokens.length < this.MAX_LENGTH) {
      tokens.push(PAD_TOKEN);
      attentionMask.push(0);
    }

    return {
      inputIds: tokens.slice(0, this.MAX_LENGTH),
      attentionMask: attentionMask.slice(0, this.MAX_LENGTH),
    };
  }

  /**
   * Mean pooling for sentence embeddings
   */
  private meanPooling(
    embeddings: Float32Array,
    attentionMask: number[]
  ): Float32Array {
    const result = new Float32Array(this.EMBEDDING_DIM);
    let tokenCount = 0;

    for (let i = 0; i < attentionMask.length; i++) {
      if (attentionMask[i] === 1) {
        for (let j = 0; j < this.EMBEDDING_DIM; j++) {
          result[j] += embeddings[i * this.EMBEDDING_DIM + j];
        }
        tokenCount++;
      }
    }

    // Average pooling
    for (let i = 0; i < this.EMBEDDING_DIM; i++) {
      result[i] /= tokenCount;
    }

    return result;
  }

  /**
   * Calculate similarity between two embeddings
   */
  cosineSimilarity(a: Float32Array, b: Float32Array): number {
    let dot = 0,
      normA = 0,
      normB = 0;

    for (let i = 0; i < a.length; i++) {
      dot += a[i] * b[i];
      normA += a[i] * a[i];
      normB += b[i] * b[i];
    }

    return dot / (Math.sqrt(normA) * Math.sqrt(normB));
  }

  async dispose(): Promise<void> {
    this.session = null;
  }
}