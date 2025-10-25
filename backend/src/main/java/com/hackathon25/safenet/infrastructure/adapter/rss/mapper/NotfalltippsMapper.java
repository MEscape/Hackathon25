package com.hackathon.safenet.infrastructure.adapters.rss.mapper;

import com.hackathon.safenet.domain.model.notfalltipps.NotfalltippsRoot;
import com.hackathon.safenet.application.service.notfalltipps.NotfalltippsParser;

/**
 * Mapper for converting raw JSON feed data to Notfalltipps domain model.
 */
public class NotfalltippsMapper {
    public static NotfalltippsRoot toDomain(String jsonData) {
        return NotfalltippsParser.parseNotfalltipps(jsonData);
    }
}