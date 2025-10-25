package com.hackathon25.safenet.application.service.metadata;

import com.hackathon25.safenet.domain.model.user.User;
import com.hackathon25.safenet.domain.port.inbound.UserMetaDataPort;
import com.hackathon25.safenet.domain.port.outbound.UserMetaDataRepositoryPort;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserMetaDataService implements UserMetaDataPort {

    private final UserMetaDataRepositoryPort userRepositoryPort;

    @Override
    public User updateUserMeta(UUID userId, Map<String, Object> metaData) {
        User user = userRepositoryPort.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        user.meta().putAll(metaData);
        userRepositoryPort.save(user);
        return user;
    }

    @Override
    public Map<String, Object> getUserMeta(UUID userId) {
        return userRepositoryPort.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"))
                .meta();
    }

    @Override
    public void addBloodType(UUID userId, String bloodType) {
        Map<String, Object> data = new HashMap<>();
        data.put("bloodType", bloodType);
        updateUserMeta(userId, data);
    }

    @Override
    public void addJob(UUID userId, String job) {
        Map<String, Object> data = new HashMap<>();
        data.put("job", job);
        updateUserMeta(userId, data);
    }

    @Override
    public void addAllergies(UUID userId, String allergies) {
        Map<String, Object> data = new HashMap<>();
        data.put("allergies", allergies);
        updateUserMeta(userId, data);
    }

    @Override
    public void addPreExistingConditions(UUID userId, String pre_existingConditions) {
        Map<String, Object> data = new HashMap<>();
        data.put("pre_existingConditions", pre_existingConditions);
        updateUserMeta(userId, data);
    }

    @Override
    public void addMedication(UUID userId, String medication) {
        Map<String, Object> data = new HashMap<>();
        data.put("medication", medication);
        updateUserMeta(userId, data);
    }

    @Override
    public void addVaccinationStatus(UUID userId, String vaccinationStatus) {
        Map<String, Object> data = new HashMap<>();
        data.put("vaccinationStatus", vaccinationStatus);
        updateUserMeta(userId, data);
    }


}
