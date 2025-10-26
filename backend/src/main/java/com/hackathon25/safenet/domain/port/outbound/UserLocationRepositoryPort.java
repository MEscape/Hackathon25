package com.hackathon25.safenet.domain.port.outbound;

import com.hackathon25.safenet.domain.model.user.UserLocation;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface UserLocationRepositoryPort {

    /**
     * Save or update user location
     */
    UserLocation save(UserLocation userLocation);

    /**
     * Find user location by ID
     */
    Optional<UserLocation> findById(UUID id);

    /**
     * Find latest location for a user
     */
    Optional<UserLocation> findLatestByUserId(UUID userId);

    /**
     * Find visible locations for multiple users (friends)
     */
    List<UserLocation> findLatestVisibleLocationsByUserIds(List<UUID> userIds);
}