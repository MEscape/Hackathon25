package com.hackathon25.safenet.infrastructure.adapter.web.controller;

import com.hackathon25.safenet.domain.model.heatmapwarnings.Warning;
import com.hackathon25.safenet.domain.port.outbound.WarningFeedPort;
import com.hackathon25.safenet.infrastructure.adapter.web.dto.warnings.WarningDto;
import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/warnings")
public class WarningController {

  private final WarningFeedPort warningProviderPort;

  public WarningController(WarningFeedPort warningProviderPort) {
    this.warningProviderPort = warningProviderPort;
  }

  @GetMapping
  public List<WarningDto> getWarningsNearby(
      @RequestParam double lat,
      @RequestParam double lon,
      @RequestParam(defaultValue = "10") double radiusKm) {
    List<Warning> warnings = warningProviderPort.getWarningsNearby(lat, lon, radiusKm);
    return warnings.stream().map(WarningDto::from).toList();
  }
}
