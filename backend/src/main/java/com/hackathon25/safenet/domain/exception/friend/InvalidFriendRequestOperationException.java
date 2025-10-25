package com.hackathon25.safenet.domain.exception.friend;

/**
 * Exception thrown when attempting an invalid friend request operation.
 * 
 * <p>This exception is thrown when a user tries to perform an operation
 * that is not allowed given the current state of the friend request,
 * such as accepting their own request or operating on a request with
 * an invalid status.</p>
 * 
 * @author SafeNet Development Team
 * @since 1.0.0
 */
public class InvalidFriendRequestOperationException extends FriendshipException {
    
    /**
     * Constructs a new invalid friend request operation exception for self-requests.
     */
    public InvalidFriendRequestOperationException() {
        super("error.friend_request.invalid_operation");
    }
}