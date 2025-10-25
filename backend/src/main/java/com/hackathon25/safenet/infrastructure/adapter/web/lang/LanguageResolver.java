package com.hackathon25.safenet.infrastructure.adapter.web.lang;

import com.hackathon25.safenet.domain.enums.Language;
import org.springframework.stereotype.Component;

@Component
public class LanguageResolver {
    public Language resolve(String pathLang) {
        return Language.fromCodeOrDefault(pathLang, Language.DE);
    }

}