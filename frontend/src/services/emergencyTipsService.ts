import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import i18next from 'i18next';
import { emergencyTipsApi } from '@/store/api/emergencyTipsApi';
import { store } from '@/store';

// Types based on the API response format
export interface EmergencyTipImage {
  src: string;
  title: string;
  alt: string;
  lastModificationDate: number;
  hash: string;
}

export interface EmergencyTipArticle {
  title: string;
  bodyText: string;
  image?: EmergencyTipImage;
  lastModificationDate: number;
}

export interface EmergencyTip {
  title: string;
  articles: EmergencyTipArticle[];
}

export interface EmergencyTipCategory {
  title: string;
  tips: EmergencyTip[];
  eventCodes: string[];
  lastModificationDate: number;
}

export interface EmergencyTipsResponse {
  category: EmergencyTipCategory[];
  lastModificationDate: number;
}

// Flattened structure for easier searching
export interface FlattenedTip {
  id: string;
  categoryTitle: string;
  tipTitle: string;
  articleTitle: string;
  bodyText: string;
  image?: EmergencyTipImage;
  eventCodes: string[];
  searchableText: string; // Combined text for semantic search
}

const STORAGE_KEY = 'emergency_tips_cache';
const LAST_FETCH_KEY = 'emergency_tips_last_fetch';
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

class EmergencyTipsService {
  private static instance: EmergencyTipsService;
  private cachedTips: FlattenedTip[] | null = null;

  private constructor() {}

  static getInstance(): EmergencyTipsService {
    if (!EmergencyTipsService.instance) {
      EmergencyTipsService.instance = new EmergencyTipsService();
    }
    return EmergencyTipsService.instance;
  }

  // Dynamic cache keys per language
  private getStorageKey(lang: string): string {
    return `${STORAGE_KEY}:${lang}`;
  }
  private getLastFetchKey(lang: string): string {
    return `${LAST_FETCH_KEY}:${lang}`;
  }

  /**
   * Check if we have internet connectivity
   */
  private async isOnline(): Promise<boolean> {
    const netInfo = await NetInfo.fetch();
    return netInfo.isConnected === true && netInfo.isInternetReachable === true;
  }

  /**
   * Check if cached data is still valid
   */
  private async isCacheValid(lang: string): Promise<boolean> {
    try {
      const lastFetchStr = await AsyncStorage.getItem(this.getLastFetchKey(lang));
      if (!lastFetchStr) return false;
      const lastFetch = parseInt(lastFetchStr, 10);
      const now = Date.now();
      return (now - lastFetch) < CACHE_DURATION;
    } catch (error) {
      console.warn('Error checking cache validity:', error);
      return false;
    }
  }

  /**
   * Fetch tips from the API using RTK Query endpoint
   */
  private async fetchTipsFromAPI(lang: string): Promise<EmergencyTipsResponse> {
    try {
      const result = await store.dispatch(
        emergencyTipsApi.endpoints.getEmergencyTips.initiate(lang)
      );
      if ('data' in result && result.data) {
        return result.data as EmergencyTipsResponse;
      } else if ('error' in result) {
        throw new Error(`API error: ${JSON.stringify(result.error)}`);
      } else {
        throw new Error('No data received from API');
      }
    } catch (error) {
      console.error('Error fetching emergency tips from API:', error);
      throw error as Error;
    }
  }
  
  /**
   * Flatten the nested API response structure for easier searching
   */
  private flattenTips(response: EmergencyTipsResponse): FlattenedTip[] {
    const flattened: FlattenedTip[] = [];
    let idCounter = 0;

    // Handle the new structure where categories are in an array
    response.category.forEach((category) => {
      category.tips.forEach((tip) => {
        tip.articles.forEach((article) => {
          // Create searchable text by combining all relevant text fields
          const searchableText = [
            category.title,
            tip.title,
            article.title,
            article.bodyText.replace(/<[^>]*>/g, ''), // Remove HTML tags
          ].join(' ').toLowerCase();

          flattened.push({
            id: `tip_${idCounter++}`,
            categoryTitle: category.title,
            tipTitle: tip.title,
            articleTitle: article.title,
            bodyText: article.bodyText,
            image: article.image,
            eventCodes: category.eventCodes,
            searchableText,
          });
        });
      });
    });

    return flattened;
  }

