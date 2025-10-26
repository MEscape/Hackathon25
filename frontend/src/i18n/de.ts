import type { Translations } from './en';

const de: Translations = {
  common: {
    ok: 'OK',
    cancel: 'Abbrechen',
    noData: 'Keine Daten verfügbar',
    loading: 'Wird geladen...',
    lastSeen: 'Zuletzt gesehen',
    save: 'Speichern',
    error: 'Fehler'
  },

  home: {
    title: 'Startseite',
    greeting: {
      morning: 'Guten Morgen',
      afternoon: 'Guten Nachmittag',
      evening: 'Guten Abend',
    },
    status: {
      allNormal: 'Alle Systeme normal',
      lastUpdated: 'Gerade aktualisiert',
    },
    quickActions: {
      title: 'Schnellaktionen',
      emergency: {
        title: 'Notfallkontakte',
        subtitle: 'Erreiche deine vertrauenswürdigen Kontakte schnell.',
      },
      shareLocation: {
        title: 'Standort teilen',
        subtitle: 'Teile deinen aktuellen Standort sofort.',
      },
      emergencyTips: {
        title: 'Notfalltipps',
        subtitle: 'Sicherheitshinweise'
      }
    },
    features: {
      title: 'Funktionen',
      emergencyMap: {
        title: 'Notfallkarte',
        subtitle: 'Sieh dir Vorfälle und sichere Zonen in deiner Nähe an.',
      },
      emergencyContacts: {
        title: 'Notfallkontakte',
        subtitle: 'Erreiche deine vertrauenswürdigen Kontakte schnell.',
      },
      safetyAlerts: {
        title: 'Sicherheitswarnungen',
        subtitle: 'Erhalte wichtige Sicherheitsbenachrichtigungen.',
      },
      profile: {
        title: 'Profil',
        subtitle: 'Persönliche Daten ansehen und bearbeiten.',
      },
    },
    info: {
      title: 'Wusstest du schon?',
      tip: 'Du kannst Funktionen schnell über die Startseite erreichen.',
    },
  },

  map: {
    title: 'Karte',
  },

  actions: {
    safetyAlerts: {
      title: 'Sicherheitswarnungen',
      subtitle: 'Empfange und verwalte Warnungen in deiner Umgebung.',
      sections: {
        police: 'Polizeiwarnungen',
        weather: 'Wetterwarnungen',
      },
      search: {
        titleLabel: 'Nach Titel suchen',
        titlePlaceholder: 'Titel eingeben…',
        locationLabel: 'Nach Ort filtern',
        locationPlaceholder: 'Region oder Ort eingeben…',
      },
    },
    profile: {
      title: 'Profil',
      subtitle: 'Persönliche Daten ansehen und bearbeiten.',
    },
    shareLocation: {
      title: 'Standort teilen',
      subtitle: 'Teile deinen Standort mit vertrauenswürdigen Kontakten.',
    },
    settings: {
      title: 'Einstellungen'
    }
  },

  profile: {
    title: 'Profil',
    subtitle: 'Verwalte deine persönlichen Informationen',
    sections: {
      basicInfo: 'Grundinformationen',
      medicalInfo: 'Medizinische Informationen',
      personalInfo: 'Persönliche Informationen',
    },
    fields: {
      firstName: 'Vorname',
      lastName: 'Nachname',
      name: 'Name',
      email: 'E-Mail',
      phone: 'Telefonnummer',
      dateOfBirth: 'Geburtsdatum',
      address: 'Adresse',
      bloodType: 'Blutgruppe',
      allergies: 'Allergien',
      medications: 'Aktuelle Medikamente',
      preExistingConditions: 'Vorerkrankungen',
      vaccinationStatus: 'Impfstatus',
      emergencyContact: 'Notfallkontakt',
      jobTitle: 'Berufsbezeichnung',
      company: 'Unternehmen',
      department: 'Abteilung',
    },
    placeholders: {
      firstName: 'Vorname eingeben',
      lastName: 'Nachname eingeben',
      phone: 'Telefonnummer eingeben',
      dateOfBirth: 'Geburtsdatum auswählen',
      address: 'Adresse eingeben',
      bloodType: 'Blutgruppe auswählen',
      allergies: 'Allergien auflisten',
      medications: 'Aktuelle Medikamente auflisten',
      preExistingConditions: 'Vorerkrankungen auflisten',
      vaccinationStatus: 'Impfstatus eingeben',
      emergencyContact: 'Notfallkontakt eingeben',
      jobTitle: 'Berufsbezeichnung eingeben',
      company: 'Unternehmen eingeben',
      department: 'Abteilung eingeben',
      enterValue: 'Wert eingeben',
    },
    actions: {
      edit: 'Bearbeiten',
      save: 'Speichern',
      cancel: 'Abbrechen',
      update: 'Profil aktualisieren',
    },
    messages: {
      loading: 'Profil wird geladen...',
      updateSuccess: 'Profil erfolgreich aktualisiert',
      updateError: 'Profil konnte nicht aktualisiert werden',
      noData: 'Keine Informationen verfügbar',
      metadataUpdated: 'Profilinformationen aktualisiert',
      bloodTypeUpdated: 'Blutgruppe aktualisiert',
      jobUpdated: 'Berufsinformationen aktualisiert',
      allergiesUpdated: 'Allergien aktualisiert',
      conditionsUpdated: 'Vorerkrankungen aktualisiert',
      medicationUpdated: 'Medikamenteninformationen aktualisiert',
      vaccinationUpdated: 'Impfstatus aktualisiert',
    },
  },

  welcome: {
    title: 'Willkommen',
    subtitle: 'Dein Begleiter für Sicherheit, Warnungen und schnelle Hilfe.',
    features: {
      evacuation: {
        title: 'Evakuierungsrouten',
        description: 'Finde sichere und effiziente Fluchtwege.',
      },
      status: {
        title: 'Gebietsstatus',
        description: 'Erhalte Echtzeit‑Updates zur Sicherheitslage.',
      },
      alerts: {
        title: 'Notfallwarnungen',
        description: 'Bleibe mit zeitnahen Benachrichtigungen informiert.',
      },
    },
    cta: {
      footer: 'Erkunde die Funktionen und lege los.',
      signingIn: 'Anmeldung läuft...',
      signIn: 'Anmelden',
    },
  },

  emergencyContacts: {
    title: 'Notfallkontakte',
    subtitle: 'Verwalte vertrauenswürdige Kontakte und Anfragen.',
    search: {
      placeholder: 'Kontakte oder Nutzer suchen…',
    },
    tabs: {
      contacts: 'Kontakte',
      discover: 'Entdecken',
      requests: 'Anfragen',
    },
    empty: {
      contactsMessage: 'Noch keine Notfallkontakte',
      contactsDescription: 'Füge vertrauenswürdige Kontakte hinzu, um sie im Notfall schnell zu erreichen.',
      discoverMessage: 'Keine Nutzer gefunden',
      discoverDescription: 'Passe deine Suche an oder versuche es später erneut.',
      requestsMessage: 'Keine ausstehenden Anfragen',
      requestsDescription: 'Eingehende Kontaktanfragen erscheinen hier.',
    },
    actions: {
      remove: 'Entfernen',
      sendRequest: 'Anfrage senden',
      accept: 'Annehmen',
      decline: 'Ablehnen',
    },
    status: {
      sent: 'Anfrage gesendet',
      friends: 'Freunde',
      online: 'Online',
      offline: 'Offline',
    },
    labels: {
      newRequest: 'Neue Anfrage',
    },
    mutualFriends: 'Gemeinsame Freunde: {{count}}',
    toasts: {
      friendRequestSent: 'Kontaktanfrage gesendet',
      friendRequestSentError: 'Senden der Anfrage fehlgeschlagen',
      friendRequestAccepted: 'Kontaktanfrage angenommen',
      friendRequestAcceptError: 'Annahme der Anfrage fehlgeschlagen',
      friendRequestDeclined: 'Kontaktanfrage abgelehnt',
      friendRequestDeclineError: 'Ablehnen der Anfrage fehlgeschlagen',
      contactRemoved: 'Kontakt entfernt',
      contactRemoveError: 'Entfernen des Kontakts fehlgeschlagen',
    },
  },

  errorFallback: {
    title: 'Ups, etwas ist schiefgelaufen',
    description: 'Ein unerwarteter Fehler ist aufgetreten. Bitte versuche es erneut.',
    technicalDetails: 'Technische Details',
    tryAgain: 'Erneut versuchen',
    reportIssue: 'Problem melden',
    footer: 'Wenn das Problem weiterhin besteht, kontaktiere den Support.',
  },

  toast: {
    authSuccess: 'Erfolgreich angemeldet',
    logoutSuccess: 'Erfolgreich abgemeldet',
    badRequest: 'Fehlerhafte Anfrage',
    forbidden: 'Zugriff verweigert',
    notFound: 'Ressource nicht gefunden',
    requestTimeout: 'Zeitüberschreitung der Anfrage',
    serverError: 'Serverfehler',
    networkError: 'Netzwerkfehler',
    sessionExpired: 'Sitzung abgelaufen. Bitte melde dich erneut an.',
    tokenRefreshFailed: 'Sitzungsaktualisierung fehlgeschlagen. Bitte melde dich erneut an.',
  },
  emergencyAssistant: {
    title: 'Notfall-Assistent',
    subtitle: 'Stellen Sie Fragen zu Notfallsituationen',
    placeholder: 'Was soll ich bei einem Erdbeben tun?',
    searchButton: 'Suchen',
    searching: 'Suche...',
    noResults: 'Keine passenden Notfalltipps gefunden.',
    tryDifferentQuery: 'Versuchen Sie eine andere Frage.',
    offlineMode: 'Offline-Modus',
    onlineMode: 'Online-Modus',
    lastUpdated: 'Zuletzt aktualisiert',
    updateAvailable: 'Aktualisierung verfügbar',
    refresh: 'Aktualisieren',
    loading: 'Lade...',
    error: 'Fehler beim Laden der Notfalltipps',
    retry: 'Erneut versuchen',
    aiInitializing: 'KI-Modell wird initialisiert...',
    aiError: 'KI-Dienst nicht verfügbar',
    fallbackSearch: 'Verwende einfache Textsuche',
    relevanceScore: 'Relevanz',
    category: 'Kategorie',
    exampleQuestions: {
      title: 'Beispielfragen:',
      earthquake: 'Was tun bei einem Erdbeben?',
      fire: 'Wie verhalte ich mich bei einem Brand?',
      flood: 'Was mache ich bei Hochwasser?',
      storm: 'Wie bereite ich mich auf einen Sturm vor?',
      firstAid: 'Grundlagen der Ersten Hilfe?',
      evacuation: 'Wie läuft eine Evakuierung ab?',
      powerOutage: 'Was tun bei einem Stromausfall?',
    },
    tips: {
      noImage: 'Kein Bild verfügbar',
      readMore: 'Mehr lesen',
      readLess: 'Weniger anzeigen',
    },
    modelLoading: 'KI-Modell lädt',
    modelReady: 'Hallo! Bitte geben Sie Ihre Notfallfrage ein, beschreiben Sie Ihre Situation oder geben Sie ein einzelnes Wort wie "Flut" oder "Sturm" ein, um schnelle und hilfreiche Tipps zu erhalten.',
    systemReady: 'Willkommen beim Notfall-Assistenten! Ich kann Ihnen mit Notfalltipps und Informationen helfen.',
    generating: 'Antwort wird generiert...',
    inputPlaceholder: 'Fragen Sie nach Notfalltipps...',
    responses: {
      emergency: '🚨 NOTFALL: Wenn Sie sich in einer akuten Notlage befinden, wählen Sie sofort 112!',
      firstAid: 'Hier sind wichtige Erste-Hilfe-Informationen:',
      fire: 'Wichtige Informationen zum Brandschutz:',
      weather: 'Verhaltensregeln bei Unwetter:',
      general: 'Basierend auf Ihrer Anfrage habe ich folgende Informationen gefunden:',
      moreInfo: 'Für weitere Informationen oder in akuten Notfällen wählen Sie 112.',
      noResults: 'Leider konnte ich keine spezifischen Informationen zu Ihrer Anfrage finden.',
      emergencyNumbers: '**Allgemeine Notfallnummern:**\n🚨 Feuerwehr/Rettung: 112\n🚔 Polizei: 110\n☠️ Giftnotruf: 030 19240',
      reformulate: 'Bitte formulieren Sie Ihre Frage anders oder verwenden Sie Begriffe wie "Erste Hilfe", "Feuer", "Unwetter" oder "Unfall".',
      fallback112: 'Im Zweifel oder bei akuten Notfällen sofort 112 wählen.',
      fallbackPolice: 'Bei Straftaten oder dringenden Sicherheitsproblemen die Polizei unter 110 anrufen.',
      fallbackPoison: 'Bei Verdacht auf Vergiftung sofort die Giftnotrufzentrale kontaktieren: 030 19240.',
      fallbackGeneral: 'Wenn Sie keine Informationen finden, formulieren Sie Ihre Frage neu oder rufen Sie 112.',
      call112: {
        title: '🚨 **Notruf 112**',
        description: 'Die 112 ist die europäische Notrufnummer für Feuerwehr und Rettungsdienst. Sie ist kostenlos und rund um die Uhr erreichbar.',
        whatToSay: '**Was Sie am Telefon sagen sollten:**\n- Wo ist etwas passiert?\n- Was ist passiert?\n- Wie viele Personen sind betroffen?\n- Welche Art von Verletzungen?\n- Warten Sie auf Rückfragen!',
      },
      police: {
        title: '🚔 **Polizei-Notruf 110**',
        description: 'Rufen Sie die 110 bei:\n- Straftaten\n- Verkehrsunfällen mit Verletzten\n- Wenn Sie Hilfe benötigen\n\nFür allgemeine Anfragen nutzen Sie die örtliche Polizeidienststelle.',
      },
      poison: {
        title: '☠️ **Giftnotruf**',
        description: 'Bei Vergiftungen:\n- Sofort Giftnotruf kontaktieren\n- Ruhe bewahren\n- Erbrochenes aufbewahren\n- Bei Bewusstlosigkeit: 112',
        numbers: '**Giftnotruf-Zentrale:**\nBerlin: 030 19240\nBonn: 0228 19240',
      },
    },
    noData: 'Keine Infos',
  },
};

export default de;
