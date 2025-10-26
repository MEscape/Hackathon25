package com.hackathon25.safenet.application.service.ninapolice;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.hackathon25.safenet.domain.model.ninapolice.NinaPoliceItem;
import java.util.ArrayList;
import java.util.List;
import lombok.extern.slf4j.Slf4j;

@Slf4j
public class NinaPoliceParser {
  private static final ObjectMapper objectMapper = new ObjectMapper();

  public static List<NinaPoliceItem> parsePoliceData(String jsonData) {
    List<NinaPoliceItem> items = new ArrayList<>();
    try {
      JsonNode rootNode = objectMapper.readTree(jsonData);
      if (rootNode.isArray()) {
        for (JsonNode node : rootNode) {
          NinaPoliceItem item =
              NinaPoliceItem.builder()
                  .id(node.path("id").asText())
                  .version(node.path("version").asInt())
                  .startDate(node.path("startDate").toString())
                  .severity(node.path("severity").asText())
                  .type(node.path("type").asText())
                  .i18nTitleDe(node.path("i18nTitle").path("de").asText())
                  .build();
          items.add(item);
        }
      }
    } catch (Exception e) {
      log.error("Error parsing NINA police data", e);
    }
    return items;
  }
}
