package com.hackathon.safenet.infrastructure.adapters.web.dto.autobahn;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.hackathon.safenet.domain.model.autobahn.AutobahnClosureItem;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

/**
 * Data Transfer Object for AutobahnClosureItem
 */
@Data
@Builder
@Schema(description = "Autobahn closure item")
public class AutobahnClosureItemDto {

    @JsonProperty("identifier")
    @Schema(description = "Unique identifier")
    private String identifier;

    @JsonProperty("title")
    @Schema(description = "Closure title")
    private String title;

    @JsonProperty("subtitle")
    @Schema(description = "Closure subtitle")
    private String subtitle;

    @JsonProperty("extent")
    @Schema(description = "Closure extent")
    private String extent;

    @JsonProperty("point")
    @Schema(description = "Closure point")
    private String point;

    @JsonProperty("icon")
    @Schema(description = "Icon identifier")
    private String icon;

    @JsonProperty("displayType")
    @Schema(description = "Display type")
    private String displayType;

    @JsonProperty("isBlocked")
    @Schema(description = "Whether the route is blocked")
    private Boolean isBlocked;

    @JsonProperty("future")
    @Schema(description = "Whether this is a future closure")
    private Boolean future;

    @JsonProperty("description")
    @Schema(description = "Closure description")
    private List<String> description;

    @JsonProperty("routeRecommendation")
    @Schema(description = "Route recommendations")
    private List<String> routeRecommendation;

    @JsonProperty("footer")
    @Schema(description = "Footer information")
    private List<String> footer;

    @JsonProperty("lorryParkingFeatureIcons")
    @Schema(description = "Lorry parking feature icons")
    private List<String> lorryParkingFeatureIcons;

    @JsonProperty("coordinate")
    @Schema(description = "Coordinate information")
    private CoordinateDto coordinate;

    @JsonProperty("startTimestamp")
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    @Schema(description = "Start timestamp")
    private LocalDateTime startTimestamp;

    /**
     * Maps a domain {@link AutobahnClosureItem} to a {@link AutobahnClosureItemDto}.
     *
     * @param item the domain closure item
     * @return the mapped AutobahnClosureItemDto
     */
    public static AutobahnClosureItemDto from(AutobahnClosureItem item) {
        if (item == null) {
            return null;
        }

        return AutobahnClosureItemDto.builder()
                .identifier(item.getIdentifier())
                .title(item.getTitle())
                .subtitle(item.getSubtitle())
                .extent(item.getExtent())
                .point(item.getPoint())
                .icon(item.getIcon())
                .displayType(item.getDisplayType())
                .isBlocked(item.getIsBlocked())
                .future(item.getFuture())
                .description(item.getDescription())
                .routeRecommendation(item.getRouteRecommendation())
                .footer(item.getFooter())
                .lorryParkingFeatureIcons(item.getLorryParkingFeatureIcons())
                .coordinate(item.getCoordinate() != null ? CoordinateDto.from(item.getCoordinate()) : null)
                .startTimestamp(item.getStartTimestamp())
                .build();
    }

    @Data
    @Builder
    @Schema(description = "Coordinate information")
    public static class CoordinateDto {
        @JsonProperty("lat")
        @Schema(description = "Latitude")
        private String lat;

        @JsonProperty("lng")
        @Schema(description = "Longitude")
        private String lng;

        public static CoordinateDto from(AutobahnClosureItem.Coordinate coordinate) {
            if (coordinate == null) {
                return null;
            }
            return CoordinateDto.builder()
                    .lat(coordinate.getLat())
                    .lng(coordinate.getLng())
                    .build();
        }
    }
}