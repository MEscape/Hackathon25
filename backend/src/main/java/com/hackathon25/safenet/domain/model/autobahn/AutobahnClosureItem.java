package com.hackathon25.safenet.domain.model.autobahn;

import com.fasterxml.jackson.annotation.JsonFormat;
import java.time.LocalDateTime;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AutobahnClosureItem {
  private String identifier;
  private String title;
  private String subtitle;
  private String extent;
  private String point;
  private String icon;
  private String displayType;
  private Boolean isBlocked;
  private Boolean future;
  private List<String> description;
  private List<String> routeRecommendation;
  private List<String> footer;
  private List<String> lorryParkingFeatureIcons;
  private Coordinate coordinate;

  @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
  private LocalDateTime startTimestamp;

  @Data
  @Builder
  @NoArgsConstructor
  @AllArgsConstructor
  public static class Coordinate {
    private String lat;
    private String lng;
  }
}
