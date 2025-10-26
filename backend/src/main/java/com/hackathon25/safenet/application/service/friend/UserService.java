package com.hackathon25.safenet.application.service.friend;

import com.hackathon25.safenet.domain.model.friend.FriendRequest;
import com.hackathon25.safenet.domain.model.user.DiscoverableUser;
import com.hackathon25.safenet.domain.model.user.User;
import com.hackathon25.safenet.domain.port.inbound.FriendshipPort;
import com.hackathon25.safenet.domain.port.inbound.UserPort;
import com.hackathon25.safenet.domain.port.outbound.FriendRequestRepositoryPort;
import com.hackathon25.safenet.domain.port.outbound.UserRepositoryPort;
import java.util.List;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

/**
 * Service implementation for user management operations.
 *
 * <p>This service handles user-related business logic including user discovery functionality for
 * emergency contacts.
 *
 * @author SafeNet Development Team
 * @since 1.0.0
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class UserService implements UserPort {

  private final UserRepositoryPort userRepository;
  private final FriendshipPort friendshipPort;
  private final FriendRequestRepositoryPort friendRequestRepository;

  /** {@inheritDoc} */
  @Override
  public List<DiscoverableUser> getDiscoverableUsers(UUID currentUserId) {
    log.debug("Getting discoverable users for user: {}", currentUserId);

    List<User> allUsers = userRepository.findAll();

    return allUsers.stream()
        .filter(user -> !user.id().equals(currentUserId))
        .map(user -> mapToDiscoverableUser(user, currentUserId))
        .toList();
  }

  /**
   * Maps a domain User to a DiscoverableUser with request status and mutual friends count. This
   * method encapsulates the business logic for determining user discoverability information.
   *
   * @param user the user to map
   * @param currentUserId the ID of the current user
   * @return mapped DiscoverableUser with business data
   */
  private DiscoverableUser mapToDiscoverableUser(User user, UUID currentUserId) {
    if (user == null) {
      return null;
    }

    String requestStatus = determineRequestStatus(user.id(), currentUserId);
    int mutualFriendsCount = calculateMutualFriendsCount(user.id(), currentUserId);

    return new DiscoverableUser(
        user.id(), user.username(), user.email(), mutualFriendsCount, requestStatus);
  }

  /**
   * Determine the friend request status between two users. This business logic determines the
   * relationship state between users.
   *
   * @param otherUserId the other user's ID
   * @param currentUserId the current user's ID
   * @return status: "none", "sent", "received", or "friends"
   */
  private String determineRequestStatus(UUID otherUserId, UUID currentUserId) {
    // Check if already friends
    if (friendshipPort.areFriends(currentUserId, otherUserId)) {
      return DiscoverableUser.RequestStatus.FRIENDS;
    }

    // Check for pending friend request
    return friendRequestRepository
        .findBetweenUsers(currentUserId, otherUserId)
        .filter(req -> req.status() == FriendRequest.FriendRequestStatus.PENDING)
        .map(
            req -> {
              if (req.requesterId().equals(currentUserId)) {
                return DiscoverableUser.RequestStatus.SENT;
              }
              return DiscoverableUser.RequestStatus.RECEIVED;
            })
        .orElse(DiscoverableUser.RequestStatus.NONE);
  }

  /**
   * Calculate the number of mutual friends between two users. This business logic computes the
   * social connection strength between users.
   *
   * @param user1Id first user's ID
   * @param user2Id second user's ID
   * @return number of mutual friends
   */
  private int calculateMutualFriendsCount(UUID user1Id, UUID user2Id) {
    try {
      List<User> mutualFriends = friendshipPort.getMutualFriends(user1Id, user2Id);
      return mutualFriends.size();
    } catch (Exception e) {
      log.warn(
          "Failed to calculate mutual friends for users {} and {}: {}",
          user1Id,
          user2Id,
          e.getMessage());
      return 0;
    }
  }
}
