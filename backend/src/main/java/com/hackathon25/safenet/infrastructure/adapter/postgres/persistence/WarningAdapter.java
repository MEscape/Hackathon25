package com.hackathon25.safenet.infrastructure.adapter.postgres.persistence;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.hackathon25.safenet.domain.model.heatmapwarnings.Warning;
import com.hackathon25.safenet.domain.port.outbound.WarningFeedPort;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Component
@RequiredArgsConstructor
public class WarningAdapter implements WarningFeedPort {

    private static final String MOWAS_URL = "https://warnung.bund.de/bbk.mowas/gefahrendurchsagen.json";
    private final RestTemplate restTemplate;
    private final ObjectMapper objectMapper;

    @Override
    public List<Warning> getWarningsNearby(double lat, double lon, double radiusKm) {
        List<Warning> result = new ArrayList<>();
        try {
            String json = restTemplate.getForObject(MOWAS_URL, String.class);
            JsonNode root = objectMapper.readTree(json);

            for (JsonNode feature : root) {
                Warning warning = new Warning();
                warning.setId(feature.get("identifier").asText());
                JsonNode info = feature.get("info").get(0);
                warning.setTitle(info.get("headline").asText());
                warning.setDescription(info.get("description").asText());
                warning.setSeverity(info.get("severity").asText());

                List<List<List<Double>>> polygons = new ArrayList<>();
                JsonNode areas = info.get("area");
                if (areas != null && areas.isArray()) {
                    for (JsonNode area : areas) {
                        JsonNode polyStrings = area.get("polygon");
                        if (polyStrings != null && polyStrings.isArray()) {
                            for (JsonNode polyStringNode : polyStrings) {
                                String polyString = polyStringNode.asText();
                                List<List<Double>> polygon = new ArrayList<>();
                                String[] points = polyString.split(" ");
                                for (String pointStr : points) {
                                    String[] coords = pointStr.split(",");
                                    double lonP = Double.parseDouble(coords[0]);
                                    double latP = Double.parseDouble(coords[1]);
                                    List<Double> point = List.of(lonP, latP);
                                    polygon.add(point);
                                }
                                polygons.add(polygon);
                            }
                        }
                    }
                }
                warning.setPolygon(polygons);

                // Radius-Filter: Prüfen, ob der Standort innerhalb eines Polygons liegt
                if (isWithinRadius(lat, lon, polygons, radiusKm)) {
                    result.add(warning);
                }
            }

        } catch (Exception e) {
            e.printStackTrace();
        }

        return result;
    }

    private boolean isWithinRadius(double lat, double lon, List<List<List<Double>>> polygons, double radiusKm) {
        for (List<List<Double>> polygon : polygons) {
            for (List<Double> point : polygon) {
                double polyLat = point.get(1);
                double polyLon = point.get(0);
                if (haversine(lat, lon, polyLat, polyLon) <= radiusKm) {
                    return true;
                }
            }
        }
        return false;
    }

    private double haversine(double lat1, double lon1, double lat2, double lon2) {
        int R = 6371; // km
        double dLat = Math.toRadians(lat2 - lat1);
        double dLon = Math.toRadians(lon2 - lon1);
        double a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                Math.cos(Math.toRadians(lat1)) * Math.cos(Math.toRadians(lat2)) *
                        Math.sin(dLon/2) * Math.sin(dLon/2);
        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        return R * c;
    }
}
