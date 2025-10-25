package com.hackathon.safenet.domain.ports.outbound;

import com.hackathon.safenet.domain.model.ninapolice.NinaPoliceItem;

import java.util.List;

public interface NinaPoliceFeedPort {
    List<NinaPoliceItem> fetchFeedContent();
}