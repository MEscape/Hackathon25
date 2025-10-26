package com.hackathon25.safenet.infrastructure.adapter.web.controller;

import com.hackathon25.safenet.application.service.meteo.MeteoAlarmService;
import com.hackathon25.safenet.domain.model.meteoalarm.MeteoAlarmResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/api/v1/weather")
@RequiredArgsConstructor
@Tag(name = "MeteoAlarm", description = "Weather alerts from MeteoAlarm Germany")
public class MeteoAlarmController {

  private final MeteoAlarmService meteoAlarmService;

  @Operation(
      summary = "Get weather alerts in English",
      description =
          "Fetches current weather alerts from MeteoAlarm Germany RSS feed and returns them in JSON format with English descriptions")
  @ApiResponses(
      value = {
        @ApiResponse(responseCode = "200", description = "Successfully retrieved weather alerts"),
        @ApiResponse(
            responseCode = "500",
            description = "Internal server error while fetching weather data")
      })
  @GetMapping("/alerts/english")
  public ResponseEntity<MeteoAlarmResponse> getWeatherAlertsEnglish() {
    log.info("Fetching weather alerts in English");
    try {
      MeteoAlarmResponse response = meteoAlarmService.getMeteoAlarmData("english");
      return ResponseEntity.ok(response);
    } catch (Exception e) {
      log.error("Error fetching English weather alerts", e);
      return ResponseEntity.internalServerError().build();
    }
  }

  @Operation(
      summary = "Get weather alerts in German",
      description =
          "Fetches current weather alerts from MeteoAlarm Germany RSS feed and returns them in JSON format with German descriptions")
  @ApiResponses(
      value = {
        @ApiResponse(responseCode = "200", description = "Successfully retrieved weather alerts"),
        @ApiResponse(
            responseCode = "500",
            description = "Internal server error while fetching weather data")
      })
  @GetMapping("/alerts/german")
  public ResponseEntity<MeteoAlarmResponse> getWeatherAlertsGerman() {
    log.info("Fetching weather alerts in German");
    try {
      MeteoAlarmResponse response = meteoAlarmService.getMeteoAlarmData("german");
      return ResponseEntity.ok(response);
    } catch (Exception e) {
      log.error("Error fetching German weather alerts", e);
      return ResponseEntity.internalServerError().build();
    }
  }
}
