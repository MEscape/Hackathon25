package com.hackathon25.safenet.infrastructure.adapter.web.controller;

import com.hackathon25.safenet.domain.port.inbound.NotificationPort;
import com.hackathon25.safenet.domain.port.inbound.UserMetaDataPort;
import java.util.Map;
import java.util.UUID;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/api/v1/users")
// @RequiredArgsConstructor
public class EmergencyNotificationController {

  @Autowired
  public EmergencyNotificationController(
      @Qualifier("emergencyNotificationService") NotificationPort notificationPort,
      UserMetaDataPort userMetaDataPort) {
    this.emergencyCallUseCase = notificationPort;
    this.userMetaDataPort = userMetaDataPort;
  }

  private final NotificationPort emergencyCallUseCase;
  private final UserMetaDataPort userMetaDataPort;

  @PostMapping("/{userId}/emergency")
  public ResponseEntity<String> triggerEmergency(@PathVariable UUID userId) {
    emergencyCallUseCase.triggerEmergencyCall(userId);
    return ResponseEntity.ok("Emergency call triggered for user " + userId);
  }

  @PostMapping("/{userId}/expoPushToken")
  public ResponseEntity<String> registerExpoPushToken(
      @PathVariable UUID userId, @RequestParam String token) {

    userMetaDataPort.updateUserMeta(userId, Map.of("expoPushToken", token));
    return ResponseEntity.ok("Expo push token" + token + " registered for user " + userId);
  }
}
