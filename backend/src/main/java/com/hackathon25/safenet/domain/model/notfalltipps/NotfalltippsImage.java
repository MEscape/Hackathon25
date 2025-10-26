package com.hackathon25.safenet.domain.model.notfalltipps;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class NotfalltippsImage {
  private String src;
  private String title;
  private String alt;
  private long lastModificationDate;
  private String hash;
}
