package com.hackathon25.safenet.infrastructure.adapter.rss.persistance;

import com.hackathon25.safenet.domain.model.ninapolice.NinaPoliceItem;
import com.hackathon25.safenet.domain.port.outbound.NinaPoliceFeedPort;

import java.util.List;
import com.hackathon25.safenet.infrastructure.adapter.rss.mapper.NinaPoliceApiMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

@Component
@RequiredArgsConstructor
public class NinaPoliceFeedAdapter implements NinaPoliceFeedPort {
    private static final String NINA_POLICE_URL = "https://nina.api.proxy.bund.dev/api31/police/mapData.json";
    private final RestTemplate restTemplate;
    private final NinaPoliceApiMapper mapper = new NinaPoliceApiMapper();

    @Override
    public List<NinaPoliceItem> fetchFeedContent() {
        String rawJson = restTemplate.getForObject(NINA_POLICE_URL, String.class);
        return mapper.toDomain(rawJson);
    }
}