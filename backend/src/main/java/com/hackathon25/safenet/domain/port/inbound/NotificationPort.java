package com.hackathon25.safenet.domain.port.inbound;

import java.util.UUID;

public interface NotificationPort {
  void triggerEmergencyCall(UUID userId);
}
