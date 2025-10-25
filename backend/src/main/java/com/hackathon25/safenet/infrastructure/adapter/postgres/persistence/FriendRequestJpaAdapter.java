package com.hackathon25.safenet.infrastructure.adapter.postgres.persistence;

import com.hackathon25.safenet.domain.model.friend.FriendRequest;
import com.hackathon25.safenet.domain.port.outbound.FriendRequestRepositoryPort;
import com.hackathon25.safenet.infrastructure.adapter.postgres.entity.FriendRequestEntity;
import com.hackathon25.safenet.infrastructure.adapter.postgres.mapper.EntityMapper;
import com.hackathon25.safenet.infrastructure.adapter.postgres.repository.FriendRequestJpaRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.Optional;
import java.util.UUID;

@Slf4j
@Component
@RequiredArgsConstructor
public class FriendRequestJpaAdapter implements FriendRequestRepositoryPort {

    private final FriendRequestJpaRepository jpaRepository;
    private final EntityMapper<FriendRequest, FriendRequestEntity> friendRequestMapper;

    @Override
    public FriendRequest save(FriendRequest friendRequest) {
        log.debug("Saving friend request: requesterId={}, requestedId={}",
                friendRequest.requesterId(), friendRequest.requestedId());
        FriendRequestEntity entity = friendRequestMapper.toEntity(friendRequest);
        FriendRequestEntity saved = jpaRepository.save(entity);
        return friendRequestMapper.toDomain(saved);
    }

    @Override
    public Optional<FriendRequest> findById(UUID id) {
        log.debug("Finding friend request by id: {}", id);
        return jpaRepository.findById(id)
                .map(friendRequestMapper::toDomain);
    }

    @Override
    public boolean existsBetweenUsers(UUID user1Id, UUID user2Id) {
        log.debug("Checking if friend request exists between users: {} and {}", user1Id, user2Id);
        return jpaRepository.existsBetweenUsers(user1Id, user2Id);
    }

    @Override
    public Optional<FriendRequest> findBetweenUsers(UUID user1Id, UUID user2Id) {
        log.debug("Finding friend request between users: {} and {}", user1Id, user2Id);
        FriendRequestEntity entity = jpaRepository.findBetweenUsers(user1Id, user2Id);
        return entity != null ? Optional.of(friendRequestMapper.toDomain(entity)) : Optional.empty();
    }

    @Override
    public void deleteBetweenUsers(UUID user1Id, UUID user2Id) {
        log.debug("Deleting friend request between users: {} and {}", user1Id, user2Id);
        jpaRepository.deleteBetweenUsers(user1Id, user2Id);
    }
}