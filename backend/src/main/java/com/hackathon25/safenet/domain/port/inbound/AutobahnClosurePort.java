package com.hackathon.safenet.domain.ports.inbound;

import com.hackathon.safenet.domain.model.autobahn.AutobahnClosureItem;

import java.util.List;

public interface AutobahnClosurePort {
    /**
     * Fetch Autobahn closure data for the specified autobahn.
     *
     * @param autobahnId Autobahn identifier (e.g., "A1", "A2")
     * @return List of AutobahnClosureItem containing closure data
     */
    List<AutobahnClosureItem> getAutobahnClosureData(String autobahnId);
}