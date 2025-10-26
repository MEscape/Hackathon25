import React from 'react';
import { View } from 'react-native';
import { Screen } from '@/components/Screen';
import { Text } from '@/components/Text';
import { Icon } from '@/components/Icon';
import { useAppTheme } from '@/theme/context';
import { useSafetyAlerts } from './safety-alerts/hooks/useSafetyAlerts';
import { SearchInput } from './safety-alerts/components/SearchInput';
import { PoliceAlertCard } from './safety-alerts/components/PoliceAlertCard';
import { WeatherAlertCard } from './safety-alerts/components/WeatherAlertCard';
import { LoadingCard } from './safety-alerts/components/LoadingCard';
import { EmptyState } from './safety-alerts/components/EmptyState';
import {
  $container,
  $header,
  $subtitle,
  $section,
  $sectionHeader,
  $sectionIconContainer,
  $sectionTitle,
  $alertsList,
  $searchResultsBadge,
  $searchResultsText,
} from './safety-alerts/styles';

export default function SafetyAlertsScreen() {
  const { themed, theme } = useAppTheme();
  const {
    query, setQuery, clearQuery,
    filteredWeather,
    policeData, policeLoading, policeError,
    weatherLoading, weatherError,
  } = useSafetyAlerts();

  return (
    <Screen preset="scroll" contentContainerStyle={themed($container)}>
      {/* Header Section */}
      <View style={themed($header)}>
        <Text preset="heading" weight="bold" tx="actions:safetyAlerts.title" />
        <Text preset="formHelper" tx="actions:safetyAlerts.subtitle" style={themed($subtitle)} />
      </View>

      {/* Search */}
      <SearchInput
        placeholderTx="actions:safetyAlerts.search.titlePlaceholder"
        value={query}
        onChangeText={setQuery}
        onClear={clearQuery}
      />

      {/* Police Alerts Section */}
      <View style={themed($section)}>
        <View style={themed($sectionHeader)}>
          <View style={themed($sectionIconContainer)}>
            <Icon icon="shield" size={18} color={theme.colors.tint} />
          </View>
          <Text preset="default" weight="semiBold" tx="actions:safetyAlerts.sections.police" style={themed($sectionTitle)} />
        </View>
        <View style={themed($alertsList)}>
          {policeLoading && <LoadingCard />}
          {policeError && <EmptyState icon="alert-circle" message="Failed to load police alerts" />}
          {!policeLoading && !policeError && (!policeData || policeData.length === 0) && (
            <EmptyState icon="shield-checkmark" message="No police alerts at this time" />
          )}
          {!policeLoading && !policeError && policeData?.map(alert => (
            <PoliceAlertCard key={alert.id} alert={alert} />
          ))}
        </View>
      </View>

      {/* Weather Alerts Section */}
      <View style={themed($section)}>
        <View style={themed($sectionHeader)}>
          <View style={themed($sectionIconContainer)}>
            <Icon icon="cloud" size={18} color={theme.colors.tint} />
          </View>
          <Text preset="default" weight="semiBold" tx="actions:safetyAlerts.sections.weather" style={themed($sectionTitle)} />
          {query && (
            <View style={themed($searchResultsBadge)}>
              <Text preset="formHelper" style={themed($searchResultsText)}>
                {filteredWeather.length} results
              </Text>
            </View>
          )}
        </View>
        <View style={themed($alertsList)}>
          {weatherLoading && <LoadingCard />}
          {weatherError && <EmptyState icon="alert-circle" message="Failed to load weather alerts" />}
          {!weatherLoading && !weatherError && filteredWeather.length === 0 && (
            <EmptyState icon="partly-sunny" message={query ? 'No weather alerts match your search' : 'No weather alerts found'} />
          )}
          {!weatherLoading && !weatherError && filteredWeather.map(item => (
            <WeatherAlertCard key={item.guid} alert={item} />
          ))}
        </View>
      </View>
    </Screen>
  );
}