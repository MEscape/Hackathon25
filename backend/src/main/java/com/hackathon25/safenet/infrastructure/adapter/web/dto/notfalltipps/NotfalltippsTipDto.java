package com.hackathon.safenet.infrastructure.adapters.web.dto.notfalltipps;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.hackathon.safenet.domain.model.notfalltipps.NotfalltippsTip;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Data;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Data Transfer Object for NotfalltippsTip
 */
@Data
@Builder
@Schema(description = "Notfalltipps tip information")
public class NotfalltippsTipDto {

    @JsonProperty("title")
    @Schema(description = "Tip title", example = "Corona-Grundwissen")
    private String title;

    @JsonProperty("articles")
    @Schema(description = "List of articles in this tip")
    private List<NotfalltippsArticleDto> articles;

    /**
     * Maps a domain {@link NotfalltippsTip} to a {@link NotfalltippsTipDto}.
     *
     * @param tip the domain tip
     * @return the mapped NotfalltippsTipDto
     */
    public static NotfalltippsTipDto from(NotfalltippsTip tip) {
        if (tip == null) {
            return null;
        }

        return NotfalltippsTipDto.builder()
                .title(tip.getTitle())
                .articles(tip.getArticles() != null ? 
                    tip.getArticles().stream()
                        .map(NotfalltippsArticleDto::from)
                        .collect(Collectors.toList()) : null)
                .build();
    }
}