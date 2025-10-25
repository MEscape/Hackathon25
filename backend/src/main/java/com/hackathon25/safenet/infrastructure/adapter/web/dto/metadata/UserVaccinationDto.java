package com.hackathon25.safenet.infrastructure.adapter.web.dto.metadata;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "User vaccination status data")
public class UserVaccinationDto {

    @JsonProperty("userId")
    @NotNull
    @Schema(description = "Unique identifier of the user", example = "123e4567-e89b-12d3-a456-426614174002")
    private UUID userId;

    @JsonProperty("vaccinationStatus")
    @NotNull
    @Schema(description = "Vaccination status of the user", example = "FULLY_VACCINATED")
    private String vaccinationStatus;

    /**
     * Convenience method to map from domain model to DTO
     */
    public static UserVaccinationDto from(UUID userId, String vaccinationStatus) {
        return UserVaccinationDto.builder()
                .userId(userId)
                .vaccinationStatus(vaccinationStatus)
                .build();
    }
}
