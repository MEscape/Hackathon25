package com.hackathon25.safenet.domain.model.user;

import java.util.UUID;

/**
 * Domain model representing a discoverable user with friend request status and mutual friends
 * count. This is a pure domain object that encapsulates the business concept of a user that can be
 * discovered by other users in the emergency contacts feature.
 *
 * @param id the user's unique identifier
 * @param username the user's username
 * @param email the user's email address
 * @param mutualFriends the number of mutual friends with the current user
 * @param requestStatus the friend request status between users
 * @author SafeNet Development Team
 * @since 1.0.0
 */
public record DiscoverableUser(
    UUID id, String username, String email, Integer mutualFriends, String requestStatus) {

  /** Friend request status constants */
  public static final class RequestStatus {
    public static final String NONE = "none";
    public static final String SENT = "sent";
    public static final String RECEIVED = "received";
    public static final String FRIENDS = "friends";

    private RequestStatus() {
      // Utility class
    }
  }
}
