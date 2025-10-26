import { Platform } from 'react-native';

import { Asset } from 'expo-asset';
import Constants from 'expo-constants';

import * as FileSystemLegacy from 'expo-file-system/legacy';
import { documentDirectory } from 'expo-file-system/legacy';

import { EmbeddingModel } from '@/services/embeddingModel';

import type { FlattenedTip } from '../types';

let InferenceSession: any = null;
let Tensor: any = null; // Ensure Tensor is declared to avoid ReferenceError

const isExpoGo = Constants.appOwnership === 'expo';

if (!isExpoGo) {
  try {
    const onnx = require('onnxruntime-react-native');
    InferenceSession = onnx.InferenceSession;
    Tensor = onnx.Tensor;
    console.log(' ONNX Runtime loaded');
  } catch (error) {
    console.log('ONNX Runtime not available, using fallback:', error);
  }
}

export interface ModelLoadProgress {
  progress: number;
  stage: string;
}

export class ModelService {
  private session: any = null;
  private onnxAvailable: boolean = InferenceSession !== null;
  private embeddingModel: EmbeddingModel | null = null;

  // Decode base64 to Uint8Array without relying on atob/Buffer
  private base64ToUint8Array(base64: string): Uint8Array {
    const clean = base64.replace(/[^A-Za-z0-9+/=]/g, '');
    const len = clean.length;
    const placeholders = clean.endsWith('==') ? 2 : clean.endsWith('=') ? 1 : 0;
    const bytesLen = (len * 3) / 4 - placeholders;
    const bytes = new Uint8Array(bytesLen);

    const chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
    const lookup = new Uint8Array(256);
    for (let i = 0; i < chars.length; i++) {
      lookup[chars.charCodeAt(i)] = i;
    }

    let i = 0;
    let p = 0;
    while (i < len) {
      const c1 = lookup[clean.charCodeAt(i++)];
      const c2 = lookup[clean.charCodeAt(i++)];
      const c3 = lookup[clean.charCodeAt(i++)];
      const c4 = lookup[clean.charCodeAt(i++)];
      const combined = (c1 << 18) | (c2 << 12) | (c3 << 6) | c4;
      bytes[p++] = (combined >> 16) & 0xff;
      if (p < bytesLen) bytes[p++] = (combined >> 8) & 0xff;
      if (p < bytesLen) bytes[p++] = combined & 0xff;
    }
    return bytes;
  }

  /**
   * Attempts to resolve the model asset using multiple strategies
   */
  private async resolveModelAsset(): Promise<string | null> {
    try {
      const modelModuleId = require('../../../../assets/models/e5-small/model.onnx');
      const asset = Asset.fromModule(modelModuleId);
      const uri = asset.localUri ?? asset.uri;
      console.log('Resolved asset URI:', uri);

      if (uri.startsWith('http://') || uri.startsWith('https://')) {
        console.log('Downloading model from HTTP URL to local storage...');
        try {
          if (!documentDirectory) {
            throw new Error('Document directory not available');
          }

          const localPath = `${documentDirectory}model.onnx`;

          // Check if file already exists
          const fileInfo = await FileSystemLegacy.getInfoAsync(localPath);
          if (fileInfo.exists) {
            console.log(
              'Model already exists locally, using cached version:',
              localPath
            );
            return localPath;
          }

          // Download the file
          const downloadResult = await FileSystemLegacy.downloadAsync(
            uri,
            localPath
          );
          console.log('Model downloaded to local storage:', downloadResult.uri);
          return downloadResult.uri;
        } catch (downloadError) {
          console.error(
            'Failed to download model to local storage:',
            downloadError
          );
          return null;
        }
      } else {
        // Already a local file path, return as-is
        return uri;
      }
    } catch (assetError) {
      console.error('Failed to resolve asset:', assetError);
      return null;
    }
  }

