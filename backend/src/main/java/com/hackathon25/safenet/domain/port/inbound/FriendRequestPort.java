package com.hackathon25.safenet.domain.port.inbound;

import com.hackathon25.safenet.domain.model.friend.FriendRequest;

import java.util.UUID;

public interface FriendRequestPort {

    /**
     * Send a friend request to another user
     *
     * @param requesterId ID of the user sending the request
     * @param requestedId ID of the user receiving the request
     * @return Created friend request
     * @throws com.hackathon.safenet.domain.exception.user.UserNotFoundException if either user does not exist
     * @throws com.hackathon.safenet.domain.exception.friend.SelfFriendRequestException if users are the same
     * @throws com.hackathon.safenet.domain.exception.friend.AlreadyFriendsException if users are already friends
     * @throws com.hackathon.safenet.domain.exception.friend.DuplicateFriendRequestException if request already exists
     */
    FriendRequest sendFriendRequest(UUID requesterId, UUID requestedId);

    /**
     * Accept a friend request
     *
     * @param requesterId ID of the user who sent the friend request
     * @param userId ID of the user accepting the request (must be the requested user)
     * @return Updated friend request
     * @throws com.hackathon.safenet.domain.exception.friend.FriendRequestNotFoundException if request not found
     * @throws com.hackathon.safenet.domain.exception.friend.UnauthorizedFriendRequestActionException if user not authorized
     * @throws com.hackathon.safenet.domain.exception.friend.InvalidFriendRequestStatusException if request not in pending status
     */
    FriendRequest acceptFriendRequest(UUID requesterId, UUID userId);

    /**
     * Reject a friend request
     *
     * @param requesterId ID of the user who sent the friend request
     * @param userId ID of the user rejecting the request (must be the requested user)
     * @return Updated friend request
     * @throws com.hackathon.safenet.domain.exception.friend.FriendRequestNotFoundException if request not found
     * @throws com.hackathon.safenet.domain.exception.friend.UnauthorizedFriendRequestActionException if user not authorized
     * @throws com.hackathon.safenet.domain.exception.friend.InvalidFriendRequestStatusException if request not in pending status
     */
    FriendRequest rejectFriendRequest(UUID requesterId, UUID userId);
}