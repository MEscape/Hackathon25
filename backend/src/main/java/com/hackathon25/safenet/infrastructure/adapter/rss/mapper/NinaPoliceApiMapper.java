package com.hackathon.safenet.infrastructure.adapters.rss.mapper;


import com.hackathon.safenet.domain.model.ninapolice.NinaPoliceItem;
import com.hackathon.safenet.application.service.ninapolice.NinaPoliceParser;

import java.util.List;

/**
 * Mapper for converting raw police feed JSON to List<NinaPoliceItem> domain model
 */
public class NinaPoliceApiMapper implements ApiMapper<List<NinaPoliceItem>, String> {
    @Override
    public List<NinaPoliceItem> toDomain(String raw) {
        return NinaPoliceParser.parsePoliceData(raw);
    }
}