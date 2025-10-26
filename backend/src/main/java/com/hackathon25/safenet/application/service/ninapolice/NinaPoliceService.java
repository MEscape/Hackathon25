package com.hackathon25.safenet.application.service.ninapolice;

import com.hackathon25.safenet.domain.model.ninapolice.NinaPoliceItem;
import com.hackathon25.safenet.domain.port.inbound.NinaPolicePort;
import com.hackathon25.safenet.domain.port.outbound.NinaPoliceFeedPort;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class NinaPoliceService implements NinaPolicePort {
  private final NinaPoliceFeedPort ninaPoliceFeedPort;

  @Override
  public List<NinaPoliceItem> getNinaPoliceData() {
    return ninaPoliceFeedPort.fetchFeedContent();
  }
}
