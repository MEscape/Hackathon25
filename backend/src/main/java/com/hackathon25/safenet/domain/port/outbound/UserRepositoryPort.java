package com.hackathon25.safenet.domain.port.outbound;

import com.hackathon25.safenet.domain.model.user.User;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

/**
 * Outbound port for user repository operations.
 *
 * <p>This port defines the contract for persisting and retrieving user data. Implementations handle
 * the actual database interactions.
 *
 * @author SafeNet Development Team
 * @since 1.0.0
 */
public interface UserRepositoryPort {

  /**
   * Save a user to the repository
   *
   * @param user the user to save
   * @return the saved user
   */
  User save(User user);

  /**
   * Find a user by ID
   *
   * @param id the user ID
   * @return optional containing the user if found
   */
  Optional<User> findById(UUID id);

  /**
   * Find all users
   *
   * @return list of all users
   */
  List<User> findAll();

  /**
   * Check if a user exists by ID
   *
   * @param id the user ID
   * @return true if user exists
   */
  boolean existsById(UUID id);

  /**
   * Delete a user by ID
   *
   * @param id the user ID
   */
  void deleteById(UUID id);

  String getExpoPushToken(UUID userId);
}
