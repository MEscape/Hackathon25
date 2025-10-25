import { z } from 'zod';

// User metadata schema
export const UserMetadataSchema = z.record(z.string(), z.any());

// Individual metadata response schemas
export const UserBloodTypeSchema = z.object({
  userId: z.string().uuid(),
  bloodType: z.string(),
});

export const UserJobSchema = z.object({
  userId: z.string().uuid(),
  job: z.string(),
});

export const UserAllergiesSchema = z.object({
  userId: z.string().uuid(),
  allergies: z.string(),
});

export const UserPreExistingConditionsSchema = z.object({
  userId: z.string().uuid(),
  preExistingConditions: z.string(),
});

export const UserMedicationSchema = z.object({
  userId: z.string().uuid(),
  medication: z.string(),
});

export const UserVaccinationSchema = z.object({
  userId: z.string().uuid(),
  vaccinationStatus: z.string(),
});

// Type exports
export type UserMetadata = z.infer<typeof UserMetadataSchema>;
