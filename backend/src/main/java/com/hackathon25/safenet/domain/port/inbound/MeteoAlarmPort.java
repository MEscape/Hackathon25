package com.hackathon.safenet.domain.ports.inbound;

import com.hackathon.safenet.domain.model.meteoalarm.MeteoAlarmResponse;

public interface MeteoAlarmPort {
    /**
     * Fetch MeteoAlarm data for the specified language.
     *
     * @param language Language code (e.g., "en", "de-DE")
     * @return MeteoAlarmResponse containing alarm data
     */
    MeteoAlarmResponse getMeteoAlarmData(String language);
}