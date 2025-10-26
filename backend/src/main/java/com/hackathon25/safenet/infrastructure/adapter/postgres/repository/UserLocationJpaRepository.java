package com.hackathon25.safenet.infrastructure.adapter.postgres.repository;

import com.hackathon25.safenet.infrastructure.adapter.postgres.entity.UserLocationEntity;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Repository interface for {@link UserLocationEntity}.
 *
 * <p>This interface extends {@link JpaRepository} providing basic CRUD operations, as well as
 * custom query methods for finding user locations with various criteria.
 *
 * <p>Spring Data JPA automatically generates the implementation at runtime.
 */
@Repository
public interface UserLocationJpaRepository extends JpaRepository<UserLocationEntity, UUID> {

  /**
   * Find latest location by user ID
   *
   * @param userId the user ID
   * @return optional user location
   */
  @Query(
      "SELECT ul FROM UserLocationEntity ul WHERE ul.user.id = :userId ORDER BY ul.updatedAt DESC LIMIT 1")
  Optional<UserLocationEntity> findByUserId(@Param("userId") UUID userId);

  /**
   * Find latest visible locations of specific users
   *
   * @param userIds list of user IDs
   * @return list of visible user locations for the specified users
   */
  @Query(
      "SELECT ul FROM UserLocationEntity ul WHERE ul.user.id IN :userIds AND ul.visibleToFriends = true")
  List<UserLocationEntity> findVisibleLocationsByUserIds(@Param("userIds") List<UUID> userIds);
}
