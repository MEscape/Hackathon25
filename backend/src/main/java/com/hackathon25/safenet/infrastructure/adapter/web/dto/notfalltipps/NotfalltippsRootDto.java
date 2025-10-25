package com.hackathon.safenet.infrastructure.adapters.web.dto.notfalltipps;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.hackathon.safenet.domain.model.notfalltipps.NotfalltippsRoot;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Data;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Data Transfer Object for NotfalltippsRoot
 */
@Data
@Builder
@Schema(description = "Notfalltipps root information")
public class NotfalltippsRootDto {

    @JsonProperty("category")
    @Schema(description = "List of categories")
    private List<NotfalltippsCategoryDto> category;

    @JsonProperty("lastModificationDate")
    @Schema(description = "Last modification date as timestamp", example = "1620819849000")
    private long lastModificationDate;

    /**
     * Maps a domain {@link NotfalltippsRoot} to a {@link NotfalltippsRootDto}.
     *
     * @param root the domain root
     * @return the mapped NotfalltippsRootDto
     */
    public static NotfalltippsRootDto from(NotfalltippsRoot root) {
        if (root == null) {
            return null;
        }

        return NotfalltippsRootDto.builder()
                .category(root.getCategory() != null ? 
                    root.getCategory().stream()
                        .map(NotfalltippsCategoryDto::from)
                        .collect(Collectors.toList()) : null)
                .lastModificationDate(root.getLastModificationDate())
                .build();
    }
}