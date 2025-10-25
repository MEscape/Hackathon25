package com.hackathon25.safenet.domain.port.outbound;

import com.hackathon25.safenet.domain.model.friend.FriendRequest;

import java.util.Optional;
import java.util.UUID;

public interface FriendRequestRepositoryPort {

    /**
     * Save or update friend request
     */
    FriendRequest save(FriendRequest friendRequest);

    /**
     * Find friend request by ID
     */
    Optional<FriendRequest> findById(UUID id);

    /**
     * Check if friend request exists between two users (in either direction)
     */
    boolean existsBetweenUsers(UUID user1Id, UUID user2Id);


    /**
     * Find friend request between two users (in either direction)
     */
    Optional<FriendRequest> findBetweenUsers(UUID user1Id, UUID user2Id);

    /**
     * Delete friend request between two users (in either direction)
     */
    void deleteBetweenUsers(UUID user1Id, UUID user2Id);
}