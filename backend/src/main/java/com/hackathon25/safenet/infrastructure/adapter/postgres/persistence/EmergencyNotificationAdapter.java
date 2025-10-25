package com.hackathon25.safenet.infrastructure.adapter.postgres.persistence;

import com.hackathon25.safenet.domain.port.outbound.NotificationRepositoryPort;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientResponseException;
import reactor.core.publisher.Mono;

import java.util.List;
import java.util.Map;

@Component
public class EmergencyNotificationAdapter implements NotificationRepositoryPort {

    private final WebClient client;

    public EmergencyNotificationAdapter() {
        // Base URL für Expo Push Notifications
        this.client = WebClient.builder()
                .baseUrl("https://exp.host")
                .build();
    }

    /**
     * Sendet eine Push-Nachricht an den angegebenen Expo-Token.
     *
     * @param expoPushToken Der Expo Push Token des Empfängers
     * @param callerId      Die ID des Anrufers / Freundes
     * @return true, wenn erfolgreich, false sonst
     */
    @Override
    public boolean sendEmergencyNotification(String expoPushToken, String callerId) {
        Map<String, Object> message = Map.of(
                "to", expoPushToken,
                "sound", "default",
                "title", "Emergency Alert",
                "body", "Your friend " + callerId + " needs help!"
        );

        try {
            String response = client.post()
                    .uri("/--/api/v2/push/send")
                    .header("Accept", "application/json")
                    .header("Content-Type", "application/json")
                    .bodyValue(List.of(message))
                    .retrieve()
                    .bodyToMono(String.class)
                    .block(); // blockiert kurz, um die Antwort zu erhalten

            System.out.println("Push Response: " + response);
            return true; // Nachricht erfolgreich gesendet

        } catch (WebClientResponseException e) {
            // Server-seitiger Fehler (HTTP 4xx oder 5xx)
            System.err.println("Expo Push Error: " + e.getStatusCode() + " - " + e.getResponseBodyAsString());
            return false;

        } catch (Exception e) {
            // Netzwerk oder sonstige Fehler
            e.printStackTrace();
            return false;
        }
    }
}
