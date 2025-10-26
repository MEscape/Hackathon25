package com.hackathon25.safenet.infrastructure.adapter.postgres.repository;

import com.hackathon25.safenet.infrastructure.adapter.postgres.entity.FriendRequestEntity;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Repository interface for {@link FriendRequestEntity}.
 *
 * <p>This interface extends {@link JpaRepository} providing basic CRUD operations, as well as
 * custom query methods for finding friend requests by various criteria.
 *
 * <p>Spring Data JPA automatically generates the implementation at runtime.
 */
@Repository
public interface FriendRequestJpaRepository extends JpaRepository<FriendRequestEntity, UUID> {

  /**
   * Check if a friend request exists between two users (in either direction)
   *
   * @param user1Id first user ID
   * @param user2Id second user ID
   * @return true if a request exists in either direction
   */
  @Query(
      "SELECT COUNT(fr) > 0 FROM FriendRequestEntity fr WHERE "
          + "(fr.requester.id = :user1Id AND fr.requested.id = :user2Id) OR "
          + "(fr.requester.id = :user2Id AND fr.requested.id = :user1Id)")
  boolean existsBetweenUsers(@Param("user1Id") UUID user1Id, @Param("user2Id") UUID user2Id);

  /**
   * Find friend request between two users (in either direction)
   *
   * @param user1Id first user ID
   * @param user2Id second user ID
   * @return friend request entity if found
   */
  @Query(
      "SELECT fr FROM FriendRequestEntity fr WHERE "
          + "(fr.requester.id = :user1Id AND fr.requested.id = :user2Id) OR "
          + "(fr.requester.id = :user2Id AND fr.requested.id = :user1Id)")
  FriendRequestEntity findBetweenUsers(
      @Param("user1Id") UUID user1Id, @Param("user2Id") UUID user2Id);

  /**
   * Delete friend request between two users (in either direction)
   *
   * @param user1Id first user ID
   * @param user2Id second user ID
   */
  @Modifying
  @Query(
      "DELETE FROM FriendRequestEntity fr WHERE "
          + "(fr.requester.id = :user1Id AND fr.requested.id = :user2Id) OR "
          + "(fr.requester.id = :user2Id AND fr.requested.id = :user1Id)")
  void deleteBetweenUsers(@Param("user1Id") UUID user1Id, @Param("user2Id") UUID user2Id);
}
