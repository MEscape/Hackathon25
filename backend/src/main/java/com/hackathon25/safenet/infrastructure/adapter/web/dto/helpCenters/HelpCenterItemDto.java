package com.hackathon25.safenet.infrastructure.adapter.web.dto.helpCenters;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.hackathon25.safenet.domain.model.helpcenters.HelpCenter;
import io.swagger.v3.oas.annotations.media.Schema;
import java.util.ArrayList;
import java.util.List;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@Schema(description = "Help center item")
class HelpCenterItemDto {

  @JsonProperty("name")
  private String name;

  @JsonProperty("type")
  private String type;

  @JsonProperty("lat")
  private double lat;

  @JsonProperty("lon")
  private double lon;

  @JsonProperty("tags")
  private List<String> tags;

  public static HelpCenterItemDto from(HelpCenter helpCenter) {
    if (helpCenter == null) return null;

    List<String> tagsList = new ArrayList<>();
    if (helpCenter.getTags() != null) {
      tagsList.add("amenity=" + helpCenter.getTags().getAmenity());
    }
    return HelpCenterItemDto.builder()
        .name(helpCenter.getTags() != null ? helpCenter.getTags().getName() : null)
        .type(helpCenter.getTags() != null ? helpCenter.getTags().getAmenity() : null)
        .lat(helpCenter.getLat())
        .lon(helpCenter.getLon())
        .tags(tagsList)
        .build();
  }
}
