package com.hackathon25.safenet.application.service.i18n;

import com.hackathon25.safenet.domain.enums.Language;

public interface TranslationService {
    String translateText(String text, Language source, Language target);
    String translateHtml(String html, Language source, Language target);
}