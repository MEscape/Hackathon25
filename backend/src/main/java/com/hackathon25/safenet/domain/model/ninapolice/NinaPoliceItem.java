package com.hackathon25.safenet.domain.model.ninapolice;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class NinaPoliceItem {
  private String id;
  private Integer version;
  private String startDate;
  private String severity;
  private String type;
  private String i18nTitleDe;
}
