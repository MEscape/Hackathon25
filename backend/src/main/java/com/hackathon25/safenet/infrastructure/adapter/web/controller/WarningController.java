package com.hackathon25.safenet.infrastructure.adapter.web.controller;


import com.hackathon25.safenet.domain.model.heatmapwarnings.Warning;
import com.hackathon25.safenet.domain.port.outbound.WarningFeedPort;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/warnings")
public class WarningController {

    private final WarningFeedPort warningProviderPort;

    public WarningController(WarningFeedPort warningProviderPort) {
        this.warningProviderPort = warningProviderPort;
    }

    @GetMapping
    public List<Warning> getWarningsNearby(
            @RequestParam double lat,
            @RequestParam double lon,
            @RequestParam(defaultValue = "10") double radiusKm
    ) {
        return warningProviderPort.getWarningsNearby(lat, lon, radiusKm);
    }
}
