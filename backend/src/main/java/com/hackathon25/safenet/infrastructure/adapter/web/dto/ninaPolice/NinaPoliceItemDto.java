package com.hackathon25.safenet.infrastructure.adapter.web.dto.ninaPolice;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.hackathon25.safenet.domain.model.ninapolice.NinaPoliceItem;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Data;

/** Data Transfer Object for NinaPoliceItem */
@Data
@Builder
@Schema(description = "NINA police alert item")
public class NinaPoliceItemDto {

  @JsonProperty("id")
  @Schema(
      description = "Unique identifier of the police alert",
      example = "mow.DE-BY-R-KE.2024.000123")
  private String id;

  @JsonProperty("version")
  @Schema(description = "Version number of the alert", example = "1")
  private int version;

  @JsonProperty("startDate")
  @Schema(description = "Start date of the alert", example = "2024-01-15T10:30:00")
  private String startDate;

  @JsonProperty("severity")
  @Schema(description = "Severity level of the alert", example = "Minor")
  private String severity;

  @JsonProperty("type")
  @Schema(description = "Type of the alert", example = "Update")
  private String type;

  @JsonProperty("i18nTitleDe")
  @Schema(description = "German title of the alert", example = "Polizeimeldung Bayern")
  private String i18nTitleDe;

  /**
   * Maps a domain {@link NinaPoliceItem} to a {@link NinaPoliceItemDto}.
   *
   * @param item the domain police item
   * @return the mapped NinaPoliceItemDto
   */
  public static NinaPoliceItemDto from(NinaPoliceItem item) {
    if (item == null) {
      return null;
    }

    return NinaPoliceItemDto.builder()
        .id(item.getId())
        .version(item.getVersion())
        .startDate(item.getStartDate())
        .severity(item.getSeverity())
        .type(item.getType())
        .i18nTitleDe(item.getI18nTitleDe())
        .build();
  }
}
