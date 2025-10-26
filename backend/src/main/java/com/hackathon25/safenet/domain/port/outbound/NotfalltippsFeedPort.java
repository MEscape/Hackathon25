package com.hackathon25.safenet.domain.port.outbound;

import com.hackathon25.safenet.domain.model.notfalltipps.NotfalltippsRoot;

public interface NotfalltippsFeedPort {
  /**
   * Fetches the Notfalltipps feed and maps it to the domain model.
   *
   * @return NotfalltippsRoot domain model
   */
  NotfalltippsRoot fetchFeedContent();
}
