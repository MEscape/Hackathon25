package com.hackathon25.safenet.application.service.helpcenters;

import com.hackathon25.safenet.domain.model.helpcenters.HelpCenter;
import com.hackathon25.safenet.domain.port.inbound.HelpCentersPort;
import com.hackathon25.safenet.domain.port.outbound.HelpCentersFeedPort;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;


import java.util.List;

@Service
@RequiredArgsConstructor
public class HelpCentersService {

    private final HelpCentersFeedPort helpCenterOutboundPort;

    public List<HelpCenter> findHelpCenters(double lat, double lon, double radiusMeters, String type) {
        return helpCenterOutboundPort.getHelpCenters(lat, lon, radiusMeters, type);
    }
}
