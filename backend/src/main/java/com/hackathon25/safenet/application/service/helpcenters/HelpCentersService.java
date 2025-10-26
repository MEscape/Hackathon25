package com.hackathon25.safenet.application.service.helpcenters;

import com.hackathon25.safenet.domain.model.helpcenters.HelpCenter;
import com.hackathon25.safenet.domain.port.outbound.HelpCentersFeedPort;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class HelpCentersService {

  private final HelpCentersFeedPort helpCenterOutboundPort;

  public List<HelpCenter> findHelpCenters(
      double lat, double lon, double radiusMeters, String type) {
    return helpCenterOutboundPort.getHelpCenters(lat, lon, radiusMeters, type);
  }
}
