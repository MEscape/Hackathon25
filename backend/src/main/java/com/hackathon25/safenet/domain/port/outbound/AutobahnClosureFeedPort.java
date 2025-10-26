package com.hackathon25.safenet.domain.port.outbound;

import com.hackathon25.safenet.infrastructure.adapter.web.dto.autobahn.AutobahnClosureItemDto;
import java.util.List;

/** Outbound port for fetching Autobahn closure data. */
public interface AutobahnClosureFeedPort {
  /**
   * Fetches and parses closure data from Autobahn API.
   *
   * @param autobahnId Autobahn identifier (e.g., "A1", "A2")
   * @return List of AutobahnClosureItemDto containing closure data
   */
  List<AutobahnClosureItemDto> fetchClosureData(String autobahnId);
}
