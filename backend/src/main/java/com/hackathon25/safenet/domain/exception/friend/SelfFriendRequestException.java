package com.hackathon25.safenet.domain.exception.friend;

/**
 * Exception thrown when attempting to send a friend request to oneself.
 *
 * <p>This exception is thrown when a user tries to send a friend request to their own user ID,
 * which is not allowed in the system.
 *
 * @author SafeNet Development Team
 * @since 1.0.0
 */
public class SelfFriendRequestException extends FriendshipException {

  /**
   * Constructs a new self friend request exception.
   *
   * @param userId the ID of the user who tried to send a request to themselves
   */
  public SelfFriendRequestException(String userId) {
    super("error.friend_request.self_request", userId);
  }
}
