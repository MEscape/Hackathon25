import { useState, useCallback } from 'react';

import { InferenceSession } from 'onnxruntime-react-native';

import { translate } from '@/i18n';

import { modelService } from '../services/modelService';
import {
  generateContextualResponse,
  generateFallbackResponse,
} from '../services/responseGenerator';
import { findRelevantTips } from '../services/tipService';
import type { Message, FlattenedTip } from '../types';

export const useMessageHandler = (
  emergencyTips: FlattenedTip[],
  onnxSession: InferenceSession | null
) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const addMessage = useCallback(
    (role: 'user' | 'assistant', content: string) => {
      const newMessage: Message = {
        id: Date.now().toString() + Math.random(),
        role,
        content,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, newMessage]);
    },
    []
  );

  const handleSendMessage = useCallback(
    async (query: string) => {
      if (!query.trim() || isProcessing) return;

      addMessage('user', query);
      setIsProcessing(true);

      try {
        // Find relevant tips via semantic search when available, else fallback
        let relevantTips: FlattenedTip[];

        if (onnxSession) {
          try {
            console.log('Using ONNX model for semantic search');
            relevantTips = await modelService.runInference(
              query,
              emergencyTips,
              3
            );
          } catch (error) {
            console.warn(
              'ONNX inference failed, falling back to text processing:',
              error
            );
            relevantTips = findRelevantTips(query, emergencyTips);
          }
        } else {
          relevantTips = findRelevantTips(query, emergencyTips);
        }

        // Generate response (with or without model enhancement)
        const response =
          relevantTips.length > 0
            ? generateContextualResponse(query, relevantTips)
            : generateFallbackResponse(query);

        // Simulate processing time for better UX
        await new Promise(resolve => setTimeout(resolve, 1000));

        addMessage('assistant', response);
      } catch (error) {
        console.error('Error generating response:', error);
        addMessage(
          'assistant',
          translate('emergencyAssistant:responses.general')
        );
      } finally {
        setIsProcessing(false);
      }
    },
    [emergencyTips, onnxSession, isProcessing, addMessage]
  );

  return {
    messages,
    isProcessing,
    addMessage,
    handleSendMessage,
  };
};
