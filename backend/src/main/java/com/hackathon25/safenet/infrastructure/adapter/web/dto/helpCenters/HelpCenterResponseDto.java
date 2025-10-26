package com.hackathon25.safenet.infrastructure.adapter.web.dto.helpCenters;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.hackathon25.safenet.domain.model.helpcenters.HelpCenter;
import io.swagger.v3.oas.annotations.media.Schema;
import java.util.List;
import java.util.stream.Collectors;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@Schema(description = "Help centers response")
public class HelpCenterResponseDto {

  @JsonProperty("items")
  @Schema(description = "List of help center items")
  private List<HelpCenterItemDto> items;

  public static HelpCenterResponseDto from(List<HelpCenter> items) {
    if (items == null) return null;
    return HelpCenterResponseDto.builder()
        .items(items.stream().map(HelpCenterItemDto::from).collect(Collectors.toList()))
        .build();
  }
}
