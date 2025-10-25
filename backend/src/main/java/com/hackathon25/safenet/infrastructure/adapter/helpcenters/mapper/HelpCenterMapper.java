package com.hackathon25.safenet.infrastructure.adapter.helpcenters.mapper;

import com.hackathon25.safenet.domain.model.helpcenters.HelpCenter;
import com.hackathon25.safenet.domain.model.helpcenters.HelpCenterTags;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.Map;

/**
 * Mapper for converting Overpass API responses to HelpCenter domain objects
 */
@Slf4j
@Component
public class HelpCenterMapper {

    /**
     * Maps an Overpass API node element to a HelpCenter domain object
     * 
     * @param element The Overpass API node element
     * @return HelpCenter domain object or null if mapping fails
     */
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
            log.warn("Failed to map Overpass node element: {}", e.getMessage());
            return null;
        }
    }
}