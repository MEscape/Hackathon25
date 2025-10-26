package com.hackathon25.safenet.domain.exception.user;

import lombok.Getter;

/**
 * Exception thrown when a user cannot be found.
 *
 * <p>This exception is used when attempting to retrieve a user by their ID or authentication ID,
 * but no matching user exists in the system.
 *
 * <p>It provides an {@code errorCode} and {@code messageArgs} for consistent error localization and
 * structured error handling.
 *
 * @author SafeNet Development Team
 * @since 1.0.0
 */
@Getter
public class UserNotFoundException extends RuntimeException {

  private final String errorCode;
  private final Object[] messageArgs;

  /**
   * Constructs a new user not found exception with a specific user ID.
   *
   * @param userId the ID of the user that was not found
   */
  public UserNotFoundException(String userId) {
    super("User with ID " + userId + " was not found.");
    this.errorCode = "error.user.not_found";
    this.messageArgs = new Object[] {userId};
  }

  /**
   * Constructs a new user not found exception for two users (e.g., requester and target).
   *
   * @param requesterId the ID of the requester
   * @param targetId the ID of the user who was expected to exist
   */
  public UserNotFoundException(String requesterId, String targetId) {
    super("User not found between requester " + requesterId + " and target " + targetId + ".");
    this.errorCode = "error.user.not_found_between";
    this.messageArgs = new Object[] {requesterId, targetId};
  }

  /**
   * Constructs a new user not found exception with a custom message and cause.
   *
   * @param message the detail message
   * @param cause the cause of the exception
   */
  public UserNotFoundException(String message, Throwable cause) {
    super(message, cause);
    this.errorCode = "error.user.not_found";
    this.messageArgs = new Object[0];
  }
}
