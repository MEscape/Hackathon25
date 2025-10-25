package com.hackathon25.safenet.domain.exception.friend;

import com.hackathon25.safenet.domain.model.friend.FriendRequest;

/**
 * Exception thrown when attempting an operation on a friend request with invalid status.
 * 
 * <p>This exception is thrown when a user tries to perform an operation
 * that requires a specific friend request status, but the request is in
 * a different status (e.g., trying to accept an already accepted request).</p>
 * 
 * @author SafeNet Development Team
 * @since 1.0.0
 */
public class InvalidFriendRequestStatusException extends FriendshipException {
    
    /**
     * Constructs a new invalid friend request status exception.
     * 
     * @param currentStatus the current status of the friend request
     * @param expectedStatus the expected status for the operation
     */
    public InvalidFriendRequestStatusException(FriendRequest.FriendRequestStatus currentStatus, 
                                             FriendRequest.FriendRequestStatus expectedStatus) {
        super("error.friend_request.invalid_status", currentStatus, expectedStatus);
    }
}