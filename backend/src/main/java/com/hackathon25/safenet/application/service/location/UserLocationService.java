package com.hackathon25.safenet.application.service.location;

import com.hackathon25.safenet.domain.model.user.User;
import com.hackathon25.safenet.domain.model.user.UserLocation;
import com.hackathon25.safenet.domain.port.inbound.UserLocationPort;
import com.hackathon25.safenet.domain.port.outbound.FriendshipRepositoryPort;
import com.hackathon25.safenet.domain.port.outbound.UserLocationRepositoryPort;
import java.util.List;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service implementation responsible for managing and retrieving user location data.
 *
 * <p>This service provides functionality for accessing the latest locations of a user's friends,
 * considering their visibility preferences. It acts as the main application layer between domain
 * logic and persistence adapters for user location tracking and sharing.
 *
 * <p>It supports real-time location sharing scenarios where users can control visibility and access
 * to their live positions. The service ensures efficient data retrieval and filtering of visible
 * friend locations.
 *
 * <p>Transactional boundaries are applied to ensure consistency and performance for read
 * operations.
 *
 * @author SafeNet Development Team
 * @since 1.0.0
 */
@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class UserLocationService implements UserLocationPort {

  private final UserLocationRepositoryPort userLocationRepository;
  private final FriendshipRepositoryPort friendshipRepository;

  @Override
  @Transactional(readOnly = true)
  public List<UserLocation> getFriendsLocations(UUID userId) {
    log.debug("Getting friends' locations for user: {}", userId);

    List<UUID> friendIds =
        friendshipRepository.findFriendsByUserId(userId).stream().map(User::id).toList();

    if (friendIds.isEmpty()) {
      log.debug("User {} has no friends", userId);
      return List.of();
    }

    List<UserLocation> locations =
        userLocationRepository.findLatestVisibleLocationsByUserIds(friendIds);

    log.debug("Retrieved {} visible locations for user {}", locations.size(), userId);
    return locations;
  }
}
