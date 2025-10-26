package com.hackathon.safenet.domain.ports.inbound;

import com.hackathon.safenet.domain.model.user.UserLocation;

import java.util.List;
import java.util.UUID;

/**
 * Inbound port for user location management.
 *
 * <p>This interface defines the application-level contract for retrieving
 * and managing user location data. Implementations handle fetching
 * locations of a user's friends while respecting visibility preferences,
 * and serve as the entry point for the application layer to interact
 * with domain services related to user location tracking.</p>
 *
 * <p>It follows the hexagonal architecture pattern by defining the inbound
 * port that adapters (e.g., REST controllers, WebSocket controllers)
 * can call without depending on implementation details.</p>
 *
 * @author SafeNet Development Team
 * @since 1.0.0
 */
public interface UserLocationPort {

    /**
     * Retrieves the latest visible locations of a user's friends.
     *
     * <p>Only friends who have allowed their location to be visible
     * will be included in the returned list. If the user has no friends
     * or no friends have visible locations, an empty list is returned.</p>
     *
     * @param userId the unique identifier of the user requesting friends' locations
     * @return a list of {@link UserLocation} objects representing the friends' visible locations
     */
    List<UserLocation> getFriendsLocations(UUID userId);
}
