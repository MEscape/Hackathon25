package com.hackathon25.safenet.infrastructure.adapter.web.controller;

import com.hackathon25.safenet.domain.model.user.DiscoverableUser;
import com.hackathon25.safenet.domain.model.user.User;
import com.hackathon25.safenet.domain.port.inbound.FriendRequestPort;
import com.hackathon25.safenet.domain.port.inbound.FriendshipPort;
import com.hackathon25.safenet.domain.port.inbound.UserPort;
import com.hackathon25.safenet.infrastructure.adapter.web.dto.emergency.*;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

/**
 * REST Controller for emergency contacts and user discovery.
 *
 * <p>This controller consolidates friend and user management operations
 * to match the frontend API structure. It provides endpoints for managing
 * emergency contacts (friends) and discovering new users.</p>
 *
 * <h3>Supported Operations</h3>
 * <ul>
 *   <li>Get Emergency Contacts - List all friends</li>
 *   <li>Discover Users - Find users with request status</li>
 *   <li>Send Friend Request - Request friendship with a user</li>
 *   <li>Accept Friend Request - Accept incoming request</li>
 *   <li>Decline Friend Request - Decline incoming request</li>
 *   <li>Remove Emergency Contact - Unfriend a user</li>
 * </ul>
 *
 * @author SafeNet Development Team
 * @since 1.0.0
 */
@Slf4j
@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
@Tag(name = "Emergency Contacts", description = "Emergency contact and user discovery operations")
public class EmergencyContactController {

    private final FriendshipPort friendshipPort;
    private final FriendRequestPort friendRequestPort;
    private final UserPort userPort;

