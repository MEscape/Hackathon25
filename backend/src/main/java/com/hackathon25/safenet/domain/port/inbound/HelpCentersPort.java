package com.hackathon25.safenet.domain.port.inbound;


public interface HelpCentersPort {
    String getHospitals(double lat, double lon, int radiusMeters);
}
