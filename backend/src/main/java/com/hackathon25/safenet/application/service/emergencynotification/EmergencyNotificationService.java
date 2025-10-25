package com.hackathon25.safenet.application.service.emergencynotification;

import com.hackathon25.safenet.domain.model.user.User;
import com.hackathon25.safenet.domain.port.inbound.NotificationPort;
import com.hackathon25.safenet.domain.port.outbound.FriendshipRepositoryPort;
import com.hackathon25.safenet.domain.port.outbound.NotificationRepositoryPort;
import com.hackathon25.safenet.domain.port.outbound.UserRepositoryPort;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Primary
public class EmergencyNotificationService implements  NotificationPort {

    private final UserRepositoryPort userRepository;
    private final FriendshipRepositoryPort friendshipRepository;
    private final NotificationRepositoryPort notificationPort;

    @Override
    public void triggerEmergencyCall(UUID userId) {
        List<User> friends = friendshipRepository.findFriendsByUserId(userId);

        for (User friend : friends) {
            String token = (String) friend.meta().get("expoPushToken");
            if (token != null && !token.isBlank()) {
                notificationPort.sendEmergencyNotification(token, userId.toString());
                System.out.println(friend.id() + " sent emergency notification");
            }
        }
    }

}