package com.hackathon25.safenet.infrastructure.adapter.web.dto.location;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.hackathon25.safenet.domain.model.user.UserLocation;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.UUID;

/**
 * Data Transfer Object for UserLocation response data.
 * 
 * <p>This DTO represents user location information returned by the API,
 * including coordinates, accuracy, visibility settings, and timestamps.</p>
 */
@Data
@Builder
@Schema(description = "User location information")
public class UserLocationDto {

    @JsonProperty("id")
    @Schema(description = "Unique identifier of the location record", example = "123e4567-e89b-12d3-a456-426614174001")
    private UUID id;

    @JsonProperty("userId")
    @Schema(description = "Unique identifier of the user", example = "123e4567-e89b-12d3-a456-426614174002")
    private UUID userId;

    @JsonProperty("latitude")
    @Schema(description = "Latitude coordinate in decimal degrees", example = "40.712776", minimum = "-90", maximum = "90")
    private BigDecimal latitude;

    @JsonProperty("longitude")
    @Schema(description = "Longitude coordinate in decimal degrees", example = "-74.005974", minimum = "-180", maximum = "180")
    private BigDecimal longitude;

    @JsonProperty("altitude")
    @Schema(description = "Altitude in meters above sea level", example = "10.5", nullable = true)
    private BigDecimal altitude;

    @JsonProperty("accuracy")
    @Schema(description = "Location accuracy in meters", example = "5.0", nullable = true)
    private BigDecimal accuracy;

    @JsonProperty("visibleToFriends")
    @Schema(description = "Whether the location is visible to friends", example = "true")
    private Boolean visibleToFriends;

    @JsonProperty("createdAt")
    @Schema(description = "Timestamp when the location was first recorded", example = "2024-01-15T10:30:00Z")
    private Instant createdAt;

    @JsonProperty("updatedAt")
    @Schema(description = "Timestamp when the location was last updated", example = "2024-01-15T10:35:00Z")
    private Instant updatedAt;

    @JsonProperty("formattedLocation")
    @Schema(description = "Human-readable location string", example = "40.712776, -74.005974")
    private String formattedLocation;

    @JsonProperty("isRecent")
    @Schema(description = "Whether the location was updated recently (within 5 minutes)", example = "true")
    private Boolean isRecent;

    @JsonProperty("isStale")
    @Schema(description = "Whether the location is stale (older than 30 minutes)", example = "false")
    private Boolean isStale;

    /**
     * Maps a domain {@link UserLocation} to a {@link UserLocationDto}.
     *
     * @param userLocation the domain user location
     * @return the mapped UserLocationDto
     */
    public static UserLocationDto from(UserLocation userLocation) {
        if (userLocation == null) {
            return null;
        }

        return UserLocationDto.builder()
                .id(userLocation.id())
                .userId(userLocation.userId())
                .latitude(userLocation.latitude())
                .longitude(userLocation.longitude())
                .altitude(userLocation.altitude())
                .accuracy(userLocation.accuracy())
                .visibleToFriends(userLocation.visibleToFriends())
                .createdAt(userLocation.createdAt())
                .updatedAt(userLocation.updatedAt())
                .formattedLocation(userLocation.getFormattedLocation())
                .isRecent(userLocation.isRecent())
                .isStale(userLocation.isStale())
                .build();
    }
}