package com.hackathon25.safenet.domain.port.inbound;

import com.hackathon25.safenet.domain.model.ninapolice.NinaPoliceItem;
import java.util.List;

public interface NinaPolicePort {
  List<NinaPoliceItem> getNinaPoliceData();
}