    /**
     * Get all emergency contacts (friends) for the current user.
     *
     * @param authentication the current user's authentication
     * @return list of emergency contacts with status
     */
    @GetMapping("/emergency-contacts")
    @Operation(summary = "Get emergency contacts",
            description = "Get all emergency contacts (friends) for the current user")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Emergency contacts retrieved successfully",
                    content = @Content(schema = @Schema(implementation = EmergencyContactsResponseDto.class))),
            @ApiResponse(responseCode = "401", description = "Unauthorized")
    })
    public ResponseEntity<EmergencyContactsResponseDto> getEmergencyContacts(
            Authentication authentication) {

        log.info("Getting emergency contacts for user: {}", authentication.getName());

        UUID userId = UUID.fromString(authentication.getName());
        List<User> friends = friendshipPort.getFriends(userId);

        List<EmergencyContactDto> contacts = friends.stream()
                .map(EmergencyContactDto::from)
                .toList();

        return ResponseEntity.ok(EmergencyContactsResponseDto.from(contacts));
    }

    /**
     * Discover users with their friend request status and mutual friends count.
     *
     * @param authentication the current user's authentication
     * @return list of discoverable users
     */
    @GetMapping("/users/discover")
    @Operation(summary = "Discover users",
            description = "Get list of users with friend request status and mutual friends count")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Users retrieved successfully",
                    content = @Content(schema = @Schema(implementation = DiscoverableUsersResponseDto.class))),
            @ApiResponse(responseCode = "401", description = "Unauthorized")
    })
    public ResponseEntity<DiscoverableUsersResponseDto> getDiscoverableUsers(
            Authentication authentication) {

        log.info("Getting discoverable users for user: {}", authentication.getName());

        UUID currentUserId = UUID.fromString(authentication.getName());
        List<DiscoverableUser> discoverableUsers = userPort.getDiscoverableUsers(currentUserId);

        // Convert domain objects to DTOs in the infrastructure layer
        List<DiscoverableUserDto> discoverableUserDtos = discoverableUsers.stream()
                .map(this::mapToDto)
                .toList();

        return ResponseEntity.ok(DiscoverableUsersResponseDto.from(discoverableUserDtos));
    }

    /**
     * Send a friend request to a user.
     *
     * @param userId the ID of the user to send request to
     * @param authentication the current user's authentication
     * @return success response
     */
    @PostMapping("/users/{userId}/friend-request")
    @Operation(summary = "Send friend request",
            description = "Send a friend request to another user")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Friend request sent successfully"),
            @ApiResponse(responseCode = "400", description = "Invalid request"),
            @ApiResponse(responseCode = "401", description = "Unauthorized"),
            @ApiResponse(responseCode = "404", description = "User not found"),
            @ApiResponse(responseCode = "409", description = "Request already exists or users are already friends")
    })
    public ResponseEntity<FriendRequestResponseDto> sendFriendRequest(
            @Parameter(description = "ID of the user to send friend request to")
            @PathVariable UUID userId,
            Authentication authentication) {

        log.info("User {} sending friend request to user {}", authentication.getName(), userId);

        UUID requesterId = UUID.fromString(authentication.getName());

        friendRequestPort.sendFriendRequest(requesterId, userId);
        return ResponseEntity.ok(
                FriendRequestResponseDto.success("Friend request sent successfully"));
    }

    /**
     * Accept a friend request from a user.
     *
     * @param userId the ID of the user who sent the request
     * @param authentication the current user's authentication
     * @return success response
     */
    @PostMapping("/users/{userId}/friend-request/accept")
    @Operation(summary = "Accept friend request",
            description = "Accept a pending friend request")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Friend request accepted successfully"),
            @ApiResponse(responseCode = "400", description = "Invalid request"),
            @ApiResponse(responseCode = "401", description = "Unauthorized"),
            @ApiResponse(responseCode = "404", description = "Friend request not found")
    })
    public ResponseEntity<FriendRequestResponseDto> acceptFriendRequest(
            @Parameter(description = "ID of the user who sent the friend request")
            @PathVariable UUID userId,
            Authentication authentication) {

        UUID currentUserId = UUID.fromString(authentication.getName());
        log.info("Accepting friend request from {} by {}", userId, currentUserId);

        friendRequestPort.acceptFriendRequest(userId, currentUserId);
        return ResponseEntity.ok(
                FriendRequestResponseDto.success("Friend request accepted successfully"));
    }

    /**
     * Decline a friend request from a user.
     *
     * @param userId the ID of the user who sent the request
     * @param authentication the current user's authentication
     * @return success response
     */
    @PostMapping("/users/{userId}/friend-request/decline")
    @Operation(summary = "Decline friend request",
            description = "Decline a pending friend request")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Friend request declined successfully"),
            @ApiResponse(responseCode = "400", description = "Invalid request"),
            @ApiResponse(responseCode = "401", description = "Unauthorized"),
            @ApiResponse(responseCode = "404", description = "Friend request not found")
    })
    public ResponseEntity<FriendRequestResponseDto> declineFriendRequest(
            @Parameter(description = "ID of the user who sent the friend request")
            @PathVariable UUID userId,
            Authentication authentication) {

        UUID currentUserId = UUID.fromString(authentication.getName());
        log.info("Declining friend request from {} by {}", userId, currentUserId);

        friendRequestPort.rejectFriendRequest(userId, currentUserId);

        return ResponseEntity.ok(
                FriendRequestResponseDto.success("Friend request declined successfully"));
    }

    /**
     * Remove an emergency contact (unfriend).
     *
     * @param userId the ID of the friend to remove
     * @param authentication the current user's authentication
     * @return success response
     */
    @DeleteMapping("/emergency-contacts/{userId}")
    @Operation(summary = "Remove an emergency contact",
            description = "Remove a friend from emergency contacts")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Emergency contact removed successfully"),
            @ApiResponse(responseCode = "400", description = "Invalid request"),
            @ApiResponse(responseCode = "401", description = "Unauthorized"),
            @ApiResponse(responseCode = "404", description = "Friendship not found")
    })
    public ResponseEntity<FriendRequestResponseDto> removeEmergencyContact(
            @Parameter(description = "ID of the friend to remove")
            @PathVariable UUID userId,
            Authentication authentication) {
        UUID currentUserId = UUID.fromString(authentication.getName());
        log.info("Removing emergency contact {} for user {}", userId, currentUserId);

        friendshipPort.removeFriendship(currentUserId, userId);
        return ResponseEntity.ok(
                FriendRequestResponseDto.success("Emergency contact removed successfully"));
    }

    /**
     * Maps a domain DiscoverableUser to a DiscoverableUserDto.
     * This mapping happens in the infrastructure layer, converting domain objects to DTOs.
     *
     * @param discoverableUser the domain object to map
     * @return the corresponding DTO
     */
    private DiscoverableUserDto mapToDto(DiscoverableUser discoverableUser) {
        return DiscoverableUserDto.builder()
                .id(discoverableUser.id())
                .username(discoverableUser.username())
                .email(discoverableUser.email())
                .mutualFriends(discoverableUser.mutualFriends())
                .requestStatus(discoverableUser.requestStatus())
                .build();
    }
}