package com.hackathon25.safenet.application.service.friend;

import com.hackathon25.safenet.domain.exception.friend.*;
import com.hackathon25.safenet.domain.exception.user.UserNotFoundException;
import com.hackathon25.safenet.domain.model.friend.FriendRequest;
import com.hackathon25.safenet.domain.model.user.User;
import com.hackathon25.safenet.domain.port.inbound.FriendshipPort;
import com.hackathon25.safenet.domain.port.outbound.FriendRequestRepositoryPort;
import com.hackathon25.safenet.domain.port.outbound.FriendshipRepositoryPort;
import com.hackathon25.safenet.domain.port.outbound.UserRepositoryPort;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

/**
 * Service implementation for friendship management operations.
 *
 * <p>This service handles all friendship-related operations including retrieving
 * friends, managing friendships, and providing friendship statistics.</p>
 *
 * <h3>Key Features</h3>
 * <ul>
 *   <li><strong>Friend Management:</strong> Comprehensive friendship operations and queries</li>
 *   <li><strong>Validation:</strong> Proper validation for user existence and friendship status</li>
 *   <li><strong>Statistics:</strong> Friend counts, mutual friends, and recent friendship data</li>
 *   <li><strong>Performance:</strong> Optimized queries for large friend networks</li>
 * </ul>
 *
 * <h3>Friendship Model</h3>
 * <p>Friendships are bidirectional relationships stored as a single record with
 * user1Id and user2Id. The service handles the bidirectional nature transparently,
 * allowing queries from either user's perspective.</p>
 *
 * @author SafeNet Development Team
 * @since 1.0.0
 */
@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class FriendshipService implements FriendshipPort {

    private final FriendshipRepositoryPort friendshipRepository;
    private final UserRepositoryPort userRepository;
    private final FriendRequestRepositoryPort friendRequestRepository;

    @Override
    @Transactional(readOnly = true)
    public List<User> getFriends(UUID userId) {
        log.debug("Getting friends for user: {}", userId);

        validateUserIdNotNull(userId);
        validateUserExists(userId);

        return friendshipRepository.findFriendsByUserId(userId);
    }

    @Override
    @Transactional(readOnly = true)
    public boolean areFriends(UUID userId1, UUID userId2) {
        log.debug("Checking friendship between users: {} and {}", userId1, userId2);

        if (userId1 == null || userId2 == null) {
            throw new FriendshipException("User IDs cannot be null");
        }

        if (userId1.equals(userId2)) {
            return false;
        }

        return friendshipRepository.existsBetweenUsers(userId1, userId2);
    }

    @Override
    public void removeFriendship(UUID userId1, UUID userId2) {
        log.info("Removing friendship between users: {} and {}, removed by: {}", userId1, userId2, userId1);

        validateRemoveFriendshipParams(userId1, userId2);
        validateUsersExist(userId1, userId2);
        validateFriendshipExists(userId1, userId2);

        friendshipRepository.deleteBetweenUsers(userId1, userId2);

        deleteFriendRequestIfExists(userId1, userId2);

        log.info("Successfully removed friendship between users: {} and {}", userId1, userId2);
    }

    @Override
    @Transactional(readOnly = true)
    public List<User> getMutualFriends(UUID userId1, UUID userId2) {
        log.debug("Getting mutual friends between users: {} and {}", userId1, userId2);

        validateMutualFriendsParams(userId1, userId2);
        validateUsersExist(userId1, userId2);

        return friendshipRepository.findMutualFriends(userId1, userId2);
    }

    // ========== Validation Methods ==========

    private void validateUserIdNotNull(UUID userId) {
        if (userId == null) {
            throw new FriendshipException("User ID cannot be null");
        }
    }

    private void validateUserExists(UUID userId) {
        if (!userRepository.existsById(userId)) {
            throw new UserNotFoundException(userId.toString());
        }
    }

    private void validateUsersExist(UUID userId1, UUID userId2) {
        userRepository.findById(userId1)
                .orElseThrow(() -> new UserNotFoundException(userId1.toString()));
        userRepository.findById(userId2)
                .orElseThrow(() -> new UserNotFoundException(userId2.toString()));
    }

    private void validateRemoveFriendshipParams(UUID userId1, UUID userId2) {
        if (userId1 == null || userId2 == null) {
            throw new FriendshipException("User IDs cannot be null");
        }
        if (userId1.equals(userId2)) {
            throw new SelfFriendRequestException(userId1.toString());
        }
    }

    private void validateMutualFriendsParams(UUID userId1, UUID userId2) {
        if (userId1 == null || userId2 == null) {
            throw new FriendshipException("User IDs cannot be null");
        }
        if (userId1.equals(userId2)) {
            throw new SelfFriendRequestException(userId1.toString());
        }
    }

    private void validateFriendshipExists(UUID userId1, UUID userId2) {
        if (!friendshipRepository.existsBetweenUsers(userId1, userId2)) {
            throw new FriendshipNotFoundException(userId1.toString(), userId2.toString());
        }
    }

    /**
     * Delete friend request if it exists between two users
     */
    private void deleteFriendRequestIfExists(UUID userId1, UUID userId2) {
        log.debug("Deleting friend request between users: {} and {}", userId1, userId2);
        
        if (friendRequestRepository.existsBetweenUsers(userId1, userId2)) {
            friendRequestRepository.deleteBetweenUsers(userId1, userId2);
            log.debug("Friend request deleted between users: {} and {}", userId1, userId2);
        }
    }
}