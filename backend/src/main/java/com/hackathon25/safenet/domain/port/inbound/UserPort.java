package com.hackathon25.safenet.domain.port.inbound;

import com.hackathon25.safenet.domain.model.user.DiscoverableUser;
import java.util.List;
import java.util.UUID;

/**
 * Inbound port for user management operations.
 *
 * <p>This port defines the operations available to the application layer for managing users and
 * user discovery functionality.
 *
 * @author SafeNet Development Team
 * @since 1.0.0
 */
public interface UserPort {

  /**
   * Get discoverable users for a given user. This includes all users except the current user, with
   * their friend request status and mutual friends count.
   *
   * @param currentUserId the ID of the current user
   * @return list of discoverable users with status information
   */
  List<DiscoverableUser> getDiscoverableUsers(UUID currentUserId);
}
