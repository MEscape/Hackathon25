package com.hackathon25.safenet.infrastructure.adapter.postgres.mapper;

import com.hackathon25.safenet.domain.model.friend.FriendRequest;
import com.hackathon25.safenet.infrastructure.adapter.postgres.entity.FriendRequestEntity;
import com.hackathon25.safenet.infrastructure.adapter.postgres.entity.UserEntity;
import com.hackathon25.safenet.infrastructure.adapter.postgres.repository.UserJpaRepository;
import java.time.Instant;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

/** Mapper component for converting between FriendRequest domain model and FriendRequestEntity */
@Component
@RequiredArgsConstructor
public class FriendRequestMapperImpl implements EntityMapper<FriendRequest, FriendRequestEntity> {

  private final UserJpaRepository userJpaRepository;

  @Override
  public FriendRequest toDomain(FriendRequestEntity entity) {
    if (entity == null) {
      return null;
    }

    return new FriendRequest(
        entity.getId(),
        entity.getRequester().getId(),
        entity.getRequested().getId(),
        mapStatusToDomain(entity.getStatus()),
        entity.getCreatedAt(),
        entity.getUpdatedAt());
  }

  @Override
  public FriendRequestEntity toEntity(FriendRequest domain) {
    if (domain == null) {
      return null;
    }

    // Fetch user entities
    UserEntity requester =
        userJpaRepository
            .findById(domain.requesterId())
            .orElseThrow(
                () ->
                    new IllegalArgumentException(
                        "Requester user not found: " + domain.requesterId()));
    UserEntity requested =
        userJpaRepository
            .findById(domain.requestedId())
            .orElseThrow(
                () ->
                    new IllegalArgumentException(
                        "Requested user not found: " + domain.requestedId()));

    return FriendRequestEntity.builder()
        .id(domain.id())
        .requester(requester)
        .requested(requested)
        .status(mapStatusToEntity(domain.status()))
        .createdAt(domain.createdAt())
        .updatedAt(domain.updatedAt() != null ? domain.updatedAt() : Instant.now())
        .build();
  }

  /** Map entity status to domain status */
  private FriendRequest.FriendRequestStatus mapStatusToDomain(
      FriendRequestEntity.FriendRequestStatus entityStatus) {
    if (entityStatus == null) {
      return null;
    }

    return switch (entityStatus) {
      case PENDING -> FriendRequest.FriendRequestStatus.PENDING;
      case ACCEPTED -> FriendRequest.FriendRequestStatus.ACCEPTED;
      case REJECTED -> FriendRequest.FriendRequestStatus.REJECTED;
    };
  }

  /** Map domain status to entity status */
  private FriendRequestEntity.FriendRequestStatus mapStatusToEntity(
      FriendRequest.FriendRequestStatus domainStatus) {
    if (domainStatus == null) {
      return null;
    }

    return switch (domainStatus) {
      case PENDING -> FriendRequestEntity.FriendRequestStatus.PENDING;
      case ACCEPTED -> FriendRequestEntity.FriendRequestStatus.ACCEPTED;
      case REJECTED -> FriendRequestEntity.FriendRequestStatus.REJECTED;
    };
  }
}
