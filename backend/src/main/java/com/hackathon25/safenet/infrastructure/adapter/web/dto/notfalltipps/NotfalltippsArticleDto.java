package com.hackathon25.safenet.infrastructure.adapter.web.dto.notfalltipps;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.hackathon25.safenet.domain.model.notfalltipps.NotfalltippsArticle;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Data;

/**
 * Data Transfer Object for NotfalltippsArticle
 */
@Data
@Builder
@Schema(description = "Notfalltipps article information")
public class NotfalltippsArticleDto {

    @JsonProperty("title")
    @Schema(description = "Article title", example = "Allgemeine Hinweise")
    private String title;

    @JsonProperty("bodyText")
    @Schema(description = "Article body text content", example = "<p>In Notfällen und größeren Schadensereignissen...</p>")
    private String bodyText;

    @JsonProperty("image")
    @Schema(description = "Article image")
    private NotfalltippsImageDto image;

    @JsonProperty("lastModificationDate")
    @Schema(description = "Last modification date as timestamp", example = "1620819849000")
    private long lastModificationDate;

    /**
     * Maps a domain {@link NotfalltippsArticle} to a {@link NotfalltippsArticleDto}.
     *
     * @param article the domain article
     * @return the mapped NotfalltippsArticleDto
     */
    public static NotfalltippsArticleDto from(NotfalltippsArticle article) {
        if (article == null) {
            return null;
        }

        return NotfalltippsArticleDto.builder()
                .title(article.getTitle())
                .bodyText(article.getBodyText())
                .image(NotfalltippsImageDto.from(article.getImage()))
                .lastModificationDate(article.getLastModificationDate())
                .build();
    }
}