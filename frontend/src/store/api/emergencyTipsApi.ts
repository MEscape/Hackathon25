import { apiSlice } from './baseApi';
import type { 
  EmergencyTipsResponse,
  EmergencyTipCategory,
  EmergencyTip,
  EmergencyTipArticle,
  EmergencyTipImage 
} from '@/services/emergencyTipsService';

// Export the types for use in other files
export type {
  EmergencyTipsResponse,
  EmergencyTipCategory,
  EmergencyTip,
  EmergencyTipArticle,
  EmergencyTipImage
};

export const emergencyTipsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Accept language parameter: 'en' or 'de'
    getEmergencyTips: builder.query<EmergencyTipsResponse, string>({
      query: (lang) => ({
        url: `/nina/notfalltipps/tips/${lang}`,
        method: 'GET',
      }),
      // Cache for 24 hours (same as the service cache duration)
      keepUnusedDataFor: 24 * 60 * 60, // 24 hours in seconds
      // Tag for cache invalidation
      providesTags: ['EmergencyTips'],
    }),
  }),
  overrideExisting: true,
});

// Export hooks for use in components
export const { useGetEmergencyTipsQuery, useLazyGetEmergencyTipsQuery } = emergencyTipsApi;

// Export the endpoint matcher for use in middleware
export const { getEmergencyTips } = emergencyTipsApi.endpoints;