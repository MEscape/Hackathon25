package com.hackathon25.safenet.domain.model.heatmapwarnings;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Warning {
  private String id;
  private String title;
  private String description;
  private String severity;
  private List<List<List<Double>>> polygon;
}
