package com.hackathon25.safenet.infrastructure.adapter.web.controller;

import com.hackathon25.safenet.domain.model.heatmapwarnings.Warning;
import com.hackathon25.safenet.domain.port.inbound.WarningPort;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/v1/warnings")
@RequiredArgsConstructor
@Tag(name = "Warning", description = "Emergency warnings and alerts from MOWAS (Modular Warning System)")
public class WarningController {

    private final WarningPort warningPort;

    @GetMapping
    @Operation(summary = "Get warnings nearby a location", description = "Retrieves emergency warnings from MOWAS that affect a specific location or area within a given radius")
    @ApiResponses(value = {@ApiResponse(responseCode = "200", description = "Successfully retrieved warnings", content = @Content(mediaType = "application/json", schema = @Schema(implementation = Warning.class))), @ApiResponse(responseCode = "400", description = "Invalid parameters provided"), @ApiResponse(responseCode = "500", description = "Internal server error or MOWAS API unavailable")})
    public ResponseEntity<List<Warning>> getWarningsNearby(@Parameter(description = "Latitude coordinate", required = true, example = "51.1657") @RequestParam double lat, @Parameter(description = "Longitude coordinate", required = true, example = "10.4515") @RequestParam double lon, @Parameter(description = "Search radius in kilometers", example = "10") @RequestParam(defaultValue = "10") double radiusKm) {
        log.info("GET /api/warnings - lat={}, lon={}, radiusKm={}", lat, lon, radiusKm);
        try {
            List<Warning> warnings = warningPort.getWarningsNearby(lat, lon, radiusKm);
            return ResponseEntity.ok(warnings);
        } catch (Exception e) {
            log.error("Error fetching warnings", e);
            return ResponseEntity.internalServerError().build();
        }
    }
}