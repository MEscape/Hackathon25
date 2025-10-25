package com.hackathon25.safenet.infrastructure.adapter.web.controller;

import com.hackathon25.safenet.application.service.notfalltipps.NotfalltippsLocalizationService;
import com.hackathon25.safenet.domain.enums.Language;
import com.hackathon25.safenet.domain.model.notfalltipps.NotfalltippsRoot;
import com.hackathon25.safenet.infrastructure.adapter.web.dto.notfalltipps.NotfalltippsRootDto;
import com.hackathon25.safenet.infrastructure.adapter.web.lang.LanguageResolver;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/api/nina/notfalltipps")
@RequiredArgsConstructor
@Tag(name = "Nina Notfalltipps", description = "Emergency tips and preparedness information from the German Federal Office of Civil Protection and Disaster Assistance (BBK) through the NINA API")
public class NotfalltippsController {
    private final NotfalltippsLocalizationService notfalltippsLocalizationService;
    private final LanguageResolver languageResolver;

    @GetMapping("/tips")
    public ResponseEntity<NotfalltippsRootDto> getNotfalltippsDefault() {
        log.info("Fetching NINA Notfalltipps (default language: de)");
        try {
            NotfalltippsRoot localizedRoot = notfalltippsLocalizationService.getLocalizedTips(Language.DE);
            NotfalltippsRootDto dto = NotfalltippsRootDto.from(localizedRoot);
            return ResponseEntity.ok(dto);
        } catch (Exception e) {
            log.error("Error fetching NINA Notfalltipps", e);
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/tips/{lang}")
    public ResponseEntity<NotfalltippsRootDto> getNotfalltippsByLang(@PathVariable("lang") String lang) {
        log.info("Fetching NINA Notfalltipps with lang={}", lang);
        try {
            Language target = languageResolver.resolve(lang);
            NotfalltippsRoot localizedRoot = notfalltippsLocalizationService.getLocalizedTips(target);
            NotfalltippsRootDto dto = NotfalltippsRootDto.from(localizedRoot);
            return ResponseEntity.ok(dto);
        } catch (Exception e) {
            log.error("Error fetching NINA Notfalltipps for lang={}", lang, e);
            return ResponseEntity.internalServerError().build();
        }
    }
}