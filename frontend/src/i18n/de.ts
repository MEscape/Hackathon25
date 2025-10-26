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
    helpCenterTypes: {
      hospital: 'Krankenhaus',
      police: 'Polizei',
      fire_station: 'Feuerwehr',
      pharmacy: 'Apotheke',
      shelter: 'Notunterkunft',
    },
    information: 'Informationen',
    tags: 'Eigenschaften',
    call: 'Anrufen',
    directions: 'Route',
    error: 'Fehler',
    cannotOpenMaps: 'Karten-App konnte nicht geöffnet werden',
    noPhoneNumber: 'Keine Telefonnummer verfügbar',
    helpCentersRadius: 'Hilfseinrichtungen im Umkreis von {{radius}}km',
    loading: 'Wird geladen...',
    loadingError: 'Fehler beim Laden',
    locationShared: 'Standort geteilt',
    locationPrivate: 'Standort privat',
    friendsVisible: 'Freunde sichtbar',
    noFriendsVisible: 'Keine Freunde sichtbar',
    helpCentersActive: 'Hilfszentren aktiv',
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

  location: {
    permission: {
      title: 'Standortzugriff',
      description: 'SafeNet benötigt Standortzugriff, um Sicherheitsfunktionen bereitzustellen und Ihnen in Notfällen zu helfen.',
      features: {
        emergencyResponse: 'Notfallreaktion',
        friendsLocation: 'Standort mit Freunden teilen',
        safetyAlerts: 'Standortbasierte Sicherheitswarnungen',
      },
      buttons: {
        allow: 'Standortzugriff erlauben',
        skip: 'Vorerst überspringen',
      },
      privacy: 'Ihre Standortdaten sind verschlüsselt und werden nur mit Ihren vertrauenswürdigen Kontakten geteilt.',
    },
    tracking: {
      started: 'Standortverfolgung gestartet',
      stopped: 'Standortverfolgung gestoppt',
      error: 'Standortverfolgung konnte nicht gestartet werden',
      backgroundTitle: 'SafeNet Standortverfolgung',
      backgroundBody: 'Verfolgt Ihren Standort für Sicherheitszwecke',
    },
    visibility: {
      visible: 'Standort für Freunde sichtbar',
      hidden: 'Standort vor Freunden verborgen',
      error: 'Standortsichtbarkeit konnte nicht aktualisiert werden',
    },

    permissionDenied: 'Standortberechtigung verweigert',
    backgroundPermissionDenied: 'Hintergrund-Standortberechtigung verweigert',
    backgroundPermissionTitle: 'Hintergrund-Standortzugriff',
    backgroundPermissionMessage: 'SafeNet benötigt Hintergrund-Standortzugriff, um Ihren Standort auch bei geschlossener App zu verfolgen.',
    permissionError: 'Standortberechtigung konnte nicht angefordert werden',
    trackingStartedMessage: 'Ihr Standort wird jetzt zu Sicherheitszwecken verfolgt',
    trackingStartError: 'Standortverfolgung konnte nicht gestartet werden',
    trackingStopError: 'Standortverfolgung konnte nicht gestoppt werden',
    getCurrentLocationError: 'Aktueller Standort konnte nicht abgerufen werden',
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
};

export default de;
