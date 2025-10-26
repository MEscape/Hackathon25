package com.hackathon25.safenet.infrastructure.adapter.web.controller;

import com.hackathon25.safenet.domain.model.user.UserLocation;
import com.hackathon25.safenet.domain.port.inbound.UpdateUserLocationPort;
import com.hackathon25.safenet.domain.port.inbound.UserLocationPort;
import com.hackathon25.safenet.infrastructure.adapter.web.dto.location.UpdateLocationDto;
import com.hackathon25.safenet.infrastructure.adapter.web.dto.location.UserLocationDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

/**
 * REST Controller for retrieving and updating user locations.
 *
 * <p>This controller handles location queries and updates, combining previous retrieval and update
 * operations into a single REST adapter.
 *
 * <h3>Supported Operations</h3>
 *
 * <ul>
 *   <li>Get Friends' Locations
 *   <li>Get Friend Location
 *   <li>Update Location
 *   <li>Update Visibility
 * </ul>
 *
 * <h3>Security Features</h3>
 *
 * <ul>
 *   <li>JWT Authentication required for all endpoints
 *   <li>User context extracted from authentication token
 *   <li>Authorization checks for location access
 * </ul>
 */
@Slf4j
@RestController
@RequestMapping("/api/v1/locations")
@RequiredArgsConstructor
@Tag(name = "User Locations", description = "User location retrieval and update operations")
public class UserLocationsController {

  private final UserLocationPort userLocationPort;
  private final UpdateUserLocationPort updateUserLocationPort;

  // -------------------- Retrieval Endpoints --------------------

  @GetMapping("/friends")
  @Operation(
      summary = "Get friends' locations",
      description = "Retrieve visible locations of the authenticated user's friends")
  @ApiResponses(
      value = {
        @ApiResponse(
            responseCode = "200",
            description = "Friends' locations retrieved successfully",
            content = @Content(schema = @Schema(implementation = UserLocationDto.class))),
        @ApiResponse(responseCode = "401", description = "Authentication required")
      })
  public ResponseEntity<List<UserLocationDto>> getFriendsLocations(Authentication authentication) {

    log.info("Getting friends' locations for user: {}", authentication.getName());

    UUID userId = UUID.fromString(authentication.getName());
    List<UserLocation> friendsLocations = userLocationPort.getFriendsLocations(userId);

    List<UserLocationDto> responseDtos =
        friendsLocations.stream().map(UserLocationDto::from).toList();

    log.info(
        "Retrieved {} friends' locations for user: {}",
        responseDtos.size(),
        authentication.getName());

    return ResponseEntity.ok(responseDtos);
  }

  // -------------------- Update Endpoints --------------------

  @PutMapping("/update")
  @Operation(
      summary = "Update user location",
      description = "Update the authenticated user's current location coordinates and settings")
  @ApiResponses(
      value = {
        @ApiResponse(
            responseCode = "200",
            description = "Location updated successfully",
            content = @Content(schema = @Schema(implementation = UserLocationDto.class))),
        @ApiResponse(responseCode = "400", description = "Invalid location data"),
        @ApiResponse(responseCode = "401", description = "Authentication required")
      })
  public ResponseEntity<UserLocationDto> updateLocation(
      @Valid @RequestBody UpdateLocationDto locationUpdate, Authentication authentication) {

    log.debug("Updating location for user: {}", authentication.getName());

    UUID userId = UUID.fromString(authentication.getName());

    UserLocation updated =
        updateUserLocationPort.updateLocation(
            userId,
            locationUpdate.getLatitude(),
            locationUpdate.getLongitude(),
            locationUpdate.getAltitude(),
            locationUpdate.getAccuracy(),
            locationUpdate.getVisibleToFriends());

    log.info("Location updated successfully for user: {}", userId);
    return ResponseEntity.ok(UserLocationDto.from(updated));
  }

  @PatchMapping("/visibility")
  @Operation(
      summary = "Update location visibility",
      description = "Toggle whether the user's location is visible to friends")
  @ApiResponses(
      value = {
        @ApiResponse(
            responseCode = "200",
            description = "Visibility updated successfully",
            content = @Content(schema = @Schema(implementation = UserLocationDto.class))),
        @ApiResponse(
            responseCode = "400",
            description = "Invalid visibility data or no location exists"),
        @ApiResponse(responseCode = "401", description = "Authentication required")
      })
  public ResponseEntity<UserLocationDto> updateLocationVisibility(
      @RequestBody Map<String, Boolean> visibilityUpdate, Authentication authentication) {

    log.debug("Updating location visibility for user: {}", authentication.getName());

    UUID userId = UUID.fromString(authentication.getName());
    Boolean visible = visibilityUpdate.get("visible");

    if (visible == null) {
      throw new IllegalArgumentException("Visibility setting is required");
    }

    UserLocation updated = updateUserLocationPort.updateLocationVisibility(userId, visible);

    log.info("Location visibility updated to {} for user: {}", visible, userId);
    return ResponseEntity.ok(UserLocationDto.from(updated));
  }
}
