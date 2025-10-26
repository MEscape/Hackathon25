package com.hackathon25.safenet.domain.enums;

public enum Language {
  DE,
  EN;

  public static Language fromCodeOrDefault(String code, Language defaultLang) {
    if (code == null || code.isBlank()) return defaultLang;
    switch (code.toLowerCase()) {
      case "de":
        return DE;
      case "en":
        return EN;
      default:
        return defaultLang;
    }
  }
}
