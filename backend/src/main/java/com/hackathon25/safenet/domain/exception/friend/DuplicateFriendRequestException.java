package com.hackathon25.safenet.domain.exception.friend;

/**
 * Exception thrown when attempting to create a duplicate friend request.
 * 
 * <p>This exception is thrown when a user tries to send a friend request
 * to someone they have already sent a request to, or when a pending
 * request already exists between the users.</p>
 * 
 * @author SafeNet Development Team
 * @since 1.0.0
 */
public class DuplicateFriendRequestException extends FriendshipException {
    
    /**
     * Constructs a new duplicate friend request exception.
     * 
     * @param requesterId the ID of the user sending the request
     * @param requestedId the ID of the user receiving the request
     */
    public DuplicateFriendRequestException(String requesterId, String requestedId) {
        super("error.friend_request.duplicate", requesterId, requestedId);
    }
}