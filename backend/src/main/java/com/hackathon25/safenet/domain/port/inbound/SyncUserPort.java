package com.hackathon25.safenet.domain.port.inbound;

import com.hackathon25.safenet.domain.model.user.User;
import java.util.Map;
import java.util.UUID;

public interface SyncUserPort {

  /**
   * Sync user from Keycloak event Creates new user if not exists, updates if exists
   *
   * @param id Keycloak user ID
   * @param username Username
   * @param email Email address
   * @param firstName First name
   * @param lastName Last name
   * @param attributes Additional Keycloak attributes
   * @return Synced user
   */
  User syncUser(
      UUID id,
      String username,
      String email,
      String firstName,
      String lastName,
      Map<String, Object> attributes);
}
