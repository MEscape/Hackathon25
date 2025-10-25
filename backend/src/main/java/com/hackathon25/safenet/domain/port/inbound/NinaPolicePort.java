package com.hackathon.safenet.domain.ports.inbound;

import com.hackathon.safenet.domain.model.ninapolice.NinaPoliceItem;

import java.util.List;

public interface NinaPolicePort {
    List<NinaPoliceItem> getNinaPoliceData();
}