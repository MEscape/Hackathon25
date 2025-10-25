package com.hackathon25.safenet.infrastructure.adapter.rss.persistance;

import com.hackathon25.safenet.domain.model.helpcenters.HelpCenter;
import com.hackathon25.safenet.domain.model.helpcenters.HelpCenterTags;
import com.hackathon25.safenet.domain.port.inbound.HelpCentersPort;
import com.hackathon25.safenet.domain.port.outbound.HelpCentersFeedPort;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.configurationprocessor.json.JSONArray;
import org.springframework.boot.configurationprocessor.json.JSONException;
import org.springframework.boot.configurationprocessor.json.JSONObject;
import com.hackathon25.safenet.domain.model.helpcenters.HelpCenter;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriUtils;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.*;
import java.util.stream.Collectors;

/**
 * Adapter to fetch HelpCenters (like hospitals) from Overpass API
 */
@Slf4j
@Component
@RequiredArgsConstructor
public class HelpCenterAdapter implements HelpCentersFeedPort {

    private final RestTemplate restTemplate = new RestTemplate();

    @Override
    public List<HelpCenter> getHelpCenters(double lat, double lon, double radiusMeters, String type) {
        try {
            String overpassQuery = String.format(
                    Locale.US,
                    """
                    [out:json];
                    node["amenity"="%s"](around:%f,%f,%f);
                    out;
                    """,
                    type, radiusMeters, lat, lon
            );

            String url = "https://overpass-api.de/api/interpreter";

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.TEXT_PLAIN);

            HttpEntity<String> request = new HttpEntity<>(overpassQuery, headers);
            ResponseEntity<Map> response = restTemplate.postForEntity(url, request, Map.class);

            List<Map<String, Object>> elements = (List<Map<String, Object>>) response.getBody().get("elements");
            if (elements == null) return List.of();

            return elements.stream()
                    .map(this::mapOverpassNode)
                    .filter(Objects::nonNull)
                    .toList();

        } catch (Exception e) {
            throw new RuntimeException("Fehler beim Abrufen der HelpCenters", e);
        }
    }

    public HelpCenter mapOverpassNode(Map<String, Object> element) {
        try {
            HelpCenter hc = new HelpCenter();
            hc.setType((String) element.get("type"));
            hc.setId(((Number) element.get("id")).longValue());
            hc.setLat(((Number) element.get("lat")).doubleValue());
            hc.setLon(((Number) element.get("lon")).doubleValue());

            Map<String, String> tagsMap = (Map<String, String>) element.get("tags");
            if (tagsMap != null) {
                HelpCenterTags tags = new HelpCenterTags();
                tags.setName(tagsMap.get("name"));
                tags.setAmenity(tagsMap.get("amenity"));
                hc.setTags(tags);
            }

            return hc;
        } catch (Exception e) {
            return null;
        }
    }
}


