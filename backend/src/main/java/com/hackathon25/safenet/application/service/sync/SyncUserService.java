package com.hackathon25.safenet.application.service.sync;

import com.hackathon25.safenet.domain.model.user.User;
import com.hackathon25.safenet.domain.port.inbound.SyncUserPort;
import com.hackathon25.safenet.domain.port.outbound.UserRepositoryPort;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Map;
import java.util.UUID;

/**
 * Application service for synchronizing user data between Keycloak and the local database.
 * 
 * <p>This service implements the core business logic for user synchronization in the
 * hexagonal architecture. It serves as the primary use case implementation for handling
 * user lifecycle events from Keycloak webhooks.</p>
 * 
 * <h3>Key Responsibilities</h3>
 * <ul>
 *   <li>Synchronize user data from Keycloak to local database</li>
 *   <li>Handle user creation, updates, and deletion</li>
 *   <li>Validate business rules and data integrity</li>
 *   <li>Manage transactional consistency</li>
 * </ul>
 * 
 * <h3>Business Rules</h3>
 * <ul>
 *   <li>Id must be unique and non-null</li>
 *   <li>Username must be provided and non-empty</li>
 *   <li>Email must be valid format when provided</li>
 *   <li>Additional attributes are stored as JSONB metadata</li>
 * </ul>
 * 
 * <h3>Transaction Management</h3>
 * <p>All operations are transactional to ensure data consistency. Failed operations
 * will be rolled back automatically, maintaining database integrity.</p>
 * 
 * <h3>Error Handling</h3>
 * <p>The service provides comprehensive validation and error handling:</p>
 * <ul>
 *   <li>Input validation with descriptive error messages</li>
 *   <li>Database constraint violation handling</li>
 *   <li>Detailed logging for troubleshooting</li>
 * </ul>
 * 
 * @author SafeNet Development Team
 * @since 1.0.0
 * @see com.hackathon25.safenet.domain.port.inbound.SyncUserPort
 * @see User
 */
@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class SyncUserService implements SyncUserPort {

    private final UserRepositoryPort userRepository;

    /**
     * Synchronizes user data from Keycloak to the local database.
     * 
     * <p>This method implements the core user synchronization logic by either
     * creating a new user record or updating an existing one based on the
     * Keycloak authentication ID. It ensures data consistency and applies
     * business validation rules.</p>
     * 
     * <h4>Synchronization Algorithm</h4>
     * <ol>
     *   <li>Validate input parameters for required fields and format</li>
     *   <li>Check if user exists by Keycloak authentication ID</li>
     *   <li>If user exists: update with new data from Keycloak</li>
     *   <li>If user doesn't exist: create new user record</li>
     *   <li>Apply business rules and validation</li>
     *   <li>Persist changes to database within transaction</li>
     * </ol>
     * 
     * <h4>Data Mapping</h4>
     * <ul>
     *   <li>{@code id} - Keycloak user ID (primary identifier)</li>
     *   <li>{@code username} - Keycloak username (required)</li>
     *   <li>{@code email} - User email address (optional)</li>
     *   <li>{@code firstName} - User first name (optional)</li>
     *   <li>{@code lastName} - User last name (optional)</li>
     *   <li>{@code attributes} - Additional user metadata stored as JSONB</li>
     * </ul>
     * 
     * @param id the Keycloak authentication ID (must be non-null and non-empty)
     * @param username the username from Keycloak (must be non-null and non-empty)
     * @param email the user's email address (optional, can be null)
     * @param firstName the user's first name (optional, can be null)
     * @param lastName the user's last name (optional, can be null)
     * @param attributes additional user attributes from Keycloak (stored as JSONB)
     * @return the synchronized user entity with updated information
     * @throws IllegalArgumentException if required parameters are null or empty
     * @throws org.springframework.dao.DataIntegrityViolationException if database constraints are violated
     * @throws RuntimeException if database operation fails
     */
    @Override
    public User syncUser(
            UUID id,
            String username,
            String email,
            String firstName,
            String lastName,
            Map<String, Object> attributes) {

        log.info("Syncing user from Keycloak: id={}, username={}", id, username);

        // Find existing user or create new
        User user = userRepository.findById(id)
                .map(existingUser -> {
                    log.debug("User exists, updating: {}", id);
                    return existingUser.updateFromKeycloak(username, email, firstName, lastName, attributes);
                })
                .orElseGet(() -> {
                    log.debug("User not found, creating new: {}", id);
                    return User.createFromKeycloak(id, username, email, firstName, lastName, attributes);
                });

        // Business validation
        if (!user.isValid()) {
            log.error("Invalid user data: {}", user);
            throw new IllegalArgumentException("User must have valid data");
        }

        // Persist (upsert operation)
        User savedUser = userRepository.save(user);

        log.info("User synced successfully: id={}", savedUser.id());

        return savedUser;
    }
}