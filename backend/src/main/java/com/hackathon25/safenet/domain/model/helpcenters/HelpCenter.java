package com.hackathon25.safenet.domain.model.helpcenters;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class HelpCenter {
  private String type; // z.B. "node"
  private long id;
  private double lat;
  private double lon;
  private HelpCenterTags tags;
}
