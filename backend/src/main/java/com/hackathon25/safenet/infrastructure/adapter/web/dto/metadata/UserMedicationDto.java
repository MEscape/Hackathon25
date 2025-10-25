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
@Schema(description = "User medication information")
public class UserMedicationDto {

    @JsonProperty("userId")
    @NotNull
    private UUID userId;

    @JsonProperty("medication")
    @NotNull
    @Schema(description = "Current medications of the user", example = "Metformin, Lisinopril")
    private String medication;

    public static UserMedicationDto from(UUID userId, String medication) {
        return UserMedicationDto.builder()
                .userId(userId)
                .medication(medication)
                .build();
    }
}
