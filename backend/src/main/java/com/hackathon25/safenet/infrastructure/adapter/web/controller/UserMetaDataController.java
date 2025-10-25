package com.hackathon25.safenet.infrastructure.adapter.web.controller;

import com.hackathon25.safenet.application.service.metadata.UserMetaDataService;
import com.hackathon25.safenet.domain.port.inbound.UserMetaDataPort;
import com.hackathon25.safenet.infrastructure.adapter.web.dto.metadata.*;
import lombok.RequiredArgsConstructor;
import org.springdoc.core.service.GenericResponseService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.UUID;


@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
public class UserMetaDataController {
    private final UserMetaDataPort userMetaDataPort;
    private final UserMetaDataService userService;
    private final GenericResponseService responseBuilder;

    @PutMapping("/{userId}/meta")
    public ResponseEntity<Void> updateUserMeta(
            @PathVariable UUID userId,
            @RequestBody Map<String, Object> metaData
    ) {
        userMetaDataPort.updateUserMeta(userId, metaData);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{userId}/meta")
    public ResponseEntity<Map<String, Object>> getUserMeta(
            @PathVariable UUID userId)
    {
        return ResponseEntity.ok(userMetaDataPort.getUserMeta(userId));
    }

    @PostMapping("/{userId}/blood-type")
    public ResponseEntity<UserBloodTypeDto> addBloodType(
            @PathVariable UUID userId,
            @RequestParam String bloodType) {

        userService.addBloodType(userId, bloodType);
        UserBloodTypeDto responseDto = UserBloodTypeDto.from(userId, bloodType);
        return ResponseEntity.ok(responseDto);
    }

    @PostMapping("/{userId}/job")
    public ResponseEntity<UserJobDto> addJob(
            @PathVariable UUID userId,
            @RequestParam String job){
        userService.addJob(userId, job);
        UserJobDto responseDto = UserJobDto.from(userId, job);
        return ResponseEntity.ok(responseDto);
    }

    @PostMapping("/{userId}/allergies")
    public ResponseEntity<UserAllergiesDto> addAllergies(
            @PathVariable UUID userId,
            @RequestParam String allergies){

        userService.addAllergies(userId, allergies);
        UserAllergiesDto  responseDto = UserAllergiesDto.from(userId, allergies);
        return ResponseEntity.ok(responseDto);
    }

    @PostMapping("/{userId}/preExistingConditions")
    public ResponseEntity<UserPreExistingConditionsDto> addPre_existingConditions(
            @PathVariable UUID userId,
            @RequestParam String pre_existingConditions) {
        userService.addPreExistingConditions(userId, pre_existingConditions);
        UserPreExistingConditionsDto responseDto = UserPreExistingConditionsDto.from(userId, pre_existingConditions);
        return ResponseEntity.ok(responseDto);
    }

    @PostMapping("/{userId}/medication")
    public ResponseEntity<UserMedicationDto> addMedication(
            @PathVariable UUID userId,
            @RequestParam String medication) {
        userService.addMedication(userId, medication);
        UserMedicationDto responseDto = UserMedicationDto.from(userId, medication);
        return ResponseEntity.ok(responseDto);
    }

    @PostMapping("/{userId}/vaccinationStatus")
    public ResponseEntity<UserVaccinationDto> addVaccination(
            @PathVariable UUID userId,
            @RequestParam String vaccinationStatus) {
        userService.addVaccinationStatus(userId, vaccinationStatus);

        UserVaccinationDto responseDto = UserVaccinationDto.from(userId, vaccinationStatus);

        return ResponseEntity.ok(responseDto);
    }


}
