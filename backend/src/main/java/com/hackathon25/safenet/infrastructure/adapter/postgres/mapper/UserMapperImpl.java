package com.hackathon25.safenet.infrastructure.adapter.postgres.mapper;

import com.hackathon25.safenet.domain.model.user.User;
import com.hackathon25.safenet.infrastructure.adapter.postgres.entity.UserEntity;
import java.time.Instant;
import org.springframework.stereotype.Component;

/** Mapper component for converting between User domain model and UserEntity */
@Component
public class UserMapperImpl implements EntityMapper<User, UserEntity> {

  @Override
  public User toDomain(UserEntity entity) {
    if (entity == null) {
      return null;
    }

    return new User(
        entity.getId(),
        entity.getUsername(),
        entity.getEmail(),
        entity.getFirstName(),
        entity.getLastName(),
        entity.getMeta(),
        entity.getCreatedAt(),
        entity.getUpdatedAt());
  }

  @Override
  public UserEntity toEntity(User domain) {
    if (domain == null) {
      return null;
    }

    return UserEntity.builder()
        .id(domain.id())
        .username(domain.username())
        .email(domain.email())
        .firstName(domain.firstName())
        .lastName(domain.lastName())
        .meta(domain.meta())
        .createdAt(domain.createdAt())
        .updatedAt(domain.updatedAt() != null ? domain.updatedAt() : Instant.now())
        .build();
  }
}
