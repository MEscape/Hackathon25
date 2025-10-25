package com.hackathon.safenet.application.service.ninapolice;

import com.hackathon.safenet.domain.model.ninapolice.NinaPoliceItem;
import com.hackathon.safenet.domain.ports.inbound.NinaPolicePort;
import com.hackathon.safenet.domain.ports.outbound.NinaPoliceFeedPort;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class NinaPoliceService implements NinaPolicePort {
    private final NinaPoliceFeedPort ninaPoliceFeedPort;

    @Override
    public List<NinaPoliceItem> getNinaPoliceData() {
        return ninaPoliceFeedPort.fetchFeedContent();
    }
}