package com.hackathon25.safenet.application.service.notfalltipps;

import com.hackathon25.safenet.domain.model.notfalltipps.NotfalltippsRoot;
import com.hackathon25.safenet.domain.port.inbound.NotfalltippsPort;
import com.hackathon25.safenet.domain.port.outbound.NotfalltippsFeedPort;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class NotfalltippsService implements NotfalltippsPort {
    private final NotfalltippsFeedPort notfalltippsFeedPort;

    @Override
    public NotfalltippsRoot getNotfalltipps() {
        return notfalltippsFeedPort.fetchFeedContent();
    }
}