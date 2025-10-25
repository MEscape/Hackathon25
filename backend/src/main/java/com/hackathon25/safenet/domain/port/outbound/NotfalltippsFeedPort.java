package com.hackathon.safenet.domain.ports.outbound;

import com.hackathon.safenet.domain.model.notfalltipps.NotfalltippsRoot;

public interface NotfalltippsFeedPort {
    /**
     * Fetches the Notfalltipps feed and maps it to the domain model.
     *
     * @return NotfalltippsRoot domain model
     */
    NotfalltippsRoot fetchFeedContent();
}