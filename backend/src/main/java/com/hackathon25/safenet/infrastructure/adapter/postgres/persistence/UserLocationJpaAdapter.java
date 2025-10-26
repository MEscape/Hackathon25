package com.hackathon25.safenet.infrastructure.adapter.postgres.persistence;

import com.hackathon25.safenet.domain.model.user.UserLocation;
import com.hackathon25.safenet.domain.port.outbound.UserLocationRepositoryPort;
import com.hackathon25.safenet.infrastructure.adapter.postgres.entity.UserLocationEntity;
import com.hackathon25.safenet.infrastructure.adapter.postgres.mapper.EntityMapper;
import com.hackathon25.safenet.infrastructure.adapter.postgres.repository.UserLocationJpaRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Slf4j
@Component
@RequiredArgsConstructor
public class UserLocationJpaAdapter implements UserLocationRepositoryPort {

    private final UserLocationJpaRepository jpaRepository;
    private final EntityMapper<UserLocation, UserLocationEntity> userLocationMapper;

    @Override
    public UserLocation save(UserLocation userLocation) {
        log.debug("Saving user location: userId={}", userLocation.userId());
        UserLocationEntity entity = userLocationMapper.toEntity(userLocation);
        UserLocationEntity saved = jpaRepository.save(entity);
        return userLocationMapper.toDomain(saved);
    }

    @Override
    public Optional<UserLocation> findById(UUID id) {
        log.debug("Finding user location by id: {}", id);
        return jpaRepository.findById(id)
                .map(userLocationMapper::toDomain);
    }

    @Override
    public Optional<UserLocation> findLatestByUserId(UUID userId) {
        log.debug("Finding latest location for user: {}", userId);
        return jpaRepository.findByUserId(userId)
                .map(userLocationMapper::toDomain);
    }

    @Override
    public List<UserLocation> findLatestVisibleLocationsByUserIds(List<UUID> userIds) {
        log.debug("Finding latest visible locations for {} users", userIds.size());
        return jpaRepository.findVisibleLocationsByUserIds(userIds).stream()
                .map(userLocationMapper::toDomain)
                .toList();
    }
}