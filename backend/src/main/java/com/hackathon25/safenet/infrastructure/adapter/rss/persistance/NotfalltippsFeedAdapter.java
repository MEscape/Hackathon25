package com.hackathon25.safenet.infrastructure.adapter.rss.persistance;

import com.hackathon25.safenet.domain.model.notfalltipps.NotfalltippsRoot;
import com.hackathon25.safenet.domain.port.outbound.NotfalltippsFeedPort;
import com.hackathon25.safenet.infrastructure.adapter.rss.mapper.NotfalltippsMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

@Slf4j
@RequiredArgsConstructor
@Component
public class NotfalltippsFeedAdapter implements NotfalltippsFeedPort {
  private static final String FEED_URL =
      "https://nina.api.proxy.bund.dev/api31/appdata/gsb/notfalltipps/DE/notfalltipps.json";
  private final RestTemplate restTemplate;

  @Override
  public NotfalltippsRoot fetchFeedContent() {
    try {
      String json = restTemplate.getForObject(FEED_URL, String.class);
      return NotfalltippsMapper.toDomain(json);
    } catch (Exception e) {
      log.error("Error fetching Notfalltipps feed", e);
      return null;
    }
  }
}
