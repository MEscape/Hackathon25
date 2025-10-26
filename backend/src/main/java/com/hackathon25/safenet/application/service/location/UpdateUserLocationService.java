package com.hackathon25.safenet.application.service.location;

import com.hackathon25.safenet.domain.model.user.UserLocation;
import com.hackathon25.safenet.domain.port.inbound.UpdateUserLocationPort;
import com.hackathon25.safenet.domain.port.outbound.UserLocationRepositoryPort;
import com.hackathon25.safenet.domain.port.outbound.UserRepositoryPort;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.UUID;

/**
 * Service for managing user location updates with notifications.
 *
 * <p>Handles location updates, visibility changes, and emergency location sharing.
 * Notifies friends about location changes through the notification system.</p>
 *
 * @author SafeNet Development Team
 * @since 1.0.0
 */
@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class UpdateUserLocationService implements UpdateUserLocationPort {

    private final UserLocationRepositoryPort userLocationRepository;
    private final UserRepositoryPort userRepository;

    @Override
    public UserLocation updateLocation(UUID userId, BigDecimal latitude, BigDecimal longitude,
                                       BigDecimal altitude, BigDecimal accuracy, Boolean visibleToFriends) {
        log.info("Updating location for user: {}", userId);

        validateUserId(userId);
        validateUserExists(userId);

        UserLocation location = userLocationRepository.findLatestByUserId(userId)
                .map(existing -> existing.updateCoordinates(latitude, longitude, altitude, accuracy))
                .orElseGet(() -> UserLocation.create(userId, latitude, longitude, altitude, accuracy,
                        visibleToFriends != null ? visibleToFriends : true));

        if (visibleToFriends != null && !visibleToFriends.equals(location.visibleToFriends())) {
            location = location.updateVisibility(visibleToFriends);
        }

        UserLocation saved = userLocationRepository.save(location);
        log.info("Location updated for user: {}", userId);

        return saved;
    }

    @Override
    public UserLocation updateLocationVisibility(UUID userId, Boolean visible) {
        log.info("Updating location visibility for user {} to: {}", userId, visible);

        validateUserId(userId);
        validateUserExists(userId);

        UserLocation location = userLocationRepository.findLatestByUserId(userId)
                .orElseThrow(() -> new IllegalArgumentException("User has no location data"));

        UserLocation updated = location.updateVisibility(visible);
        UserLocation saved = userLocationRepository.save(updated);

        log.info("Location visibility updated for user: {}", userId);

        return saved;
    }

    // ========== Validation Methods ==========

    private void validateUserId(UUID userId) {
        if (userId == null) {
            throw new IllegalArgumentException("User ID is required");
        }
    }

    private void validateUserExists(UUID userId) {
        if (!userRepository.existsById(userId)) {
            throw new RuntimeException("User not found: " + userId);
        }
    }
}