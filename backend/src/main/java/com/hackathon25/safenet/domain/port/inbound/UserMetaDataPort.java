package com.hackathon25.safenet.domain.port.inbound;

import com.hackathon25.safenet.domain.model.user.User;
import java.util.Map;
import java.util.UUID;

public interface UserMetaDataPort {
  User updateUserMeta(UUID userId, Map<String, Object> meta);

  Map<String, Object> getUserMeta(UUID userId);

  void addBloodType(UUID userId, String bloodType);

  void addJob(UUID userId, String job);

  void addAllergies(UUID userId, String allergies);

  void addPreExistingConditions(UUID userId, String pre_existingConditions);

  void addMedication(UUID userId, String medication);

  void addVaccinationStatus(UUID userId, String vaccinationStatus);
}
