package com.hackathon25.safenet.infrastructure.adapter.web.controller;

import com.hackathon25.safenet.application.service.helpcenters.HelpCentersService;
import com.hackathon25.safenet.infrastructure.adapter.web.dto.helpCenters.HelpCenterResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class HelpCenterController {

  private final HelpCentersService helpCenterService;

  @GetMapping("/api/v1/helpcenters")
  public HelpCenterResponseDto getHelpCenters(
      @RequestParam double lat,
      @RequestParam double lon,
      @RequestParam double radius,
      @RequestParam(defaultValue = "hospital") String type) {
    return HelpCenterResponseDto.from(helpCenterService.findHelpCenters(lat, lon, radius, type));
  }
}
