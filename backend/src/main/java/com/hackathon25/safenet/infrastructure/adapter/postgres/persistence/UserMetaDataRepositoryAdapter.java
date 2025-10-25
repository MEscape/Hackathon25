package com.hackathon25.safenet.infrastructure.adapter.postgres.persistence;

import com.hackathon25.safenet.domain.model.user.User;
import com.hackathon25.safenet.domain.port.outbound.UserMetaDataRepositoryPort;
import com.hackathon25.safenet.infrastructure.adapter.postgres.entity.UserEntity;
import com.hackathon25.safenet.infrastructure.adapter.postgres.mapper.EntityMapper;
import com.hackathon25.safenet.infrastructure.adapter.postgres.repository.UserMetaDataRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.Optional;
import java.util.UUID;

@Component
@RequiredArgsConstructor
public class UserMetaDataRepositoryAdapter implements UserMetaDataRepositoryPort {
    private final UserMetaDataRepository userRepository; // Spring Data JPA Repo
    private final EntityMapper<User, UserEntity> userMapper;

    @Override
    public Optional<User> findById(UUID userId) {
        return userRepository.findById(userId)
                .map(userMapper::toDomain);
    }

    @Override
    public User save(User user) {
        UserEntity entity = userMapper.toEntity(user);
        UserEntity saved = userRepository.save(entity);
        return userMapper.toDomain(saved);
    }
}
