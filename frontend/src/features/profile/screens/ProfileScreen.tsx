import React, { useEffect } from 'react';

import { View, ViewStyle } from 'react-native';

import { Screen } from '@/components/Screen';
import { Skeleton } from '@/components/Skeleton';
import { Text } from '@/components/Text';
import { EditableField, ProfileSection } from '@/features/profile/components';
import { useProfile } from '@/features/profile/hooks';
import { useAuth } from '@/hooks/useAuth';
import { translate } from '@/i18n';
import { useAppTheme } from '@/theme/context';
import { ThemedStyle } from '@/theme/types';

export default function ProfileScreen() {
  const { themed } = useAppTheme();
  const { user } = useAuth();
  const {
    bloodType,
    job,
    allergies,
    preExistingConditions,
    medication,
    vaccinationStatus,
    isLoading,
    updateBloodType,
    updateJob,
    updateAllergies,
    updatePreExistingConditions,
    updateMedication,
    updateVaccinationStatus,
    refetchMetadata,
  } = useProfile();

  // Fetch metadata
  useEffect(() => {
    refetchMetadata();
  }, [refetchMetadata]);

  if (isLoading) {
    return (
      <Screen preset="scroll" contentContainerStyle={themed($container)}>
        <Text preset="heading" weight="bold" tx="actions:profile.title" />
        <Text preset="formHelper" tx="actions:profile.subtitle" />
        <View style={themed($list)}>
          <Skeleton height={100} />
          <Skeleton height={200} />
          <Skeleton height={150} />
        </View>
      </Screen>
    );
  }

  return (
    <Screen preset="scroll" contentContainerStyle={themed($container)}>
      <Text preset="heading" weight="bold" tx="actions:profile.title" />
      <Text preset="formHelper" tx="actions:profile.subtitle" />

      <View style={themed($list)}>
        {/* Basic Information */}
        <ProfileSection
          title={translate('profile:sections.basicInfo')}
          subtitle={translate('profile:subtitle')}
        >
          <View style={themed($row)}>
            <Text
              preset="default"
              weight="semiBold"
              text={translate('profile:fields.name')}
            />
            <Text
              preset="formHelper"
              text={user?.preferred_username || user?.given_name}
            />
          </View>
          <View style={themed($row)}>
            <Text
              preset="default"
              weight="semiBold"
              text={translate('profile:fields.email')}
            />
            <Text preset="formHelper" text={user?.email} />
          </View>
        </ProfileSection>

        {/* Medical Information */}
        <ProfileSection
          title={translate('profile:sections.medicalInfo')}
          subtitle={translate('profile:subtitle')}
        >
          <EditableField
            label={translate('profile:fields.bloodType')}
            value={bloodType}
            placeholder={translate('profile:placeholders.bloodType')}
            onSave={updateBloodType}
            isLoading={isLoading}
          />
          <EditableField
            label={translate('profile:fields.allergies')}
            value={allergies}
            placeholder={translate('profile:placeholders.allergies')}
            onSave={updateAllergies}
            isLoading={isLoading}
            multiline
          />
          <EditableField
            label={translate('profile:fields.preExistingConditions')}
            value={preExistingConditions}
            placeholder={translate(
              'profile:placeholders.preExistingConditions'
            )}
            onSave={updatePreExistingConditions}
            isLoading={isLoading}
            multiline
          />
          <EditableField
            label={translate('profile:fields.medications')}
            value={medication}
            placeholder={translate('profile:placeholders.medications')}
            onSave={updateMedication}
            isLoading={isLoading}
            multiline
          />
          <EditableField
            label={translate('profile:fields.vaccinationStatus')}
            value={vaccinationStatus}
            placeholder={translate('profile:placeholders.vaccinationStatus')}
            onSave={updateVaccinationStatus}
            isLoading={isLoading}
            multiline
          />
        </ProfileSection>

        {/* Personal Information */}
        <ProfileSection
          title={translate('profile:sections.personalInfo')}
          subtitle={translate('profile:subtitle')}
        >
          <EditableField
            label={translate('profile:fields.jobTitle')}
            value={job}
            placeholder={translate('profile:placeholders.jobTitle')}
            onSave={updateJob}
            isLoading={isLoading}
          />
        </ProfileSection>
      </View>
    </Screen>
  );
}

const $container: ThemedStyle<ViewStyle> = theme => ({
  padding: theme.spacing.lg,
  gap: theme.spacing.md,
});

const $list: ThemedStyle<ViewStyle> = theme => ({
  gap: theme.spacing.sm,
});

const $row: ThemedStyle<ViewStyle> = () => ({
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
});
