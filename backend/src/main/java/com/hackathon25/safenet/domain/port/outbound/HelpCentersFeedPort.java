package com.hackathon25.safenet.domain.port.outbound;

import com.hackathon25.safenet.domain.model.helpcenters.HelpCenter;
import org.springframework.boot.configurationprocessor.json.JSONException;
import org.springframework.boot.configurationprocessor.json.JSONObject;

import java.util.List;
import java.util.Map;

public interface HelpCentersFeedPort {
    List<HelpCenter> getHelpCenters(double lat, double lon, double radiusMeters, String type);
    HelpCenter mapOverpassNode(Map<String, Object> element);
}
