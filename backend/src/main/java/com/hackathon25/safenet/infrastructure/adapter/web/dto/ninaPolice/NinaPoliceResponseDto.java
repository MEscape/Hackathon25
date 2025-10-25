package com.hackathon.safenet.infrastructure.adapters.web.dto.nina;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.hackathon.safenet.domain.model.ninapolice.NinaPoliceItem;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Data;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Data Transfer Object for NinaPoliceResponse
 */
@Data
@Builder
@Schema(description = "NINA police alerts response")
public class NinaPoliceResponseDto {

    @JsonProperty("items")
    @Schema(description = "List of police alert items")
    private List<NinaPoliceItemDto> items;

    /**
     * Maps a list of {@link NinaPoliceItem} to a {@link NinaPoliceResponseDto}.
     *
     * @param items the list of police items
     * @return the mapped NinaPoliceResponseDto
     */
    public static NinaPoliceResponseDto from(List<NinaPoliceItem> items) {
        if (items == null) {
            return null;
        }

        return NinaPoliceResponseDto.builder()
                .items(items.stream()
                        .map(NinaPoliceItemDto::from)
                        .collect(Collectors.toList()))
                .build();
    }
}