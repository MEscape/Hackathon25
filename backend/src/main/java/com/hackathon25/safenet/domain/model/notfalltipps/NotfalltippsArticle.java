package com.hackathon.safenet.domain.model.notfalltipps;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class NotfalltippsArticle {
    private String title;
    private String bodyText;
    private NotfalltippsImage image;
    private long lastModificationDate;
}