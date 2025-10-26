import { useCallback, useEffect } from 'react';

import Toast from 'react-native-toast-message';
import { useDispatch, useSelector } from 'react-redux';

import { translate } from '@/i18n';

import type { UserMetadata } from '../schemas/profile.schema';
import {
  useGetUserMetadataQuery,
  useUpdateBloodType,
  useUpdateJob,
  useUpdateAllergies,
  useUpdatePreExistingConditions,
  useUpdateMedication,
  useUpdateVaccinationStatus,
} from '../store/profileApi';
import {
  setMetadata,
  updateMetadataField,
  setLoading,
  setError,
  clearError,
  setEditing,
  clearMetadata,
  selectProfile,
  selectMetadata,
  selectProfileLoading,
  selectProfileError,
  selectIsEditing,
  selectEditingField,
  selectBloodType,
  selectJob,
  selectAllergies,
  selectPreExistingConditions,
  selectMedication,
  selectVaccinationStatus,
} from '../store/profileSlice';

export const useProfile = () => {
  const dispatch = useDispatch();

  // Selectors
  const profile = useSelector(selectProfile);
  const metadata = useSelector(selectMetadata);
  const isLoading = useSelector(selectProfileLoading);
  const error = useSelector(selectProfileError);
  const isEditing = useSelector(selectIsEditing);
  const editingField = useSelector(selectEditingField);
  const bloodType = useSelector(selectBloodType);
  const job = useSelector(selectJob);
  const allergies = useSelector(selectAllergies);
  const preExistingConditions = useSelector(selectPreExistingConditions);
  const medication = useSelector(selectMedication);
  const vaccinationStatus = useSelector(selectVaccinationStatus);

  // API hooks
  const {
    data: metadataFromApi,
    isLoading: isLoadingMetadata,
    error: metadataError,
    refetch: refetchMetadata,
  } = useGetUserMetadataQuery();

  const updateBloodType = useUpdateBloodType();
  const updateJob = useUpdateJob();
  const updateAllergies = useUpdateAllergies();
  const updatePreExistingConditions = useUpdatePreExistingConditions();
  const updateMedication = useUpdateMedication();
  const updateVaccinationStatus = useUpdateVaccinationStatus();

  // Actions
  const handleSetMetadata = useCallback(
    (newMetadata: UserMetadata) => {
      dispatch(setMetadata(newMetadata));
    },
    [dispatch]
  );

  const handleUpdateField = useCallback(
    (field: string, value: any) => {
      dispatch(updateMetadataField({ field, value }));
    },
    [dispatch]
  );

  const handleSetLoading = useCallback(
    (loading: boolean) => {
      dispatch(setLoading(loading));
    },
    [dispatch]
  );

  const handleSetError = useCallback(
    (errorMessage: string) => {
      dispatch(setError(errorMessage));
      Toast.show({
        type: 'error',
        text1: translate('common:error'),
        text2: errorMessage,
      });
    },
    [dispatch]
  );

  const handleClearError = useCallback(() => {
    dispatch(clearError());
  }, [dispatch]);

  const handleSetEditing = useCallback(
    (editing: boolean, field?: string) => {
      dispatch(setEditing({ isEditing: editing, field }));
    },
    [dispatch]
  );

  const handleClearMetadata = useCallback(() => {
    dispatch(clearMetadata());
  }, [dispatch]);

  // Process API data when received
  useEffect(() => {
    if (metadataFromApi && !isLoadingMetadata) {
      handleSetMetadata(metadataFromApi);
    }
  }, [metadataFromApi, isLoadingMetadata, handleSetMetadata]);

  const handleUpdateBloodType = useCallback(
    async (bloodTypeValue: string) => {
      try {
        await updateBloodType(bloodTypeValue);
        Toast.show({
          type: 'success',
          text1: translate('profile:messages.updateSuccess'),
          text2: translate('profile:messages.bloodTypeUpdated'),
        });
      } catch (error: any) {
        handleSetError(
          error?.data?.message || translate('profile:messages.updateError')
        );
      }
    },
    [updateBloodType, handleSetError]
  );

  const handleUpdateJob = useCallback(
    async (jobValue: string) => {
      try {
        await updateJob(jobValue);
        Toast.show({
          type: 'success',
          text1: translate('profile:messages.updateSuccess'),
          text2: translate('profile:messages.jobUpdated'),
        });
      } catch (error: any) {
        handleSetError(
          error?.data?.message || translate('profile:messages.updateError')
        );
      }
    },
    [updateJob, handleSetError]
  );

  const handleUpdateAllergies = useCallback(
    async (allergiesValue: string) => {
      try {
        await updateAllergies(allergiesValue);
        Toast.show({
          type: 'success',
          text1: translate('profile:messages.updateSuccess'),
          text2: translate('profile:messages.allergiesUpdated'),
        });
      } catch (error: any) {
        handleSetError(
          error?.data?.message || translate('profile:messages.updateError')
        );
      }
    },
    [updateAllergies, handleSetError]
  );

  const handleUpdatePreExistingConditions = useCallback(
    async (conditionsValue: string) => {
      try {
        await updatePreExistingConditions(conditionsValue);
        Toast.show({
          type: 'success',
          text1: translate('profile:messages.updateSuccess'),
          text2: translate('profile:messages.conditionsUpdated'),
        });
      } catch (error: any) {
        handleSetError(
          error?.data?.message || translate('profile:messages.updateError')
        );
      }
    },
    [updatePreExistingConditions, handleSetError]
  );

  const handleUpdateMedication = useCallback(
    async (medicationValue: string) => {
      try {
        await updateMedication(medicationValue);
        Toast.show({
          type: 'success',
          text1: translate('profile:messages.updateSuccess'),
          text2: translate('profile:messages.medicationUpdated'),
        });
      } catch (error: any) {
        handleSetError(
          error?.data?.message || translate('profile:messages.updateError')
        );
      }
    },
    [updateMedication, handleSetError]
  );

  const handleUpdateVaccinationStatus = useCallback(
    async (vaccinationValue: string) => {
      try {
        await updateVaccinationStatus(vaccinationValue);
        Toast.show({
          type: 'success',
          text1: translate('profile:messages.updateSuccess'),
          text2: translate('profile:messages.vaccinationUpdated'),
        });
      } catch (error: any) {
        handleSetError(
          error?.data?.message || translate('profile:messages.updateError')
        );
      }
    },
    [updateVaccinationStatus, handleSetError]
  );

  return {
    // State
    profile,
    metadata,
    isLoading: isLoading || isLoadingMetadata,
    error: error || metadataError,
    isEditing,
    editingField,

    // Specific fields
    bloodType,
    job,
    allergies,
    preExistingConditions,
    medication,
    vaccinationStatus,

    // Actions
    setMetadata: handleSetMetadata,
    updateField: handleUpdateField,
    setLoading: handleSetLoading,
    setError: handleSetError,
    clearError: handleClearError,
    setEditing: handleSetEditing,
    clearMetadata: handleClearMetadata,

    // API operations
    refetchMetadata,
    updateBloodType: handleUpdateBloodType,
    updateJob: handleUpdateJob,
    updateAllergies: handleUpdateAllergies,
    updatePreExistingConditions: handleUpdatePreExistingConditions,
    updateMedication: handleUpdateMedication,
    updateVaccinationStatus: handleUpdateVaccinationStatus,
  };
};
