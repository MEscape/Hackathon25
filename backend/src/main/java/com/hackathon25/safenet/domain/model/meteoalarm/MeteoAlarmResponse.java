package com.hackathon25.safenet.domain.model.meteoalarm;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MeteoAlarmResponse {
  private String title;
  private String description;
  private String link;
  private String language;
  private Integer ttl;
  private List<MeteoAlarmItem> items;
}
