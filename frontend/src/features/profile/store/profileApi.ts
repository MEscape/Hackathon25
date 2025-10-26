import { apiSlice } from '@/store/api/baseApi';
import { validateApiResponse } from '@/utils/validation';

import {
  setMetadata,
  updateMetadataField,
  setLoading,
  setError,
  clearError,
} from './profileSlice';
import {
  UserMetadata,
  UserMetadataSchema,
  UserBloodTypeSchema,
  UserJobSchema,
  UserAllergiesSchema,
  UserPreExistingConditionsSchema,
  UserMedicationSchema,
  UserVaccinationSchema,
} from '../schemas/profile.schema';

export const profileApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: builder => ({
    // Get user metadata
    getUserMetadata: builder.query<UserMetadata, void>({
      query: () => `/api/v1/users/profile/meta`,
      transformResponse: (response: unknown) => {
        return validateApiResponse(UserMetadataSchema, response);
      },
      providesTags: () => [{ type: 'User', id: 'CURRENT' }],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        dispatch(setLoading(true));
        dispatch(clearError());
        try {
          const { data } = await queryFulfilled;
          dispatch(setMetadata(data));
        } catch (error) {
          dispatch(setError('Failed to load profile data'));
        } finally {
          dispatch(setLoading(false));
        }
      },
    }),

    // Update specific profile fields
    updateProfileField: builder.mutation<
      UserMetadata,
      {
        field: string;
        value: any;
        endpoint: string;
        schema: any;
      }
    >({
      query: ({ value, endpoint }) => ({
        url: `/api/v1/users/profile/${endpoint}`,
        method: 'POST',
        body: value,
      }),
      transformResponse: (response: unknown, meta, { schema }) =>
        validateApiResponse(schema, response),
      async onQueryStarted({ field, value }, { dispatch, queryFulfilled }) {
        // Optimistic update
        dispatch(updateMetadataField({ field, value }));

        const patchResult = dispatch(
          profileApi.util.updateQueryData(
            'getUserMetadata',
            undefined,
            draft => {
              (draft as any)[field] = value;
              return draft;
            }
          )
        );

        try {
          await queryFulfilled;
        } catch {
          // Revert optimistic update on error
          patchResult.undo();
          dispatch(setError(`Failed to update ${field}`));
        }
      },
      invalidatesTags: () => [{ type: 'User', id: 'CURRENT' }],
    }),
  }),
});

export const { useGetUserMetadataQuery, useUpdateProfileFieldMutation } =
  profileApi;

// Helper hooks for specific field updates
export const useUpdateBloodType = () => {
  const [updateField] = useUpdateProfileFieldMutation();
  return (bloodType: string) =>
    updateField({
      field: 'bloodType',
      value: { bloodType },
      endpoint: 'blood-type',
      schema: UserBloodTypeSchema,
    });
};

export const useUpdateJob = () => {
  const [updateField] = useUpdateProfileFieldMutation();
  return (job: string) =>
    updateField({
      field: 'job',
      value: { job },
      endpoint: 'job',
      schema: UserJobSchema,
    });
};

export const useUpdateAllergies = () => {
  const [updateField] = useUpdateProfileFieldMutation();
  return (allergies: string) =>
    updateField({
      field: 'allergies',
      value: { allergies },
      endpoint: 'allergies',
      schema: UserAllergiesSchema,
    });
};

export const useUpdatePreExistingConditions = () => {
  const [updateField] = useUpdateProfileFieldMutation();
  return (preExistingConditions: string) =>
    updateField({
      field: 'preExistingConditions',
      value: { preExistingConditions },
      endpoint: 'preExistingConditions',
      schema: UserPreExistingConditionsSchema,
    });
};

export const useUpdateMedication = () => {
  const [updateField] = useUpdateProfileFieldMutation();
  return (medication: string) =>
    updateField({
      field: 'medication',
      value: { medication },
      endpoint: 'medication',
      schema: UserMedicationSchema,
    });
};

export const useUpdateVaccinationStatus = () => {
  const [updateField] = useUpdateProfileFieldMutation();
  return (vaccinationStatus: string) =>
    updateField({
      field: 'vaccinationStatus',
      value: { vaccinationStatus },
      endpoint: 'vaccinationStatus',
      schema: UserVaccinationSchema,
    });
};
