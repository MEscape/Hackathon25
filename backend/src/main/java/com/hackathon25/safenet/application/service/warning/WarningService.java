package com.hackathon25.safenet.application.service.warning;

import com.hackathon25.safenet.domain.model.heatmapwarnings.Warning;
import com.hackathon25.safenet.domain.port.inbound.WarningPort;
import com.hackathon25.safenet.domain.port.outbound.WarningFeedPort;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class WarningService implements WarningPort {

    private final WarningFeedPort warningFeedPort;

    @Override
    public List<Warning> getWarningsNearby(double lat, double lon, double radiusKm) {
        log.info("Fetching warnings for location: lat={}, lon={}, radius={}km", lat, lon, radiusKm);

        try {
            List<Warning> warnings = warningFeedPort.getWarningsNearby(lat, lon, radiusKm);
            log.info("Found {} warnings", warnings.size());
            return warnings;
        } catch (Exception e) {
            log.error("Error fetching warnings", e);
            throw new RuntimeException("Failed to fetch warnings", e);
        }
    }
}