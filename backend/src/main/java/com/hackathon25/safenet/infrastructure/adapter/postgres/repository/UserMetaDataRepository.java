package com.hackathon25.safenet.infrastructure.adapter.postgres.repository;

import com.hackathon25.safenet.infrastructure.adapter.postgres.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface UserMetaDataRepository extends JpaRepository<UserEntity, UUID> {
}
