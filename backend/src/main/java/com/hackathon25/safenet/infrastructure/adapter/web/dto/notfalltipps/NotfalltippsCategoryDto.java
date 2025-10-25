package com.hackathon.safenet.infrastructure.adapters.web.dto.notfalltipps;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.hackathon.safenet.domain.model.notfalltipps.NotfalltippsCategory;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Data;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Data Transfer Object for NotfalltippsCategory
 */
@Data
@Builder
@Schema(description = "Notfalltipps category information")
public class NotfalltippsCategoryDto {

    @JsonProperty("title")
    @Schema(description = "Category title", example = "Corona-Grundwissen")
    private String title;

    @JsonProperty("tips")
    @Schema(description = "List of tips in this category")
    private List<NotfalltippsTipDto> tips;

    @JsonProperty("eventCodes")
    @Schema(description = "List of event codes", example = "[\"BBK-EVC-021\"]")
    private List<String> eventCodes;

    @JsonProperty("lastModificationDate")
    @Schema(description = "Last modification date as timestamp", example = "1620819849000")
    private long lastModificationDate;

    /**
     * Maps a domain {@link NotfalltippsCategory} to a {@link NotfalltippsCategoryDto}.
     *
     * @param category the domain category
     * @return the mapped NotfalltippsCategoryDto
     */
    public static NotfalltippsCategoryDto from(NotfalltippsCategory category) {
        if (category == null) {
            return null;
        }

        return NotfalltippsCategoryDto.builder()
                .title(category.getTitle())
                .tips(category.getTips() != null ? 
                    category.getTips().stream()
                        .map(NotfalltippsTipDto::from)
                        .collect(Collectors.toList()) : null)
                .eventCodes(category.getEventCodes())
                .lastModificationDate(category.getLastModificationDate())
                .build();
    }
}