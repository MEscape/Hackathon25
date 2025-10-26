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
@Schema(description = "User job information")
public class UserJobDto {

  @JsonProperty("userId")
  @NotNull
  private UUID userId;

  @JsonProperty("job")
  @NotNull
  @Schema(description = "Job title or occupation of the user", example = "Software Engineer")
  private String job;

  public static UserJobDto from(UUID userId, String job) {
    return UserJobDto.builder().userId(userId).job(job).build();
  }
}
