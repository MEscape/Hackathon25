package com.hackathon25.safenet.domain.port.outbound;

import com.hackathon25.safenet.domain.model.user.User;
import java.util.Optional;
import java.util.UUID;

public interface UserMetaDataRepositoryPort {

  Optional<User> findById(UUID userId);

  User save(User user);
}
