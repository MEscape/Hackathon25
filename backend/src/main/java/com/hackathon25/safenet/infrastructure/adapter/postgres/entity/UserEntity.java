package com.hackathon25.safenet.infrastructure.adapter.postgres.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import java.time.Instant;
import java.util.Map;
import java.util.UUID;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.annotations.UpdateTimestamp;
import org.hibernate.type.SqlTypes;

/**
 * JPA Entity for User table Maps to the 'users' table in PostgreSQL/Supabase. Represents
 * synchronized user data from Keycloak with JSONB metadata support. Features: - UUID primary key
 * with auto-generation - JSONB metadata field for flexible attribute storage - Automatic timestamp
 * management - Bean validation constraints - Optimistic locking support
 */
@Entity
@Table(
    name = "users",
    indexes = {
      @Index(name = "idx_users_auth_id", columnList = "auth_id", unique = true),
      @Index(name = "idx_users_email", columnList = "email"),
      @Index(name = "idx_users_username", columnList = "username")
    })
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserEntity {

  /**
   * Keycloak user ID (sub claim from JWT) This is the unique identifier from the identity provider
   */
  @Id
  @Column(name = "auth_id", nullable = false, unique = true)
  @NotNull(message = "Auth ID is required")
  private UUID id;

  /** Username from Keycloak Optional field - user might only have email */
  @Column(name = "username", nullable = false, unique = true)
  @Pattern(
      regexp = "^[a-zA-Z0-9._-]{3,20}$",
      message =
          "Username must be 3-20 characters and contain only letters, digits, dots, underscores, and dashes")
  private String username;

  /** Email address from Keycloak Optional field - user might only have username */
  @Column(name = "email", nullable = false, unique = true)
  @Email(message = "Email must be valid")
  @Size(max = 255, message = "Email must not exceed 255 characters")
  private String email;

  /** First name from Keycloak Optional field - extracted from user attributes */
  @Column(name = "first_name")
  @Pattern(
      regexp = "^[\\p{L}\\s'.-]{1,50}$",
      message =
          "First name must be 1-50 characters and contain only letters, spaces, apostrophes, dots, and hyphens")
  private String firstName;

  /** Last name from Keycloak Optional field - extracted from user attributes */
  @Column(name = "last_name")
  @Pattern(
      regexp = "^[\\p{L}\\s'.-]{1,50}$",
      message =
          "Last name must be 1-50 characters and contain only letters, spaces, apostrophes, dots, and hyphens")
  private String lastName;

  /**
   * JSONB metadata field for flexible attribute storage Stores Keycloak attributes, roles, custom
   * claims, etc.
   *
   * <p>Example content: { "first_name": "John", "last_name": "Doe", "roles": ["admin", "user"],
   * "department": "IT", "location": "Munich" }
   */
  @Column(name = "meta", columnDefinition = "jsonb")
  @JdbcTypeCode(SqlTypes.JSON)
  @Builder.Default
  private Map<String, Object> meta = Map.of();

  /** Record creation timestamp Automatically set by database on insert */
  @Column(name = "created_at", nullable = false, updatable = false)
  @Builder.Default
  private Instant createdAt = Instant.now();

  /** Record last update timestamp Automatically updated by database trigger on update */
  @Column(name = "updated_at", nullable = false)
  @UpdateTimestamp
  @Builder.Default
  private Instant updatedAt = Instant.now();

  /** JPA lifecycle callback - set timestamps before persist */
  @PrePersist
  protected void onCreate() {
    if (createdAt == null) {
      createdAt = Instant.now();
    }
    if (updatedAt == null) {
      updatedAt = Instant.now();
    }
  }

  /** JPA lifecycle callback - update timestamp before update */
  @PreUpdate
  protected void onUpdate() {
    updatedAt = Instant.now();
  }
}
