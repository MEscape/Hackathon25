export interface UserMetadata {
  bloodType?: string;
  job?: string;
  allergies?: string;
  preExistingConditions?: string;
  medication?: string;
  vaccinationStatus?: string;
  [key: string]: any; // For additional metadata fields
}

export interface UserBloodType {
  userId: string;
  bloodType: string;
}

export interface UserJob {
  userId: string;
  job: string;
}

export interface UserAllergies {
  userId: string;
  allergies: string;
}

export interface UserPreExistingConditions {
  userId: string;
  preExistingConditions: string;
}

export interface UserMedication {
  userId: string;
  medication: string;
}

export interface UserVaccination {
  userId: string;
  vaccinationStatus: string;
}

export interface ProfileFormData {
  bloodType: string;
  job: string;
  allergies: string;
  preExistingConditions: string;
  medication: string;
  vaccinationStatus: string;
}

export type MetadataField = keyof ProfileFormData;

export interface MetadataUpdateRequest {
  field: MetadataField;
  value: string;
}
