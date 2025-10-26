import { useState, useEffect } from 'react';
import i18next from 'i18next';

// Import mock data
import mockDataEn from '@/../assets/mock-data/nina-notfalltipps-en.json';
import mockDataDe from '@/../assets/mock-data/nina-notfalltipps-de.json';
import {EmergencyTipsResponse, FlattenedTip} from "@/features/emergencyAssistant";
import {flattenTips} from "@/features/emergencyAssistant/services/tipService";


export const useEmergencyTips = () => {
  const [tips, setTips] = useState<FlattenedTip[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadTips = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Determine language - default to 'de' if not English
        const lang = i18next.language?.startsWith('en') ? 'en' : 'de';
        
        // Select appropriate mock data based on language
        const mockData = lang === 'en' ? mockDataEn : mockDataDe;
        
        // Process the mock data the same way as the service would
        const flattenedTips = flattenTips(mockData as EmergencyTipsResponse);
        setTips(flattenedTips);
        
        console.log(`Loaded ${flattenedTips.length} emergency tips for language: ${lang}`);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to load tips';
        console.error('Error loading emergency tips from mock data:', errorMessage, err);
        
        // Set error state but don't show it in the UI - only log to console
        setError(err instanceof Error ? err : new Error(errorMessage));
        
        // Set empty array as fallback
        setTips([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadTips();
  }, [i18next.language]);

  // Return error as null so it doesn't show in the UI, but keep it for debugging
  return { tips, isLoading, error: null };
};