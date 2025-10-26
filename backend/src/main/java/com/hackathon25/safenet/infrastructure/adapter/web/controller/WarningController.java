package com.hackathon25.safenet.infrastructure.adapter.web.controller;

import com.hackathon25.safenet.domain.model.heatmapwarnings.Warning;
import com.hackathon25.safenet.domain.port.outbound.WarningFeedPort;
import java.util.List;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.http.ResponseEntity;
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
    @Operation(summary = "Get warnings nearby a location", description = "Retrieves emergency warnings from MOWAS that affect a specific location or area within a given radius")
    @ApiResponses(value = {@ApiResponse(responseCode = "200", description = "Successfully retrieved warnings", content = @Content(mediaType = "application/json", schema = @Schema(implementation = Warning.class))), @ApiResponse(responseCode = "400", description = "Invalid parameters provided"), @ApiResponse(responseCode = "500", description = "Internal server error or MOWAS API unavailable")})
    public ResponseEntity<List<Warning>> getWarningsNearby(
            @RequestParam double lat,
            @RequestParam double lon,
            @RequestParam(defaultValue = "10") double radiusKm
    ) {
        return ResponseEntity.ok(warningProviderPort.getWarningsNearby(lat, lon, radiusKm));
    }
}
