package com.hackathon25.safenet.domain.exception.friend;

/**
 * Exception thrown when attempting to create a friendship that already exists.
 * 
 * <p>This exception is thrown when a user tries to send a friend request
 * to someone they are already friends with, or when attempting to create
 * a duplicate friendship relationship.</p>
 * 
 * @author SafeNet Development Team
 * @since 1.0.0
 */
public class AlreadyFriendsException extends FriendshipException {
    
    /**
     * Constructs a new already friends exception.
     * 
     * @param user1Id the ID of the first user
     * @param user2Id the ID of the second user
     */
    public AlreadyFriendsException(String user1Id, String user2Id) {
        super("error.friendship.already_exists", user1Id, user2Id);
    }
}