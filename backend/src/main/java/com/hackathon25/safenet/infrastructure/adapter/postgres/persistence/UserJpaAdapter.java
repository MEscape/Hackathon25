package com.hackathon25.safenet.infrastructure.adapter.postgres.persistence;

import com.hackathon25.safenet.domain.model.user.User;
import com.hackathon25.safenet.domain.port.outbound.UserRepositoryPort;
import com.hackathon25.safenet.infrastructure.adapter.postgres.entity.UserEntity;
import com.hackathon25.safenet.infrastructure.adapter.postgres.mapper.EntityMapper;
import com.hackathon25.safenet.infrastructure.adapter.postgres.repository.UserJpaRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

/**
 * JPA adapter for user repository operations.
 * Implements the UserRepositoryPort using Spring Data JPA.
 */
@Slf4j
@Component
@RequiredArgsConstructor
public class UserJpaAdapter implements UserRepositoryPort {

    private final UserJpaRepository jpaRepository;
    private final EntityMapper<User, UserEntity> userMapper;

    @Override
    public User save(User user) {
        log.debug("Saving user: {}", user.id());
        UserEntity entity = userMapper.toEntity(user);
        UserEntity saved = jpaRepository.save(entity);
        return userMapper.toDomain(saved);
    }

    @Override
    public Optional<User> findById(UUID id) {
        log.debug("Finding user by id: {}", id);
        return jpaRepository.findById(id)
                .map(userMapper::toDomain);
    }

    @Override
    public List<User> findAll() {
        log.debug("Finding all users");
        return jpaRepository.findAll().stream()
                .map(userMapper::toDomain)
                .toList();
    }

    @Override
    public boolean existsById(UUID id) {
        log.debug("Checking if user exists: {}", id);
        return jpaRepository.existsById(id);
    }

    @Override
    public void deleteById(UUID id) {
        log.debug("Deleting user: {}", id);
        jpaRepository.deleteById(id);
    }

    @Override
    public String getExpoPushToken(UUID userId) {
        return "";
    }
}