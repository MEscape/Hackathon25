import { useState, useEffect} from 'react';
import { translate } from '@/i18n';
import { useEmergencyTips } from './useEmergencyTips';
import { useMessageHandler } from './useMessageHandler';
import { useModelLoader } from './useModelLoader';

export const useEmergencyAssistant = () => {
  const [initComplete, setInitComplete] = useState(false);
  const [welcomeMessageAdded, setWelcomeMessageAdded] = useState(false);

  const { tips, isLoading: tipsLoading } = useEmergencyTips();
  const {
    session: onnxSession,
    isLoading: modelLoading,
    isReady: isModelReady,
    progress: modelLoadProgress,
    stage: modelLoadStage,
    error: modelError
  } = useModelLoader();

  const { messages, isProcessing, addMessage, handleSendMessage } = useMessageHandler(tips, onnxSession);

  // Add welcome message immediately when component mounts
  useEffect(() => {
    if (!welcomeMessageAdded) {
      addMessage('assistant', translate('emergencyAssistant:systemReady'));
      setWelcomeMessageAdded(true);
    }
  }, [addMessage, welcomeMessageAdded]);

  // Handle additional messages after loading completes
  useEffect(() => {
    if (!tipsLoading && !modelLoading && !initComplete && welcomeMessageAdded) {
      setInitComplete(true);

      if (modelError) {
        console.log('Emergency Assistant: Model error detected, adding error message');
        addMessage('assistant', translate('emergencyAssistant:aiError'));
      } else if (!isModelReady) {
        // Fallback to text processing
        console.log('Emergency Assistant: Model not ready, adding fallback message');
        addMessage('assistant', translate('emergencyAssistant:modelReady'));
      }
    }
  }, [tipsLoading, modelLoading, initComplete, modelError, isModelReady, addMessage, welcomeMessageAdded]);

  return {
    messages,
    isProcessing,
    isModelReady: isModelReady || (!modelLoading && !modelError), // Consider ready if using fallback
    modelLoadProgress,
    modelLoadStage,
    onnxSession,
    handleSendMessage,
  };
};