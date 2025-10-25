package com.hackathon25.safenet.domain.port.outbound;

import com.hackathon25.safenet.domain.model.friend.Friendship;
import com.hackathon25.safenet.domain.model.user.User;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

/**
 * Outbound port for friendship persistence operations.
 *
 * <p>This interface defines the operations required to persist and query
 * friendships between users. It abstracts the infrastructure layer
 * (JPA, database, etc.) from the domain and application layers.</p>
 */
public interface FriendshipRepositoryPort {

    /**
     * Save or update a friendship.
     *
     * @param friendship the friendship to save
     * @return the saved friendship
     */
    Friendship save(Friendship friendship);

    /**
     * Find a friendship by its ID.
     *
     * @param id the friendship ID
     * @return an optional containing the friendship if found
     */
    Optional<Friendship> findById(UUID id);

    /**
     * Find all friends of a user (returns User objects).
     *
     * @param userId the user ID
     * @return list of friend User objects
     */
    List<User> findFriendsByUserId(UUID userId);

    /**
     * Check if two users are friends.
     *
     * @param user1Id first user ID
     * @param user2Id second user ID
     * @return true if they are friends
     */
    boolean existsBetweenUsers(UUID user1Id, UUID user2Id);

    /**
     * Delete a friendship between two users.
     *
     * @param user1Id the first user ID
     * @param user2Id the second user ID
     */
    void deleteBetweenUsers(UUID user1Id, UUID user2Id);

    /**
     * Find mutual friends between two users.
     *
     * @param user1Id the first user ID
     * @param user2Id the second user ID
     * @return list of mutual friend User objects
     */
    List<User> findMutualFriends(UUID user1Id, UUID user2Id);
}