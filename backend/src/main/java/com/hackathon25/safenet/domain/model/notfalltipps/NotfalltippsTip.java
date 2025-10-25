package com.hackathon25.safenet.domain.model.notfalltipps;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class NotfalltippsTip {
    private String title;
    private List<NotfalltippsArticle> articles;
}