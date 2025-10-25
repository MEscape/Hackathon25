package com.hackathon25.safenet.domain.port.outbound;

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