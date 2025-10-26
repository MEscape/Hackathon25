package com.hackathon25.safenet.domain.port.inbound;

import com.hackathon25.safenet.domain.enums.Language;
import com.hackathon25.safenet.domain.model.notfalltipps.NotfalltippsRoot;

/**
 * Inbound port for localized Notfalltipps access.
 *
 * <p>This port follows hexagonal architecture principles by working exclusively with domain models.
 * It provides localized content for emergency tips in the target language while maintaining the
 * same structure as the original content.
 *
 * <p>Mirrors the style of NotfalltippsPort but returns localized domain objects instead of raw
 * data. The localization includes text translation while preserving structural elements like event
 * codes, timestamps, and URLs.
 *
 * @author SafeNet Development Team
 * @since 1.0.0
 */
public interface NotfalltippsLocalizationPort {

  /**
   * Retrieves and localizes Notfalltipps content for the specified target language.
   *
   * <p>The source content is always in German (DE) and gets translated to the target language. If
   * the target language is German, the original content is returned without translation to optimize
   * performance.
   *
   * @param target the target language for localization
   * @return localized NotfalltippsRoot domain object with translated content
   */
  NotfalltippsRoot getLocalizedTips(Language target);
}
