package com.hackathon25.safenet.infrastructure.adapter.postgres.repository;

import com.hackathon25.safenet.infrastructure.adapter.postgres.entity.UserEntity;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserMetaDataRepository extends JpaRepository<UserEntity, UUID> {}
