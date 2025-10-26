package com.hackathon25.safenet.domain.port.outbound;

import com.hackathon25.safenet.domain.model.helpcenters.HelpCenter;
import java.util.List;

public interface HelpCentersFeedPort {
  List<HelpCenter> getHelpCenters(double lat, double lon, double radiusMeters, String type);
}
