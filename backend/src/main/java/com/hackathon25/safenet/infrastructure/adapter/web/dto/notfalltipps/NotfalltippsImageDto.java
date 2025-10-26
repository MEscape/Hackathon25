package com.hackathon25.safenet.infrastructure.adapter.web.dto.notfalltipps;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.hackathon25.safenet.domain.model.notfalltipps.NotfalltippsImage;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Data;

/** Data Transfer Object for NotfalltippsImage */
@Data
@Builder
@Schema(description = "Notfalltipps image information")
public class NotfalltippsImageDto {

  @JsonProperty("src")
  @Schema(
      description = "Image source URL",
      example = "https://warnung.bund.de/api31/appdata/gsb/notfalltipps/DE/images/0_1_0_src.jpg")
  private String src;

  @JsonProperty("title")
  @Schema(description = "Image title", example = "Richtig handeln im Notfall")
  private String title;

  @JsonProperty("alt")
  @Schema(description = "Image alt text", example = "Icon Richtig handeln im Notfall")
  private String alt;

  @JsonProperty("lastModificationDate")
  @Schema(description = "Last modification date as timestamp", example = "1620819849000")
  private long lastModificationDate;

  @JsonProperty("hash")
  @Schema(
      description = "Image hash",
      example = "2b83ba3d16288caf879640b67774560629b85af74804cec7eb5120faa7eb060a")
  private String hash;

  /**
   * Maps a domain {@link NotfalltippsImage} to a {@link NotfalltippsImageDto}.
   *
   * @param image the domain image
   * @return the mapped NotfalltippsImageDto
   */
  public static NotfalltippsImageDto from(NotfalltippsImage image) {
    if (image == null) {
      return null;
    }

    return NotfalltippsImageDto.builder()
        .src(image.getSrc())
        .title(image.getTitle())
        .alt(image.getAlt())
        .lastModificationDate(image.getLastModificationDate())
        .hash(image.getHash())
        .build();
  }
}
