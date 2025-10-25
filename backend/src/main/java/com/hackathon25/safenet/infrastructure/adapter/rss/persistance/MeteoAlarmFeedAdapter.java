package com.hackathon.safenet.infrastructure.adapters.rss.persistance;

import com.hackathon.safenet.domain.ports.outbound.MeteoAlarmFeedPort;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

@Component
@RequiredArgsConstructor
public class MeteoAlarmFeedAdapter implements MeteoAlarmFeedPort {
    private static final String METEO_ALARM_URL = "https://feeds.meteoalarm.org/feeds/meteoalarm-legacy-rss-germany";
    private final RestTemplate restTemplate;

    @Override
    public String fetchFeedContent() {
        return restTemplate.getForObject(METEO_ALARM_URL, String.class);
    }
}