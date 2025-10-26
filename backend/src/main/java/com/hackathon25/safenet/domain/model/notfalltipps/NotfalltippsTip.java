package com.hackathon25.safenet.domain.model.notfalltipps;

import java.util.List;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class NotfalltippsTip {
  private String title;
  private List<NotfalltippsArticle> articles;
}
