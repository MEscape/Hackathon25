package com.hackathon25.safenet.domain.model.user;

import java.time.Instant;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;
import java.util.UUID;
import java.util.regex.Pattern;

/**
 * Immutable domain model representing an application user, typically synchronized with Keycloak as
 * the source of truth.
 */
public record User(
    UUID id, // Keycloak user ID
    String username,
    String email,
    String firstName,
    String lastName,
    Map<String, Object> meta, // JSONB metadata from Keycloak attributes
    Instant createdAt,
    Instant updatedAt) {
  // Email pattern with max 255 characters constraint
  private static final Pattern EMAIL_PATTERN =
      Pattern.compile("^[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,}$", Pattern.CASE_INSENSITIVE);
  private static final int EMAIL_MAX_LENGTH = 255;

  // Username pattern: 3-20 chars, letters, digits, dot, underscore, dash
  private static final Pattern USERNAME_PATTERN = Pattern.compile("^[a-zA-Z0-9._-]{3,20}$");

  // Name pattern: 1-50 chars, Unicode letters, spaces, apostrophes, dots, hyphens
  private static final Pattern NAME_PATTERN = Pattern.compile("^[\\p{L}\\s'.-]{1,50}$");

  /**
   * Factory method for creating a new user from Keycloak event
   *
   * @param id Keycloak user ID
   * @param username Username from Keycloak
   * @param email Email from Keycloak
   * @param firstName First name from Keycloak
   * @param lastName Last name from Keycloak
   * @param meta Additional metadata (attributes, roles, etc.)
   * @return New User instance
   */
  public static User createFromKeycloak(
      UUID id,
      String username,
      String email,
      String firstName,
      String lastName,
      Map<String, Object> meta) {
    Objects.requireNonNull(id, "id must not be null");

    Instant now = Instant.now();
    return new User(
        id,
        username,
        email,
        firstName,
        lastName,
        meta != null ? Map.copyOf(meta) : Map.of(),
        now,
        now);
  }

  /**
   * Update user with new data from Keycloak Returns a new immutable instance with updated fields
   * Metadata merge strategy: preserves existing keys, adds new keys, updates changed values
   */
  public User updateFromKeycloak(
      String username,
      String email,
      String firstName,
      String lastName,
      Map<String, Object> newMeta) {

    // Merge metadata: start with existing, then add/update with new
    Map<String, Object> mergedMeta = new HashMap<>(this.meta);

    if (newMeta != null) {
      for (Map.Entry<String, Object> entry : newMeta.entrySet()) {
        Object existingValue = mergedMeta.get(entry.getKey());
        Object newValue = entry.getValue();

        // Add new key or update if value is different
        if (!Objects.equals(existingValue, newValue)) {
          mergedMeta.put(entry.getKey(), newValue);
        }
      }
    }

    return new User(
        this.id,
        username,
        email,
        firstName,
        lastName,
        Map.copyOf(mergedMeta), // Make immutable
        this.createdAt,
        Instant.now() // Update timestamp
        );
  }

  /** Checks if the email is syntactically valid and within length constraints. */
  public boolean hasValidEmail() {
    return email != null
        && !email.isBlank()
        && email.length() <= EMAIL_MAX_LENGTH
        && EMAIL_PATTERN.matcher(email).matches();
  }

  /** Checks if the username is valid. */
  public boolean hasValidUsername() {
    return username != null && !username.isBlank() && USERNAME_PATTERN.matcher(username).matches();
  }

  /** Checks if the first name is valid (optional field). */
  public boolean hasValidFirstName() {
    return firstName == null
        || firstName.isBlank()
        || NAME_PATTERN.matcher(firstName.trim()).matches();
  }

  /** Checks if the last name is valid (optional field). */
  public boolean hasValidLastName() {
    return lastName == null
        || lastName.isBlank()
        || NAME_PATTERN.matcher(lastName.trim()).matches();
  }

  /**
   * Business rule: User must have valid required fields. Required: id, username, email Optional but
   * must be valid if present: firstName, lastName
   */
  public boolean isValid() {
    return hasValidUsername() && hasValidEmail() && hasValidFirstName() && hasValidLastName();
  }
}
