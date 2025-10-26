package com.hackathon25.safenet.infrastructure.adapter.rss.mapper;

import com.hackathon25.safenet.application.service.notfalltipps.NotfalltippsParser;
import com.hackathon25.safenet.domain.model.notfalltipps.NotfalltippsRoot;

/** Mapper for converting raw JSON feed data to Notfalltipps domain model. */
public class NotfalltippsMapper {
  public static NotfalltippsRoot toDomain(String jsonData) {
    return NotfalltippsParser.parseNotfalltipps(jsonData);
  }
}
