package com.hackathon25.safenet.domain.port.inbound;

import com.hackathon25.safenet.domain.model.user.UserLocation;
import java.math.BigDecimal;
import java.util.UUID;

/**
 * Port interface for updating user location operations.
 *
 * <p>This port defines the contract for location-related use cases, providing methods for updating,
 * retrieving, and managing user location data with privacy controls.
 *
 * <h3>Key Operations</h3>
 *
 * <ul>
 *   <li>Update user's current location
 *   <li>Manage location visibility settings
 *   <li>Retrieve current and friend locations
 *   <li>Handle emergency location sharing
 * </ul>
 *
 * @author SafeNet Development Team
 * @since 1.0.0
 */
public interface UpdateUserLocationPort {

  /**
   * Update user's current location with coordinates and visibility settings.
   *
   * <p>This method updates the user's location data and triggers appropriate notifications to
   * friends based on privacy settings.
   *
   * @param userId the unique identifier of the user
   * @param latitude the latitude coordinate (-90 to 90 degrees)
   * @param longitude the longitude coordinate (-180 to 180 degrees)
   * @param altitude the altitude in meters (optional, can be null)
   * @param accuracy the location accuracy in meters (optional, can be null)
   * @param visibleToFriends whether the location should be visible to friends
   * @return the updated UserLocation entity
   * @throws IllegalArgumentException if coordinates are invalid or user ID is null
   * @throws RuntimeException if user is not found
   */
  UserLocation updateLocation(
      UUID userId,
      BigDecimal latitude,
      BigDecimal longitude,
      BigDecimal altitude,
      BigDecimal accuracy,
      Boolean visibleToFriends);

  /**
   * Update location visibility settings for a user.
   *
   * <p>This method allows users to control whether their location is shared with friends without
   * updating the actual coordinates.
   *
   * @param userId the unique identifier of the user
   * @param visible whether the location should be visible to friends
   * @return the updated UserLocation entity
   * @throws IllegalArgumentException if user ID is null
   * @throws RuntimeException if user is not found
   */
  UserLocation updateLocationVisibility(UUID userId, Boolean visible);
}
