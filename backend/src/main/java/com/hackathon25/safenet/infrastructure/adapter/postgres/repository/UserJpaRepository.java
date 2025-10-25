package com.hackathon25.safenet.infrastructure.adapter.postgres.repository;

import com.hackathon25.safenet.infrastructure.adapter.postgres.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

/**
 * Repository interface for {@link UserEntity}.
 * <p>
 * This interface extends {@link JpaRepository} providing basic CRUD operations,
 * as well as custom query methods for finding, checking existence, and deleting users
 * by their authentication ID.
 * <p>
 * Spring Data JPA automatically generates the implementation at runtime.
 */
@Repository
public interface UserJpaRepository extends JpaRepository<UserEntity, UUID> {}