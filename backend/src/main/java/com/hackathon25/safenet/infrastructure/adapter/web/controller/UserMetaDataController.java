package com.hackathon25.safenet.infrastructure.adapter.web.controller;

import com.hackathon25.safenet.application.service.metadata.UserMetaDataService;
import com.hackathon25.safenet.domain.port.inbound.UserMetaDataPort;
import com.hackathon25.safenet.infrastructure.adapter.web.dto.metadata.*;
import com.hackathon25.safenet.infrastructure.adapter.web.dto.metadata.request.*;
import java.util.Map;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
public class UserMetaDataController {
  private final UserMetaDataPort userMetaDataPort;
  private final UserMetaDataService userService;

  @PutMapping("/profile/meta")
  public ResponseEntity<Void> updateUserMeta(
      @RequestBody Map<String, Object> metaData, Authentication authentication) {
    UUID userId = UUID.fromString(authentication.getName());
    userMetaDataPort.updateUserMeta(userId, metaData);
    return ResponseEntity.ok().build();
  }

  @GetMapping("/profile/meta")
  public ResponseEntity<Map<String, Object>> getUserMeta(Authentication authentication) {
    UUID userId = UUID.fromString(authentication.getName());
    return ResponseEntity.ok(userMetaDataPort.getUserMeta(userId));
  }

  @PostMapping("/profile/blood-type")
  public ResponseEntity<UserBloodTypeDto> addBloodType(
      @RequestBody BloodTypeRequestDto request, Authentication authentication) {

    UUID userId = UUID.fromString(authentication.getName());
    userService.addBloodType(userId, request.getBloodType());
    UserBloodTypeDto responseDto = UserBloodTypeDto.from(userId, request.getBloodType());
    return ResponseEntity.ok(responseDto);
  }

  @PostMapping("/profile/job")
  public ResponseEntity<UserJobDto> addJob(
      @RequestBody JobRequestDto request, Authentication authentication) {
    UUID userId = UUID.fromString(authentication.getName());
    userService.addJob(userId, request.getJob());
    UserJobDto responseDto = UserJobDto.from(userId, request.getJob());
    return ResponseEntity.ok(responseDto);
  }

  @PostMapping("/profile/allergies")
  public ResponseEntity<UserAllergiesDto> addAllergies(
      @RequestBody AllergiesRequestDto request, Authentication authentication) {

    UUID userId = UUID.fromString(authentication.getName());
    userService.addAllergies(userId, request.getAllergies());
    UserAllergiesDto responseDto = UserAllergiesDto.from(userId, request.getAllergies());
    return ResponseEntity.ok(responseDto);
  }

  @PostMapping("/profile/preExistingConditions")
  public ResponseEntity<UserPreExistingConditionsDto> addPre_existingConditions(
      @RequestBody PreExistingConditionsRequestDto request, Authentication authentication) {
    UUID userId = UUID.fromString(authentication.getName());
    userService.addPreExistingConditions(userId, request.getPreExistingConditions());
    UserPreExistingConditionsDto responseDto =
        UserPreExistingConditionsDto.from(userId, request.getPreExistingConditions());
    return ResponseEntity.ok(responseDto);
  }

  @PostMapping("/profile/medication")
  public ResponseEntity<UserMedicationDto> addMedication(
      @RequestBody MedicationRequestDto request, Authentication authentication) {
    UUID userId = UUID.fromString(authentication.getName());
    userService.addMedication(userId, request.getMedication());
    UserMedicationDto responseDto = UserMedicationDto.from(userId, request.getMedication());
    return ResponseEntity.ok(responseDto);
  }

  @PostMapping("/profile/vaccinationStatus")
  public ResponseEntity<UserVaccinationDto> addVaccination(
      @RequestBody VaccinationStatusRequestDto request, Authentication authentication) {
    UUID userId = UUID.fromString(authentication.getName());
    userService.addVaccinationStatus(userId, request.getVaccinationStatus());

    UserVaccinationDto responseDto =
        UserVaccinationDto.from(userId, request.getVaccinationStatus());

    return ResponseEntity.ok(responseDto);
  }
}
