package com.hackathon25.safenet.domain.exception.friend;

/**
 * Exception thrown when a friend request is not found.
 *
 * <p>This exception is thrown when attempting to perform operations on a friend request that does
 * not exist in the system.
 *
 * @author SafeNet Development Team
 * @since 1.0.0
 */
public class FriendRequestNotFoundException extends FriendshipException {

  /**
   * Constructs a new friend request not found exception.
   *
   * @param requestId the ID of the friend request that was not found
   */
  public FriendRequestNotFoundException(String requestId) {
    super("error.friend_request.not_found", requestId);
  }
}
