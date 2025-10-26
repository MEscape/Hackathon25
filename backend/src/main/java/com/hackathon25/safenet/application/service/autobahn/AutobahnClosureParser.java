package com.hackathon25.safenet.application.service.autobahn;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.hackathon25.safenet.infrastructure.adapter.web.dto.autobahn.AutobahnClosureItemDto;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import lombok.extern.slf4j.Slf4j;

@Slf4j
public class AutobahnClosureParser {
  private static final ObjectMapper objectMapper = new ObjectMapper();

  public static List<AutobahnClosureItemDto> parseClosureData(String jsonData) {
    try {
      if (jsonData == null || jsonData.trim().isEmpty()) {
        return new ArrayList<>();
      }

      JsonNode rootNode = objectMapper.readTree(jsonData);
      JsonNode closuresNode = rootNode.get("closure");

      if (closuresNode == null || !closuresNode.isArray()) {
        return new ArrayList<>();
      }

      List<AutobahnClosureItemDto> closures = new ArrayList<>();

      for (JsonNode closureNode : closuresNode) {
        AutobahnClosureItemDto closure = parseClosureItem(closureNode);
        if (closure != null) {
          closures.add(closure);
        }
      }

      return closures;
    } catch (Exception e) {
      log.error("Error parsing closure data: {}", e.getMessage());
      return new ArrayList<>();
    }
  }

  private static AutobahnClosureItemDto parseClosureItem(JsonNode node) {
    try {
      AutobahnClosureItemDto.AutobahnClosureItemDtoBuilder builder =
          AutobahnClosureItemDto.builder();

      if (node.has("identifier")) {
        builder.identifier(node.get("identifier").asText());
      }
      if (node.has("title")) {
        builder.title(node.get("title").asText());
      }
      if (node.has("subtitle")) {
        builder.subtitle(node.get("subtitle").asText());
      }
      if (node.has("extent")) {
        builder.extent(node.get("extent").asText());
      }
      if (node.has("point")) {
        builder.point(node.get("point").asText());
      }
      if (node.has("icon")) {
        builder.icon(node.get("icon").asText());
      }
      if (node.has("displayType")) {
        builder.displayType(node.get("displayType").asText());
      }
      if (node.has("isBlocked")) {
        builder.isBlocked(node.get("isBlocked").asBoolean());
      }
      if (node.has("future")) {
        builder.future(node.get("future").asBoolean());
      }

      // Parse arrays
      if (node.has("description") && node.get("description").isArray()) {
        List<String> descriptions =
            objectMapper.convertValue(node.get("description"), new TypeReference<>() {});
        builder.description(descriptions);
      }
      if (node.has("routeRecommendation") && node.get("routeRecommendation").isArray()) {
        List<String> recommendations =
            objectMapper.convertValue(node.get("routeRecommendation"), new TypeReference<>() {});
        builder.routeRecommendation(recommendations);
      }
      if (node.has("footer") && node.get("footer").isArray()) {
        List<String> footers =
            objectMapper.convertValue(node.get("footer"), new TypeReference<>() {});
        builder.footer(footers);
      }
      if (node.has("lorryParkingFeatureIcons") && node.get("lorryParkingFeatureIcons").isArray()) {
        List<String> icons =
            objectMapper.convertValue(
                node.get("lorryParkingFeatureIcons"), new TypeReference<>() {});
        builder.lorryParkingFeatureIcons(icons);
      }

      // Parse coordinate
      if (node.has("coordinate")) {
        JsonNode coordNode = node.get("coordinate");
        AutobahnClosureItemDto.CoordinateDto coordinate =
            AutobahnClosureItemDto.CoordinateDto.builder()
                .lat(coordNode.has("lat") ? coordNode.get("lat").asText() : null)
                .lng(coordNode.has("lng") ? coordNode.get("lng").asText() : null)
                .build();
        builder.coordinate(coordinate);
      }

      // Parse timestamp
      if (node.has("startTimestamp")) {
        String timestampStr = node.get("startTimestamp").asText();
        try {
          LocalDateTime timestamp =
              LocalDateTime.parse(timestampStr, DateTimeFormatter.ISO_LOCAL_DATE_TIME);
          builder.startTimestamp(timestamp);
        } catch (Exception e) {
          log.warn("Failed to parse timestamp: {}", timestampStr);
        }
      }

      return builder.build();
    } catch (Exception e) {
      log.error("Error parsing closure item: {}", e.getMessage());
      return null;
    }
  }
}
