package com.hackathon25.safenet.domain.port.inbound;

import com.hackathon25.safenet.domain.model.user.User;
import java.util.List;
import java.util.UUID;

/**
 * Inbound port for friendship management operations.
 *
 * <p>This port defines the operations available to the application layer for managing friendships
 * between users. It abstracts the underlying persistence and infrastructure details.
 *
 * <h3>Responsibilities</h3>
 *
 * <ul>
 *   <li>Retrieve friends and friendships
 *   <li>Check friendship status
 *   <li>Manage friendship relationships
 *   <li>Retrieve friendship-related statistics
 * </ul>
 *
 * @author SafeNet
 * @since 1.0.0
 */
public interface FriendshipPort {

  /**
   * Get all friends of a user.
   *
   * @param userId the ID of the user
   * @return list of friends
   * @throws com.hackathon25.safenet.domain.exception.user.UserNotFoundException if user does not
   *     exist
   */
  List<User> getFriends(UUID userId);

  /**
   * Check if two users are friends.
   *
   * @param userId1 the ID of the first user
   * @param userId2 the ID of the second user
   * @return true if users are friends, false otherwise
   * @throws com.hackathon25.safenet.domain.exception.friend.FriendshipException if user IDs are
   *     null
   */
  boolean areFriends(UUID userId1, UUID userId2);

  /**
   * Remove a friendship between two users.
   *
   * @param userId1 the ID of the first user
   * @param userId2 the ID of the second user
   * @throws com.hackathon25.safenet.domain.exception.friend.FriendshipException if user IDs are
   *     null
   * @throws com.hackathon25.safenet.domain.exception.friend.SelfFriendRequestException if trying to
   *     remove friendship with self
   * @throws com.hackathon25.safenet.domain.exception.friend.InvalidFriendRequestOperationException
   *     if user not authorized to remove friendship
   * @throws com.hackathon25.safenet.domain.exception.friend.FriendshipNotFoundException if
   *     friendship does not exist
   */
  void removeFriendship(UUID userId1, UUID userId2);

  /**
   * Get mutual friends between two users.
   *
   * @param userId1 the ID of the first user
   * @param userId2 the ID of the second user
   * @return list of mutual friends
   * @throws com.hackathon25.safenet.domain.exception.friend.FriendshipException if user IDs are
   *     null
   * @throws com.hackathon25.safenet.domain.exception.friend.SelfFriendRequestException if both user
   *     IDs are the same
   * @throws com.hackathon25.safenet.domain.exception.user.UserNotFoundException if either user does
   *     not exist
   */
  List<User> getMutualFriends(UUID userId1, UUID userId2);
}
