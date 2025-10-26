package com.hackathon25.safenet.domain.model.notfalltipps;

import java.util.List;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class NotfalltippsCategory {
  private String title;
  private List<NotfalltippsTip> tips;
  private List<String> eventCodes;
  private long lastModificationDate;
}
