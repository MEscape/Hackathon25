package com.hackathon25.safenet.infrastructure.adapter.web.controller;

import com.hackathon25.safenet.domain.model.autobahn.AutobahnClosureItem;
import com.hackathon25.safenet.domain.port.inbound.AutobahnClosurePort;
import com.hackathon25.safenet.infrastructure.adapter.web.dto.autobahn.AutobahnClosureItemDto;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/autobahn")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin(origins = "*")
public class AutobahnClosureController {

  private final AutobahnClosurePort autobahnClosurePort;

  @GetMapping("/{autobahnId}/closures")
  public ResponseEntity<List<AutobahnClosureItemDto>> getAutobahnClosures(
      @PathVariable String autobahnId) {

    log.info("Received request for Autobahn closure data: {}", autobahnId);

    try {
      List<AutobahnClosureItem> closures = autobahnClosurePort.getAutobahnClosureData(autobahnId);
      List<AutobahnClosureItemDto> response =
          closures.stream().map(AutobahnClosureItemDto::from).collect(Collectors.toList());

      log.info("Successfully returned {} closures for Autobahn {}", response.size(), autobahnId);
      return ResponseEntity.ok(response);

    } catch (Exception e) {
      log.error(
          "Unexpected error processing request for Autobahn {}: {}", autobahnId, e.getMessage());

      return ResponseEntity.internalServerError().body(List.of());
    }
  }
}
