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
@Schema(description = "Request to update user allergies")
public class AllergiesRequestDto {

    @JsonProperty("allergies")
    @NotNull
    @Schema(description = "Allergies of the user", example = "Peanuts, Shellfish")
    private String allergies;
}