  async loadModel(
    onProgress?: (progress: ModelLoadProgress) => void
  ): Promise<any> {
    try {
      console.log('Starting Model Service...');
      console.log('Environment:', {
        platform: Platform.OS,
        isExpoGo,
        onnxAvailable: this.onnxAvailable,
      });

      onProgress?.({ progress: 10, stage: 'Initialization' });

      if (!this.onnxAvailable) {
        console.log('Using text-based search (no ONNX available)');
        onProgress?.({ progress: 100, stage: 'Ready (Text mode)' });
        return null;
      }

      onProgress?.({ progress: 30, stage: 'Resolving model asset' });

      // Use the robust asset resolution method
      const modelUri = await this.resolveModelAsset();
      if (!modelUri) {
        console.error('Failed to resolve model asset');
        console.log('Falling back to text-based search mode');
        onProgress?.({ progress: 100, stage: 'Ready (Text mode)' });
        return null;
      }

      onProgress?.({ progress: 60, stage: 'Model asset resolved' });

      // ONNX Runtime needs path without the file:// prefix
      let modelPath = modelUri;
      if (modelPath.startsWith('file://')) {
        modelPath = modelPath.substring(7);
      }

      // Validate the model path
      console.log('Original modelUri:', modelUri);
      console.log('Processed modelPath:', modelPath);
      console.log('ModelPath type:', typeof modelPath);
      console.log('ModelPath length:', modelPath.length);

      // Additional validation for the path
      if (!modelPath || modelPath.trim().length === 0) {
        throw new Error(`Invalid model path: ${modelPath}`);
      }

      // Check if the file exists (for local files)
      if (modelPath.startsWith('/') || modelPath.match(/^[A-Za-z]:/)) {
        try {
          const fileInfo = await FileSystemLegacy.getInfoAsync(modelPath);
          if (!fileInfo.exists) {
            throw new Error(`Model file does not exist at path: ${modelPath}`);
          }
          console.log('Model file exists, size:', fileInfo.size);
        } catch (fileCheckError) {
          console.warn('Could not verify file existence:', fileCheckError);
        }
      }

      onProgress?.({ progress: 70, stage: 'Loading ONNX model' });

      console.log('Creating ONNX session with path:', modelPath);

      try {
        // Try to create ONNX session with path first
        this.session = await InferenceSession.create(modelPath);
        console.log('ONNX session created successfully with path');
      } catch (pathError) {
        console.warn(
          'Failed to create session with path, trying buffer approach:',
          pathError
        );

        try {
          // Fallback: Try to load as buffer
          console.log('Attempting to load model as buffer...');

          // Read file as base64 using the correct URI
          const sourceUri = modelUri.startsWith('file://')
            ? modelUri
            : `file://${modelPath}`;
          const modelBase64 = await FileSystemLegacy.readAsStringAsync(
            sourceUri,
            {
              encoding: 'base64',
            }
          );

          // Convert base64 to Uint8Array
          const bytes = this.base64ToUint8Array(modelBase64);
          console.log('Model buffer created, size:', bytes.length);

          // Create session from buffer
          this.session = await InferenceSession.create(bytes);
          console.log('ONNX session created successfully with buffer');
        } catch (bufferError) {
          console.error('Failed to create session with buffer:', bufferError);
          const pathMsg =
            pathError instanceof Error ? pathError.message : String(pathError);
          const bufferMsg =
            bufferError instanceof Error
              ? bufferError.message
              : String(bufferError);
          throw new Error(
            `Both path and buffer approaches failed. Path error: ${pathMsg}, Buffer error: ${bufferMsg}`
          );
        }
      }

      // Initialize EmbeddingModel
      this.embeddingModel = new EmbeddingModel();
      await this.embeddingModel.initialize();
      console.log('EmbeddingModel initialized successfully');

      console.log('ONNX model successfully loaded');
      onProgress?.({ progress: 100, stage: 'Ready' });
      return this.session;
    } catch (error) {
      onProgress?.({ progress: 100, stage: 'Ready (Text mode)' });
      console.error('Error while loading model:', error);
      if (error instanceof Error) {
        console.error('Error message:', error.message);
        console.error('Error stack:', error.stack);
      }
      onProgress?.({ progress: 100, stage: 'Ready (Fallback)' });
      return null;
    }
  }

  /**
   * Perform semantic search using embeddings and cosine similarity
   * @param query The search query
   * @param tips Array of tips to search
   * @param topK Number of top results to return
   */
  async runInference(
    query: string,
    tips: FlattenedTip[],
    topK: number = 3
  ): Promise<FlattenedTip[]> {
    if (!this.embeddingModel || !this.session) {
      console.log('ℹRunning in text-based mode (no ONNX)');
      // Fallback: simple text search
      const lowerQuery = query.toLowerCase();
      return tips
        .filter(
          (tip: FlattenedTip) =>
            tip.tipTitle.toLowerCase().includes(lowerQuery) ||
            tip.articleTitle.toLowerCase().includes(lowerQuery)
        )
        .slice(0, topK);
    }

    try {
      // Embed the query
      const queryEmbedding = await this.embeddingModel.embed(query);
      if (!queryEmbedding) return [];

      // Embed all tips (cache in production)
      const scores = await Promise.all(
        tips.map(async (tip: FlattenedTip) => {
          const text = `${tip.tipTitle}: ${tip.articleTitle}`;
          const tipEmbedding = await this.embeddingModel!.embed(text);
          if (!tipEmbedding) return { tip, score: 0 };
          const similarity = this.embeddingModel!.cosineSimilarity(
            queryEmbedding,
            tipEmbedding
          );
          return { tip, score: similarity };
        })
      );

      return scores
        .sort((a, b) => b.score - a.score)
        .slice(0, topK)
        .map(item => item.tip);
    } catch (error) {
      console.error('Inference error:', error);
      return [];
    }
  }
  async dispose(): Promise<void> {
    console.log('Disposing ONNX session');
    this.session = null;
    if (this.embeddingModel) {
      await this.embeddingModel.dispose();
      this.embeddingModel = null;
    }
    // Note: We don't automatically cleanup the downloaded model as it can be reused
    // Call cleanupDownloadedModel() manually if needed
  }
}

export const modelService = new ModelService();
