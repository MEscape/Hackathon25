package com.hackathon.safenet.application.service.notfalltipps;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.hackathon.safenet.domain.model.notfalltipps.*;
import lombok.extern.slf4j.Slf4j;

import java.util.ArrayList;
import java.util.List;

@Slf4j
public class NotfalltippsParser {
    private static final ObjectMapper objectMapper = new ObjectMapper();

    public static NotfalltippsRoot parseNotfalltipps(String jsonData) {
        try {
            JsonNode rootNode = objectMapper.readTree(jsonData);
            JsonNode notfalltippsNode = rootNode.path("notfalltipps");
            return NotfalltippsRoot.builder()
                    .category(parseCategories(notfalltippsNode.path("category")))
                    .lastModificationDate(notfalltippsNode.path("lastModificationDate").asLong())
                    .build();
        } catch (Exception e) {
            log.error("Error parsing Notfalltipps data", e);
            return null;
        }
    }

    private static List<NotfalltippsCategory> parseCategories(JsonNode categoriesNode) {
        List<NotfalltippsCategory> categories = new ArrayList<>();
        if (categoriesNode.isArray()) {
            for (JsonNode categoryNode : categoriesNode) {
                NotfalltippsCategory category = NotfalltippsCategory.builder()
                        .title(categoryNode.path("title").asText())
                        .tips(parseTips(categoryNode.path("tips")))
                        .eventCodes(parseEventCodes(categoryNode.path("eventCodes")))
                        .lastModificationDate(categoryNode.path("lastModificationDate").asLong())
                        .build();
                categories.add(category);
            }
        }
        return categories;
    }

    private static List<NotfalltippsTip> parseTips(JsonNode tipsNode) {
        List<NotfalltippsTip> tips = new ArrayList<>();
        if (tipsNode.isArray()) {
            for (JsonNode tipNode : tipsNode) {
                NotfalltippsTip tip = NotfalltippsTip.builder()
                        .title(tipNode.path("title").asText())
                        .articles(parseArticles(tipNode.path("articles")))
                        .build();
                tips.add(tip);
            }
        }
        return tips;
    }

    private static List<NotfalltippsArticle> parseArticles(JsonNode articlesNode) {
        List<NotfalltippsArticle> articles = new ArrayList<>();
        if (articlesNode.isArray()) {
            for (JsonNode articleNode : articlesNode) {
                // Check for both "bodytext" and "bodyText"
                String bodyText = "";
                if (articleNode.has("bodytext")) {
                    bodyText = articleNode.path("bodytext").asText();
                } else if (articleNode.has("bodyText")) {
                    bodyText = articleNode.path("bodyText").asText();
                }
                NotfalltippsArticle article = NotfalltippsArticle.builder()
                        .title(articleNode.path("title").asText())
                        .bodyText(bodyText)
                        .image(parseImage(articleNode.path("image")))
                        .lastModificationDate(articleNode.path("lastModificationDate").asLong())
                        .build();
                articles.add(article);
            }
        }
        return articles;
    }

    private static NotfalltippsImage parseImage(JsonNode imageNode) {
        if (imageNode.isMissingNode() || imageNode.isNull()) {
            return null;
        }
        return NotfalltippsImage.builder()
                .src(imageNode.path("src").asText())
                .title(imageNode.path("title").asText())
                .alt(imageNode.path("alt").asText())
                .lastModificationDate(imageNode.path("lastModificationDate").asLong())
                .hash(imageNode.path("hash").asText())
                .build();
    }

    private static List<String> parseEventCodes(JsonNode eventCodesNode) {
        List<String> eventCodes = new ArrayList<>();
        if (eventCodesNode.isArray()) {
            for (JsonNode codeNode : eventCodesNode) {
                eventCodes.add(codeNode.asText());
            }
        }
        return eventCodes;
    }
}