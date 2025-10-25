package com.hackathon25.safenet.application.service.autobahn;


import com.hackathon25.safenet.domain.model.autobahn.AutobahnClosureItem;
import com.hackathon25.safenet.domain.port.inbound.AutobahnClosurePort;
import com.hackathon25.safenet.domain.port.outbound.AutobahnClosureFeedPort;
import com.hackathon25.safenet.infrastructure.adapter.web.dto.autobahn.AutobahnClosureItemDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class AutobahnClosureService implements AutobahnClosurePort {
    
    private final AutobahnClosureFeedPort autobahnClosureFeedPort;
    
    @Override
    public List<AutobahnClosureItem> getAutobahnClosureData(String autobahnId) {
        try {
            log.info("Fetching closure data for Autobahn: {}", autobahnId);
            
            // Fetch parsed DTOs from adapter
            List<AutobahnClosureItemDto> closureDtos = autobahnClosureFeedPort.fetchClosureData(autobahnId);
            
            // Convert DTOs to domain objects
            List<AutobahnClosureItem> closures = closureDtos.stream()
                    .map(this::convertToItem)
                    .collect(Collectors.toList());
            
            log.info("Successfully processed {} closures for Autobahn {}", closures.size(), autobahnId);
            return closures;
            
        } catch (Exception e) {
            log.error("Error processing closure data for Autobahn {}: {}", autobahnId, e.getMessage());
            
            // Return empty list on error
            return List.of();
        }
    }
    
    private AutobahnClosureItem convertToItem(AutobahnClosureItemDto dto) {
        return AutobahnClosureItem.builder()
                .identifier(dto.getIdentifier())
                .title(dto.getTitle())
                .subtitle(dto.getSubtitle())
                .extent(dto.getExtent())
                .point(dto.getPoint())
                .icon(dto.getIcon())
                .displayType(dto.getDisplayType())
                .isBlocked(dto.getIsBlocked())
                .future(dto.getFuture())
                .description(dto.getDescription())
                .routeRecommendation(dto.getRouteRecommendation())
                .footer(dto.getFooter())
                .lorryParkingFeatureIcons(dto.getLorryParkingFeatureIcons())
                .coordinate(dto.getCoordinate() != null ? convertToCoordinate(dto.getCoordinate()) : null)
                .startTimestamp(dto.getStartTimestamp())
                .build();
    }
    
    private AutobahnClosureItem.Coordinate convertToCoordinate(AutobahnClosureItemDto.CoordinateDto dto) {
        return AutobahnClosureItem.Coordinate.builder()
                .lat(dto.getLat())
                .lng(dto.getLng())
                .build();
    }
}