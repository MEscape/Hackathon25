import { useState, useEffect, useCallback } from 'react';

import { modelService, ModelLoadProgress } from '../services/modelService';

interface UseModelLoaderReturn {
  session: any | null;
  isLoading: boolean;
  isReady: boolean;
  progress: number;
  stage: string;
  error: Error | null;
  reload: () => Promise<void>;
}

export const useModelLoader = (): UseModelLoaderReturn => {
  const [session, setSession] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState('');
  const [error, setError] = useState<Error | null>(null);

  const loadModel = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setProgress(0);
    setIsReady(false);

    try {
      const loadedSession = await modelService.loadModel(
        (progressData: ModelLoadProgress) => {
          setProgress(progressData.progress);
          setStage(progressData.stage);
        }
      );

      setSession(loadedSession);
      setIsReady(true);
    } catch (err) {
      // Fallback: model failed, but we still want to enable text search
      setSession(null); // No ONNX session
      setIsReady(true); // Ready for fallback search
      setError(null); // Do not show error in UI
      console.error('Model loading error, fallback to text search:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadModel();

    // Cleanup on unmount
    return () => {
      modelService.dispose();
    };
  }, [loadModel]);

  return {
    session,
    isLoading,
    isReady,
    progress,
    stage,
    error,
    reload: loadModel,
  };
};
