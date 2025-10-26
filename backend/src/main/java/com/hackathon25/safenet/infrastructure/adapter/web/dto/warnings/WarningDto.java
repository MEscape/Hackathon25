package com.hackathon25.safenet.infrastructure.adapter.web.dto.warnings;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.hackathon25.safenet.domain.model.heatmapwarnings.Warning;
import io.swagger.v3.oas.annotations.media.Schema;
import java.util.List;
import lombok.Builder;
import lombok.Data;

/** Data Transfer Object for Warning */
@Data
@Builder
@Schema(description = "Warning item")
public class WarningDto {

  @JsonProperty("id")
  @Schema(description = "Unique identifier of the warning", example = "warning-001")
  private String id;

  @JsonProperty("title")
  @Schema(description = "Title of the warning", example = "Severe Weather Alert")
  private String title;

  @JsonProperty("description")
  @Schema(
      description = "Description of the warning",
      example = "Heavy rainfall expected in the area")
  private String description;

  @JsonProperty("severity")
  @Schema(description = "Severity level of the warning", example = "High")
  private String severity;

  @JsonProperty("polygon")
  @Schema(description = "Polygon coordinates defining the warning area")
  private List<List<List<Double>>> polygon;

  /**
   * Maps a domain {@link Warning} to a {@link WarningDto}.
   *
   * @param warning the domain warning
   * @return the mapped WarningDto
   */
  public static WarningDto from(Warning warning) {
    if (warning == null) {
      return null;
    }

    return WarningDto.builder()
        .id(warning.getId())
        .title(warning.getTitle())
        .description(warning.getDescription())
        .severity(warning.getSeverity())
        .polygon(warning.getPolygon())
        .build();
  }
}
