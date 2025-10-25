package com.hackathon25.safenet.infrastructure.adapter.web.dto.emergency;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.hackathon25.safenet.domain.model.user.User;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Data;

import java.util.UUID;

/**
 * DTO representing an emergency contact (friend) with status
 */
@Data
@Builder
@Schema(description = "Emergency contact (friend) information")
public class EmergencyContactDto {

    @JsonProperty("id")
    @Schema(description = "User ID", example = "123e4567-e89b-12d3-a456-426614174001")
    private UUID id;

    @JsonProperty("firstName")
    @Schema(description = "First name", example = "John")
    private String firstName;

    @JsonProperty("lastName")
    @Schema(description = "Last name", example = "Doe")
    private String lastName;

    @JsonProperty("username")
    @Schema(description = "Username", example = "john_doe")
    private String username;

    @JsonProperty("email")
    @Schema(description = "Email", example = "john@example.com")
    private String email;

    @JsonProperty("status")
    @Schema(description = "Online status", example = "online", allowableValues = {"online", "offline"})
    private String status;

    @JsonProperty("lastSeen")
    @Schema(description = "Last seen timestamp", example = "2024-01-15T10:30:00Z")
    private String lastSeen;

    /**
     * Maps a domain User to an EmergencyContactDto
     * Status and lastSeen would typically come from a presence service
     */
    public static EmergencyContactDto from(User user) {
        if (user == null) {
            return null;
        }

        return EmergencyContactDto.builder()
                .id(user.id())
                .firstName(user.firstName())
                .lastName(user.lastName())
                .username(user.username())
                .email(user.email())
                .status("offline") //TODO Default status, should be updated by presence service
                .lastSeen(user.updatedAt() != null ? user.updatedAt().toString() : null)
                .build();
    }
}