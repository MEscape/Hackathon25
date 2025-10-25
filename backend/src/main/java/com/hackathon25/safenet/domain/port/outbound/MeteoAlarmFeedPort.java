package com.hackathon.safenet.domain.ports.outbound;

/**
 * Outbound port for fetching MeteoAlarm RSS feed content.
 */
public interface MeteoAlarmFeedPort {
    /**
     * Fetches the raw RSS feed content from MeteoAlarm.
     *
     * @return RSS feed content as String
     */
    String fetchFeedContent();
}