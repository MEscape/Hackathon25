package com.hackathon.safenet.infrastructure.adapters.rss.persistance;

import com.hackathon.safenet.domain.ports.outbound.NotfalltippsFeedPort;
import com.hackathon.safenet.domain.model.notfalltipps.NotfalltippsRoot;
import com.hackathon.safenet.infrastructure.adapters.rss.mapper.NotfalltippsMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

@Slf4j
@RequiredArgsConstructor
@Component
public class NotfalltippsFeedAdapter implements NotfalltippsFeedPort {
    private static final String FEED_URL = "https://nina.api.proxy.bund.dev/api31/appdata/gsb/notfalltipps/DE/notfalltipps.json";
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