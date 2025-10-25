package com.hackathon25.safenet.application.service.friend;

import com.hackathon25.safenet.domain.exception.friend.*;
import com.hackathon25.safenet.domain.exception.user.UserNotFoundException;
import com.hackathon25.safenet.domain.model.friend.FriendRequest;
import com.hackathon25.safenet.domain.model.friend.Friendship;
import com.hackathon25.safenet.domain.port.inbound.FriendRequestPort;
import com.hackathon25.safenet.domain.port.outbound.FriendRequestRepositoryPort;
import com.hackathon25.safenet.domain.port.outbound.FriendshipRepositoryPort;
import com.hackathon25.safenet.domain.port.outbound.UserRepositoryPort;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

/**
 * Service implementation for friend request operations.
 *
 * <p>Handles the complete lifecycle of friend requests including sending,
 * accepting, rejecting, and canceling requests. Ensures proper validation
 * and state transitions according to business rules.</p>
 *
 * @author SafeNet Development Team
 * @since 1.0.0
 */
@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class FriendRequestService implements FriendRequestPort {

    private final FriendRequestRepositoryPort friendRequestRepository;
    private final FriendshipRepositoryPort friendshipRepository;
    private final UserRepositoryPort userRepository;

    @Override
    public FriendRequest sendFriendRequest(UUID requesterId, UUID requestedId) {
        log.info("Sending friend request from {} to {}", requesterId, requestedId);

        validateUsersExist(requesterId, requestedId);
        validateFriendRequest(requesterId, requestedId);

        FriendRequest friendRequest = FriendRequest.create(requesterId, requestedId);
        FriendRequest saved = friendRequestRepository.save(friendRequest);

        log.info("Friend request sent successfully: {}", saved.id());
        return saved;
    }

    @Override
    public FriendRequest acceptFriendRequest(UUID requesterId, UUID userId) {
        log.info("User {} accepting friend request from {}", userId, requesterId);

        FriendRequest request = getFriendRequestBetweenUsers(requesterId, userId);
        validateCanAccept(request, userId);

        FriendRequest acceptedRequest = request.accept();
        FriendRequest saved = friendRequestRepository.save(acceptedRequest);

        Friendship friendship = Friendship.create(request.requesterId(), request.requestedId());
        friendshipRepository.save(friendship);

        log.info("Friend request accepted, friendship created: {}", saved.id());
        return saved;
    }

    @Override
    public FriendRequest rejectFriendRequest(UUID requesterId, UUID userId) {
        log.info("User {} rejecting friend request from {}", userId, requesterId);

        FriendRequest request = getFriendRequestBetweenUsers(requesterId, userId);
        validateCanReject(request, userId);

        FriendRequest rejectedRequest = request.reject();
        FriendRequest saved = friendRequestRepository.save(rejectedRequest);

        log.info("Friend request rejected: {}", saved.id());
        return saved;
    }

    // ========== Validation Methods ==========

    private void validateUsersExist(UUID requesterId, UUID requestedId) {
        if (!userRepository.existsById(requesterId)) {
            throw new UserNotFoundException(requesterId.toString());
        }
        if (!userRepository.existsById(requestedId)) {
            throw new UserNotFoundException(requestedId.toString());
        }
    }

    private void validateFriendRequest(UUID requesterId, UUID requestedId) {
        if (requesterId.equals(requestedId)) {
            throw new SelfFriendRequestException(requesterId.toString());
        }

        if (friendshipRepository.existsBetweenUsers(requesterId, requestedId)) {
            throw new AlreadyFriendsException(requesterId.toString(), requestedId.toString());
        }

        if (friendRequestRepository.existsBetweenUsers(requesterId, requestedId)) {
            throw new DuplicateFriendRequestException(requesterId.toString(), requestedId.toString());
        }
    }

    private void validateCanAccept(FriendRequest request, UUID userId) {
        if (!request.requestedId().equals(userId)) {
            throw new InvalidFriendRequestOperationException();
        }
        validatePending(request);
    }

    private void validateCanReject(FriendRequest request, UUID userId) {
        if (!request.requestedId().equals(userId)) {
            throw new InvalidFriendRequestOperationException();
        }
        validatePending(request);
    }

    private void validatePending(FriendRequest request) {
        if (request.status() != FriendRequest.FriendRequestStatus.PENDING) {
            throw new InvalidFriendRequestStatusException(request.status(), FriendRequest.FriendRequestStatus.PENDING);
        }
    }

    private FriendRequest getFriendRequest(UUID requestId) {
        return friendRequestRepository.findById(requestId)
                .orElseThrow(() -> new FriendRequestNotFoundException(requestId.toString()));
    }

    private FriendRequest getFriendRequestBetweenUsers(UUID requesterId, UUID userId) {
        return friendRequestRepository.findBetweenUsers(requesterId, userId)
                .orElseThrow(() -> new FriendRequestNotFoundException("Friend request not found between users: " + requesterId + " and " + userId));
    }
}