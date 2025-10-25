package com.hackathon.safenet.application.service.notfalltipps;

import com.hackathon.safenet.application.service.i18n.TranslationService;
import com.hackathon.safenet.domain.enums.Language;
import com.hackathon.safenet.domain.model.notfalltipps.*;
import com.hackathon.safenet.domain.ports.inbound.NotfalltippsPort;
import com.hackathon.safenet.domain.ports.inbound.NotfalltippsLocalizationPort;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Application service for localizing Notfalltipps content.
 * 
 * <p>This service follows hexagonal architecture principles by:</p>
 * <ul>
 *   <li>Working exclusively with domain models (no DTOs)</li>
 *   <li>Implementing inbound port for use case definition</li>
 *   <li>Using outbound ports for dependencies</li>
 *   <li>Keeping presentation concerns (DTO mapping) in adapters</li>
 * </ul>
 * 
 * @author SafeNet Development Team
 * @since 1.0.0
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class NotfalltippsLocalizationService implements NotfalltippsLocalizationPort {

    private final TranslationService translationService;
    private final NotfalltippsPort notfalltippsPort;

    /**
     * Retrieves and localizes Notfalltipps content for the target language.
     * 
     * @param target the target language for localization
     * @return localized NotfalltippsRoot domain object
     */
    @Override
    public NotfalltippsRoot getLocalizedTips(Language target) {
        log.debug("Localizing Notfalltipps content to language: {}", target);
        
        NotfalltippsRoot root = notfalltippsPort.getNotfalltipps();
        return localizeContent(root, target);
    }

    /**
     * Localizes the content of a NotfalltippsRoot from German to target language.
     * 
     * @param root the source content in German
     * @param target the target language
     * @return localized NotfalltippsRoot
     */
    private NotfalltippsRoot localizeContent(NotfalltippsRoot root, Language target) {
        if (root == null) {
            return null;
        }
        
        Language source = Language.DE; // Source feed is always German
        
        // If target is German, return original content
        if (target == Language.DE) {
            return root;
        }

        List<NotfalltippsCategory> localizedCategories = root.getCategory() == null ? null :
                root.getCategory().stream()
                        .map(category -> localizeCategory(category, source, target))
                        .collect(Collectors.toList());

        return NotfalltippsRoot.builder()
                .category(localizedCategories)
                .lastModificationDate(root.getLastModificationDate())
                .build();
    }

    private NotfalltippsCategory localizeCategory(NotfalltippsCategory category, Language source, Language target) {
        List<NotfalltippsTip> localizedTips = category.getTips() == null ? null :
                category.getTips().stream()
                        .map(tip -> localizeTip(tip, source, target))
                        .collect(Collectors.toList());

        return NotfalltippsCategory.builder()
                .title(translationService.translateText(category.getTitle(), source, target))
                .tips(localizedTips)
                .eventCodes(category.getEventCodes()) // Event codes remain unchanged
                .lastModificationDate(category.getLastModificationDate())
                .build();
    }

    private NotfalltippsTip localizeTip(NotfalltippsTip tip, Language source, Language target) {
        List<NotfalltippsArticle> localizedArticles = tip.getArticles() == null ? null :
                tip.getArticles().stream()
                        .map(article -> localizeArticle(article, source, target))
                        .collect(Collectors.toList());

        return NotfalltippsTip.builder()
                .title(translationService.translateText(tip.getTitle(), source, target))
                .articles(localizedArticles)
                .build();
    }

    private NotfalltippsArticle localizeArticle(NotfalltippsArticle article, Language source, Language target) {
        NotfalltippsImage localizedImage = article.getImage() == null ? null :
                localizeImage(article.getImage(), source, target);

        return NotfalltippsArticle.builder()
                .title(translationService.translateText(article.getTitle(), source, target))
                .bodyText(translationService.translateHtml(article.getBodyText(), source, target))
                .image(localizedImage)
                .lastModificationDate(article.getLastModificationDate())
                .build();
    }

    private NotfalltippsImage localizeImage(NotfalltippsImage image, Language source, Language target) {
        return NotfalltippsImage.builder()
                .src(image.getSrc()) // URL remains unchanged
                .title(translationService.translateText(image.getTitle(), source, target))
                .alt(translationService.translateText(image.getAlt(), source, target))
                .lastModificationDate(image.getLastModificationDate())
                .hash(image.getHash()) // Hash remains unchanged
                .build();
    }
}