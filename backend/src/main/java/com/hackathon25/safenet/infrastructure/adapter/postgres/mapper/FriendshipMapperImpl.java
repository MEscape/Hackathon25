package com.hackathon25.safenet.infrastructure.adapter.postgres.mapper;

import com.hackathon25.safenet.domain.model.friend.Friendship;
import com.hackathon25.safenet.infrastructure.adapter.postgres.entity.FriendshipEntity;
import com.hackathon25.safenet.infrastructure.adapter.postgres.entity.UserEntity;
import com.hackathon25.safenet.infrastructure.adapter.postgres.repository.UserJpaRepository;
import java.time.Instant;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

/** Mapper component for converting between Friendship domain model and FriendshipEntity */
@Component
@RequiredArgsConstructor
public class FriendshipMapperImpl implements EntityMapper<Friendship, FriendshipEntity> {

  private final UserJpaRepository userJpaRepository;

  @Override
  public Friendship toDomain(FriendshipEntity entity) {
    if (entity == null) {
      return null;
    }

    return new Friendship(
        entity.getId(),
        entity.getUser1().getId(),
        entity.getUser2().getId(),
        entity.getCreatedAt());
  }

  @Override
  public FriendshipEntity toEntity(Friendship domain) {
    if (domain == null) {
      return null;
    }

    // Fetch user entities
    UserEntity user1 =
        userJpaRepository
            .findById(domain.user1Id())
            .orElseThrow(
                () -> new IllegalArgumentException("User1 not found: " + domain.user1Id()));
    UserEntity user2 =
        userJpaRepository
            .findById(domain.user2Id())
            .orElseThrow(
                () -> new IllegalArgumentException("User2 not found: " + domain.user2Id()));

    // Ensure user1 has the smaller UUID for consistency (this will also be handled in the entity's
    // @PrePersist)
    if (user1.getId().compareTo(user2.getId()) > 0) {
      UserEntity temp = user1;
      user1 = user2;
      user2 = temp;
    }

    return FriendshipEntity.builder()
        .id(domain.id())
        .user1(user1)
        .user2(user2)
        .createdAt(domain.createdAt() != null ? domain.createdAt() : Instant.now())
        .build();
  }
}
