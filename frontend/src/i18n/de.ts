import type { Translations } from './en';

const de: Translations = {
  common: {
    ok: 'OK',
    cancel: 'Abbrechen',
    noData: 'Keine Daten verfügbar',
    loading: 'Wird geladen...',
    lastSeen: 'Zuletzt gesehen',
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
  },

  actions: {
    safetyAlerts: {
      title: 'Sicherheitswarnungen',
      subtitle: 'Empfange und verwalte Warnungen in deiner Umgebung.',
    },
    profile: {
      title: 'Profil',
      subtitle: 'Persönliche Daten ansehen und bearbeiten.',
    },
    shareLocation: {
      title: 'Standort teilen',
      subtitle: 'Teile deinen Standort mit vertrauenswürdigen Kontakten.',
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
};

export default de;
