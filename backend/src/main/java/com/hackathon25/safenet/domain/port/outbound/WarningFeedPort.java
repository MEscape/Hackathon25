package com.hackathon25.safenet.domain.port.outbound;

import com.hackathon25.safenet.domain.model.heatmapwarnings.Warning;
import java.util.List;

public interface WarningFeedPort {
  List<Warning> getWarningsNearby(double lat, double lon, double radiusKm);
}
