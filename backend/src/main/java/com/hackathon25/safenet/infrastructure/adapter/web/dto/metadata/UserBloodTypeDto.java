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
@Schema(description = "User blood type data")
public class UserBloodTypeDto {

  @JsonProperty("userId")
  @NotNull
  private UUID userId;

  @JsonProperty("bloodType")
  @NotNull
  @Schema(description = "Blood type of the user", example = "A+")
  private String bloodType;

  public static UserBloodTypeDto from(UUID userId, String bloodType) {
    return UserBloodTypeDto.builder().userId(userId).bloodType(bloodType).build();
  }
}
