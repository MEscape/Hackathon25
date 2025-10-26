package com.hackathon25.safenet.domain.model.user;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.UUID;

/**
 * Immutable domain model representing a user's location with privacy controls.
 */
public record UserLocation(
        UUID id,
        UUID userId,
        BigDecimal latitude,
        BigDecimal longitude,
        BigDecimal altitude,
        BigDecimal accuracy,
        Boolean visibleToFriends,
        Instant createdAt,
        Instant updatedAt
) {
    private static final BigDecimal MIN_LATITUDE = new BigDecimal("-90.0");
    private static final BigDecimal MAX_LATITUDE = new BigDecimal("90.0");
    private static final BigDecimal MIN_LONGITUDE = new BigDecimal("-180.0");
    private static final BigDecimal MAX_LONGITUDE = new BigDecimal("180.0");
    private static final BigDecimal MAX_ALTITUDE = new BigDecimal("100000.0");
    private static final BigDecimal MIN_ALTITUDE = new BigDecimal("-1000.0");
    private static final BigDecimal MAX_ACCURACY = new BigDecimal("10000.0");
    private static final int RECENT_THRESHOLD_SECONDS = 300; // 5 minutes
    private static final int STALE_THRESHOLD_SECONDS = 1800; // 30 minutes
    private static final double EARTH_RADIUS_METERS = 6371000.0;

    public UserLocation {
        validateUserId(userId);
        validateCoordinates(latitude, longitude);
        validateAltitude(altitude);
        validateAccuracy(accuracy);
        validateVisibility(visibleToFriends);
    }

    public static UserLocation create(UUID userId, BigDecimal latitude, BigDecimal longitude,
                                      BigDecimal altitude, BigDecimal accuracy, Boolean visibleToFriends) {
        Instant now = Instant.now();
        return new UserLocation(null, userId, latitude, longitude, altitude, accuracy,
                visibleToFriends, now, now);
    }

    public UserLocation updateCoordinates(BigDecimal newLatitude, BigDecimal newLongitude,
                                          BigDecimal newAltitude, BigDecimal newAccuracy) {
        return new UserLocation(id, userId, newLatitude, newLongitude, newAltitude,
                newAccuracy, visibleToFriends, createdAt, Instant.now());
    }

    public UserLocation updateVisibility(Boolean newVisibility) {
        return new UserLocation(id, userId, latitude, longitude, altitude, accuracy,
                newVisibility, createdAt, Instant.now());
    }

    public boolean isRecent() {
        return updatedAt != null &&
                updatedAt.isAfter(Instant.now().minusSeconds(RECENT_THRESHOLD_SECONDS));
    }

    public boolean isStale() {
        return updatedAt == null ||
                updatedAt.isBefore(Instant.now().minusSeconds(STALE_THRESHOLD_SECONDS));
    }

    public String getFormattedLocation() {
        return String.format("%.6f, %.6f", latitude, longitude);
    }

    public double distanceTo(UserLocation other) {
        if (other == null) {
            throw new IllegalArgumentException("Other location cannot be null");
        }

        double lat1Rad = Math.toRadians(latitude.doubleValue());
        double lon1Rad = Math.toRadians(longitude.doubleValue());
        double lat2Rad = Math.toRadians(other.latitude.doubleValue());
        double lon2Rad = Math.toRadians(other.longitude.doubleValue());

        double deltaLat = lat2Rad - lat1Rad;
        double deltaLon = lon2Rad - lon1Rad;

        double a = Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
                Math.cos(lat1Rad) * Math.cos(lat2Rad) *
                        Math.sin(deltaLon / 2) * Math.sin(deltaLon / 2);

        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        return EARTH_RADIUS_METERS * c;
    }

    private static void validateUserId(UUID userId) {
        if (userId == null) {
            throw new IllegalArgumentException("User ID cannot be null");
        }
    }

    private static void validateCoordinates(BigDecimal latitude, BigDecimal longitude) {
        if (latitude == null || longitude == null) {
            throw new IllegalArgumentException("Latitude and longitude cannot be null");
        }
        if (latitude.compareTo(MIN_LATITUDE) < 0 || latitude.compareTo(MAX_LATITUDE) > 0) {
            throw new IllegalArgumentException("Latitude must be between -90 and 90 degrees");
        }
        if (longitude.compareTo(MIN_LONGITUDE) < 0 || longitude.compareTo(MAX_LONGITUDE) > 0) {
            throw new IllegalArgumentException("Longitude must be between -180 and 180 degrees");
        }
    }

    private static void validateAltitude(BigDecimal altitude) {
        if (altitude != null &&
                (altitude.compareTo(MIN_ALTITUDE) < 0 || altitude.compareTo(MAX_ALTITUDE) > 0)) {
            throw new IllegalArgumentException("Altitude must be between -1000 and 100000 meters");
        }
    }

    private static void validateAccuracy(BigDecimal accuracy) {
        if (accuracy != null &&
                (accuracy.compareTo(BigDecimal.ZERO) < 0 || accuracy.compareTo(MAX_ACCURACY) > 0)) {
            throw new IllegalArgumentException("Accuracy must be between 0 and 10000 meters");
        }
    }

    private static void validateVisibility(Boolean visibleToFriends) {
        if (visibleToFriends == null) {
            throw new IllegalArgumentException("Visibility setting cannot be null");
        }
    }
}