package com.hackathon25.safenet.domain.port.outbound;

import com.hackathon25.safenet.domain.model.user.User;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface UserMetaDataRepositoryPort {

    Optional<User> findById(UUID userId);

    User save(User user);
}
