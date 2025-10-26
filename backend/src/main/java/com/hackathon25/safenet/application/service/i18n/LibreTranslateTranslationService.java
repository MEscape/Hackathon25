package com.hackathon25.safenet.application.service.i18n;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.hackathon25.safenet.domain.enums.Language;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Slf4j
@Service
@ConditionalOnProperty(
    name = "translation.provider",
    havingValue = "libretranslate",
    matchIfMissing = true)
@RequiredArgsConstructor
public class LibreTranslateTranslationService implements TranslationService {

  private final RestTemplate restTemplate;
  private static final ObjectMapper OBJECT_MAPPER = new ObjectMapper();

  // Default to public LibreTranslate instance; can be overridden via config
  @Value("${translation.libretranslate.url:https://libretranslate.com}")
  private String baseUrl;

  @Value("${translation.libretranslate.apiKey:}")
  private String apiKey;

  // Simple in-memory cache; no persistence
  private final Map<String, String> cache = new ConcurrentHashMap<>();

  @Override
  public String translateText(String text, Language source, Language target) {
    return translate(text, source, target, false);
  }

  @Override
  public String translateHtml(String html, Language source, Language target) {
    return translate(html, source, target, true);
  }

  private String translate(String content, Language source, Language target, boolean isHtml) {
    try {
      if (content == null || content.isBlank()) return content;
      if (source == target) return content;

      String cacheKey =
          (isHtml ? "HTML" : "TEXT") + "|" + source + "->" + target + "|" + content.hashCode();
      String cached = cache.get(cacheKey);
      if (cached != null) return cached;

      String translated = callLibreTranslate(content, source, target, isHtml);
      if (translated == null || translated.isBlank()) {
        // Fallback to original in case of error
        return content;
      }
      cache.put(cacheKey, translated);
      return translated;
    } catch (Exception e) {
      log.warn("Translation failed; returning original content. Reason: {}", e.getMessage());
      return content;
    }
  }

  private String callLibreTranslate(
      String content, Language source, Language target, boolean isHtml) {
    String url = baseUrl.endsWith("/") ? baseUrl + "translate" : baseUrl + "/translate";
    try {
      HttpHeaders headers = new HttpHeaders();
      headers.setContentType(MediaType.APPLICATION_JSON);

      Map<String, Object> payload = new HashMap<>();
      payload.put("q", content);
      payload.put("source", toCode(source));
      payload.put("target", toCode(target));
      payload.put("format", isHtml ? "html" : "text");
      if (apiKey != null && !apiKey.isBlank()) {
        payload.put("api_key", apiKey);
      }

      HttpEntity<Map<String, Object>> entity = new HttpEntity<>(payload, headers);
      String response = restTemplate.postForObject(url, entity, String.class);
      if (response == null) return null;
      JsonNode json = OBJECT_MAPPER.readTree(response);
      JsonNode translatedNode = json.get("translatedText");
      return translatedNode != null ? translatedNode.asText() : null;
    } catch (Exception e) {
      log.error("LibreTranslate call failed: {}", e.getMessage());
      return null;
    }
  }

  private String toCode(Language lang) {
    return switch (lang) {
      case EN -> "en";
      default -> "de";
    };
  }
}
