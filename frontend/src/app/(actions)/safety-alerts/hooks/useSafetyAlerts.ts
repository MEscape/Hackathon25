import { useMemo, useState, useCallback } from 'react';

import type { PoliceAlert } from '@/features/safetyAlerts/schemas/safetyAlerts.schema';
import type { WeatherAlert } from '@/features/safetyAlerts/schemas/weatherAlerts.schema';
import { useGetPoliceAlertsQuery } from '@/features/safetyAlerts/store/safetyAlertsApi';
import { useGetWeatherAlertsEnglishQuery } from '@/features/safetyAlerts/store/weatherAlertsApi';

export function useSafetyAlerts() {
  const {
    data: policeData,
    isLoading: policeLoading,
    isError: policeError,
  } = useGetPoliceAlertsQuery();
  const {
    data: weatherData,
    isLoading: weatherLoading,
    isError: weatherError,
  } = useGetWeatherAlertsEnglishQuery();

  const [query, setQuery] = useState('');
  const normalizedQuery = query.trim().toLowerCase();

  const filteredWeather: WeatherAlert[] = useMemo(() => {
    if (!weatherData) return [];
    return weatherData.filter(item => {
      const title = (item.title || '').toLowerCase();
      const description = (item.description || '').toLowerCase();
      const matches =
        !normalizedQuery ||
        title.includes(normalizedQuery) ||
        description.includes(normalizedQuery);
      return matches;
    });
  }, [weatherData, normalizedQuery]);

  const clearQuery = useCallback(() => setQuery(''), []);

  return {
    query,
    setQuery,
    clearQuery,
    filteredWeather,
    policeData: policeData as PoliceAlert[] | undefined,
    policeLoading,
    policeError,
    weatherData: weatherData as WeatherAlert[] | undefined,
    weatherLoading,
    weatherError,
  };
}
