package com.hackathon25.safenet.infrastructure.adapter.web.dto.metadata;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import java.util.UUID;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "User pre-existing conditions")
public class UserPreExistingConditionsDto {

  @JsonProperty("userId")
  @NotNull
  private UUID userId;

  @JsonProperty("preExistingConditions")
  @NotNull
  @Schema(description = "Pre-existing medical conditions", example = "Diabetes, Hypertension")
  private String preExistingConditions;

  public static UserPreExistingConditionsDto from(UUID userId, String preExistingConditions) {
    return UserPreExistingConditionsDto.builder()
        .userId(userId)
        .preExistingConditions(preExistingConditions)
        .build();
  }
}
