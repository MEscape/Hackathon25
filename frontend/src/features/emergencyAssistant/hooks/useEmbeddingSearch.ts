import { useState, useEffect } from 'react';

import { EmbeddingModel } from '@/services/embeddingModel';

import type { FlattenedTip } from '../types';

export const useEmbeddingSearch = (tips: FlattenedTip[]) => {
  const [model, setModel] = useState<EmbeddingModel | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [tipEmbeddings, setTipEmbeddings] = useState<Map<string, Float32Array>>(
    new Map()
  );

  useEffect(() => {
    const initModel = async () => {
      const embeddingModel = new EmbeddingModel();
      const success = await embeddingModel.initialize();

      if (success) {
        setModel(embeddingModel);
        await indexTips(embeddingModel, tips);
        setIsReady(true);
      }
    };

    initModel();

    return () => {
      model?.dispose();
    };
  }, []);

  const indexTips = async (model: EmbeddingModel, tips: FlattenedTip[]) => {
    console.log('Indexing emergency tips...');
    const embeddings = new Map<string, Float32Array>();

    for (const tip of tips) {
      const text = `${tip.tipTitle}: ${tip.articleTitle}`;
      const embedding = await model.embed(text);

      if (embedding) {
        embeddings.set(tip.id, embedding);
      }
    }

    setTipEmbeddings(embeddings);
    console.log(`Indexed ${embeddings.size} tips`);
  };

  const search = async (
    query: string,
    topK: number = 3
  ): Promise<FlattenedTip[]> => {
    if (!model || !isReady) {
      // Fallback: simple text search if model is not ready
      const lowerQuery = query.toLowerCase();
      return tips
        .filter(
          tip =>
            tip.tipTitle.toLowerCase().includes(lowerQuery) ||
            tip.articleTitle.toLowerCase().includes(lowerQuery)
        )
        .slice(0, topK);
    }

    const queryEmbedding = await model.embed(query);
    if (!queryEmbedding) return [];

    const scores = tips.map(tip => {
      const tipEmbedding = tipEmbeddings.get(tip.id);
      if (!tipEmbedding) return { tip, score: 0 };

      const similarity = model.cosineSimilarity(queryEmbedding, tipEmbedding);
      return { tip, score: similarity };
    });

    return scores
      .sort((a, b) => b.score - a.score)
      .slice(0, topK)
      .map(item => item.tip);
  };

  return { search, isReady, model };
};
