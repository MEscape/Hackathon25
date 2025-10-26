package com.hackathon25.safenet.domain.port.outbound;

public interface NotificationRepositoryPort {
    boolean sendEmergencyNotification(String expoPushToken, String callerId);
}
