package com.hackathon25.safenet.infrastructure.adapter.helpcenters.persistence;

import com.hackathon25.safenet.domain.model.helpcenters.HelpCenter;
import com.hackathon25.safenet.domain.port.outbound.HelpCentersFeedPort;
import com.hackathon25.safenet.infrastructure.adapter.helpcenters.mapper.HelpCenterMapper;
import java.util.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

/** Adapter to fetch HelpCenters (like hospitals) from Overpass API */
@Slf4j
@Component
@RequiredArgsConstructor
public class HelpCenterAdapter implements HelpCentersFeedPort {

  private final RestTemplate restTemplate = new RestTemplate();
  private final HelpCenterMapper helpCenterMapper;

  @Override
  public List<HelpCenter> getHelpCenters(double lat, double lon, double radiusMeters, String type) {
    try {
      String overpassQuery =
          String.format(
              Locale.US,
              """
                    [out:json];
                    node["amenity"="%s"](around:%f,%f,%f);
                    out;
                    """,
              type,
              radiusMeters,
              lat,
              lon);

      String url = "https://overpass-api.de/api/interpreter";

      HttpHeaders headers = new HttpHeaders();
      headers.setContentType(MediaType.TEXT_PLAIN);

      HttpEntity<String> request = new HttpEntity<>(overpassQuery, headers);
      ResponseEntity<Map> response = restTemplate.postForEntity(url, request, Map.class);

      List<Map<String, Object>> elements =
          (List<Map<String, Object>>) response.getBody().get("elements");
      if (elements == null) return List.of();

      return elements.stream()
          .map(helpCenterMapper::mapOverpassNode)
          .filter(Objects::nonNull)
          .toList();

    } catch (Exception e) {
      log.error("Error fetching HelpCenters from Overpass API: {}", e.getMessage());
      throw new RuntimeException("An error occurred whgile trying to access HelpCenters", e);
    }
  }
}