  /**
   * Save tips to local storage
   */
  private async saveTipsToCache(tips: FlattenedTip[], lang: string): Promise<void> {
    try {
      await AsyncStorage.setItem(this.getStorageKey(lang), JSON.stringify(tips));
      await AsyncStorage.setItem(this.getLastFetchKey(lang), Date.now().toString());
      this.cachedTips = tips;
    } catch (error) {
      console.error('Error saving tips to cache:', error);
      throw error;
    }
  }

  /**
   * Load tips from local storage
   */
  private async loadTipsFromCache(lang: string): Promise<FlattenedTip[]> {
    try {
      const cachedData = await AsyncStorage.getItem(this.getStorageKey(lang));
      if (!cachedData) {
        return [];
      }
      
      const tips: FlattenedTip[] = JSON.parse(cachedData);
      this.cachedTips = tips;
      return tips;
    } catch (error) {
      console.error('Error loading tips from cache:', error);
      return [];
    }
  }

  /**
   * Get emergency tips - tries to fetch from API if online and cache is invalid,
   * otherwise returns cached data
   */
  async getEmergencyTips(forceRefresh = false): Promise<FlattenedTip[]> {
    try {
      const lang = i18next.language?.startsWith('de') ? 'de' : 'en';
      const isOnline = await this.isOnline();
      const isCacheValid = await this.isCacheValid(lang);

      if (!forceRefresh && isCacheValid && this.cachedTips) {
        return this.cachedTips;
      }

      if (!isOnline) {
        return await this.loadTipsFromCache(lang);
      }

      if (isOnline && (forceRefresh || !isCacheValid)) {
        try {
          const apiResponse = await this.fetchTipsFromAPI(lang);
          const flattenedTips = this.flattenTips(apiResponse);
          await this.saveTipsToCache(flattenedTips, lang);
          return flattenedTips;
        } catch (apiError) {
          console.warn('API fetch failed, falling back to cache:', apiError);
          return await this.loadTipsFromCache(lang);
        }
      }

      return await this.loadTipsFromCache(lang);
    } catch (error) {
      console.error('Error in getEmergencyTips:', error);
      try {
        const lang = i18next.language?.startsWith('de') ? 'de' : 'en';
        return await this.loadTipsFromCache(lang);
      } catch (cacheError) {
        console.error('Failed to load from cache as well:', cacheError);
        return [];
      }
    }
  }

  /**
   * Clear the cache (useful for testing or manual refresh)
   */
  async clearCache(): Promise<void> {
    try {
      await AsyncStorage.multiRemove([
        this.getStorageKey('en'),
        this.getStorageKey('de'),
        this.getLastFetchKey('en'),
        this.getLastFetchKey('de'),
      ]);
      this.cachedTips = null;
    } catch (error) {
      console.error('Error clearing cache:', error);
    }
  }

  /**
   * Get cache status information
   */
  async getCacheStatus(): Promise<{
    hasCachedData: boolean;
    lastFetch: Date | null;
    isValid: boolean;
    tipCount: number;
  }> {
    try {
      const lang = i18next.language?.startsWith('de') ? 'de' : 'en';
      const lastFetchStr = await AsyncStorage.getItem(this.getLastFetchKey(lang));
      const cachedData = await AsyncStorage.getItem(this.getStorageKey(lang));
      const isValid = await this.isCacheValid(lang);

      return {
        hasCachedData: !!cachedData,
        lastFetch: lastFetchStr ? new Date(parseInt(lastFetchStr, 10)) : null,
        isValid,
        tipCount: cachedData ? JSON.parse(cachedData).length : 0,
      };
    } catch (error) {
      console.error('Error getting cache status:', error);
      return {
        hasCachedData: false,
        lastFetch: null,
        isValid: false,
        tipCount: 0,
      };
    }
  }
}

export default EmergencyTipsService;