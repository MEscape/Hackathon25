package com.hackathon25.safenet.domain.port.inbound;

import com.hackathon25.safenet.domain.model.heatmapwarnings.Warning;
import java.util.List;

public interface WarningPort {
    List<Warning> getWarningsNearby(double lat, double lon, double radiusKm);
}