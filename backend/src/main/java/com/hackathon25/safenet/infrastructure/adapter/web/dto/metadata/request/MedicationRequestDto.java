package com.hackathon25.safenet.infrastructure.adapter.web.dto.metadata.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "Request to update user medication")
public class MedicationRequestDto {

    @JsonProperty("medication")
    @NotNull
    @Schema(description = "Current medication of the user", example = "Aspirin, Metformin")
    private String medication;
}