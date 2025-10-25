package com.hackathon25.safenet.domain.port.outbound;


import com.hackathon25.safenet.domain.model.ninapolice.NinaPoliceItem;

import java.util.List;

public interface NinaPoliceFeedPort {
    List<NinaPoliceItem> fetchFeedContent();
}