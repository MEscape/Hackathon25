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
@Schema(description = "User allergies information")
public class UserAllergiesDto {

  @JsonProperty("userId")
  @NotNull
  private UUID userId;

  @JsonProperty("allergies")
  @NotNull
  @Schema(description = "Allergies of the user", example = "Peanuts, Pollen")
  private String allergies;

  public static UserAllergiesDto from(UUID userId, String allergies) {
    return UserAllergiesDto.builder().userId(userId).allergies(allergies).build();
  }
}
