# 🛡️ SafeNet – Systemarchitektur-Dokumentation

## 🏗️ Gesamtarchitektur des Systems

```mermaid
graph TB
    subgraph "Frontend (React Native + Expo + Ignite)"
        A[Mobile App]
        A1[Screen-Schicht]
        A2[Feature-Schicht]
        A3[Komponenten-Schicht]
        A4[Service-Schicht]
        A5[Redux Store]
        A6[Hooks-Schicht]
        
        A1 --> A2
        A2 --> A3
        A2 --> A4
        A2 --> A5
        A2 --> A6
    end
    
    subgraph "Backend (Spring Boot + Hexagonale Architektur)"
        B[REST API Gateway]
        B1[Web Controller]
        B2[Applikations-Services]
        B3[Domain-Schicht]
        B4[Infrastruktur-Adapter]
        
        B --> B1
        B1 --> B2
        B2 --> B3
        B2 --> B4
    end
    
    subgraph "Authentifizierung"
        C[Keycloak-Server]
        C1[OAuth2/OIDC]
        C2[JWT-Token]
    end
    
    subgraph "Datenebene"
        D[PostgreSQL]
        D1[Benutzerdaten]
        D2[Standortdaten]
        D3[Notfallkontakte]
        D4[Metadaten JSONB]
    end
    
    subgraph "Externe APIs"
        E1[Overpass API – Hilfszentren]
        E2[Autobahn API – Verkehr]
        E3[Wetter-/NINA-APIs]
        E4[Push-Benachrichtigungsdienste]
    end
    
    A --> B
    A --> C
    B --> C
    B --> D
    B4 --> E1
    B4 --> E2
    B4 --> E3
    A --> E4
```

---

## 🎯 Frontend-Architektur (React Native + Ignite-Template)

### Ignite-Template-Struktur

```mermaid
graph TB
    subgraph "Ignite Template Architektur"
        A[App-Root]
        A1[Screens]
        A2[Features]
        A3[Komponenten]
        A4[Services]
        A5[Store/Redux]
        A6[Hooks]
        A7[Theme]
        A8[i18n]
        A9[Konfiguration]
        
        A --> A1
        A --> A2
        A --> A3
        A --> A4
        A --> A5
        A --> A6
        A --> A7
        A --> A8
        A --> A9
    end
    
    subgraph "Feature-basierte Organisation"
        F1[Notfallkontakte]
        F2[Karte & Standort]
        F3[Notfallassistent]
        F4[Profilverwaltung]
        F5[Sicherheitswarnungen]
        
        F1 --> F1A[Komponenten]
        F1 --> F1B[Hooks]
        F1 --> F1C[Store]
        F1 --> F1D[Screens]
        F1 --> F1E[Schemas]
    end
    
    A2 --> F1
    A2 --> F2
    A2 --> F3
    A2 --> F4
    A2 --> F5
```

### Redux-State-Management

```mermaid
graph LR
    subgraph "Redux Store Struktur"
        A[Root Store]
        A1[Auth Slice]
        A2[Location Slice]
        A3[Notfallkontakte Slice]
        A4[Profil Slice]
        A5[API Slice – RTK Query]
        
        A --> A1
        A --> A2
        A --> A3
        A --> A4
        A --> A5
    end
    
    subgraph "Persistenzschicht"
        B[Redux Persist]
        B1[MMKV Storage]
        
        B --> B1
    end
    
    A --> B
    
    subgraph "API-Integration"
        C[RTK Query]
        C1[Notfallkontakte API]
        C2[Standort API]
        C3[Profil API]
        C4[Sicherheitswarnungen API]
        C5[Notfalltipps API]
        
        A5 --> C1
        A5 --> C2
        A5 --> C3
        A5 --> C4
        A5 --> C5
    end
```

### Wichtige Frontend-Funktionen

* **Notfallkontakte:** Verwaltung von Freunden mit Standortfreigabe in Echtzeit
* **Interaktive Karte:** Individuelle Kachelkarte mit Hilfszentren, Warnungen und Freundesstandorten
* **Notfallassistent (AI):** KI-gestützter Chat mit ONNX Runtime für Offline-Tipps
* **Profilverwaltung:** Benutzer-Metadaten inkl. medizinischer Infos und Präferenzen
* **Sicherheitswarnungen:** Echtzeit-Benachrichtigungen zu Wetter, Polizei & Notfällen
* **Offline-First:** Persistente Speicherung wichtiger Daten über MMKV & AsyncStorage

---

## 🏛️ Backend-Architektur (Hexagonal / Ports & Adapter)

### Umsetzung der Hexagonalen Architektur

```mermaid
graph TB
    subgraph "Infrastruktur-Schicht (Adapter)"
        I1[Web Controller]
        I2[PostgreSQL Adapter]
        I3[Keycloak Adapter]
        I4[Externe API Adapter]
        I5[RSS Feed Adapter]
    end
    
    subgraph "Applikations-Schicht"
        A1[Applikations-Services]
        A2[Konfiguration]
        A3[Sicherheitskonfiguration]
        A4[OpenAPI-Konfiguration]
    end
    
    subgraph "Domain-Schicht (Kern)"
        D1[Domain-Modelle]
        D2[Geschäftslogik]
        D3[Domain-Ausnahmen]
        D4[Eingehende Ports]
        D5[Ausgehende Ports]
    end
    
    I1 --> A1
    I2 --> A1
    I3 --> A1
    I4 --> A1
    I5 --> A1
    
    A1 --> D4
    A1 --> D5
    D4 --> D1
    D5 --> D1
    
    D1 --> D2
    D2 --> D3
```

### Domain-Modelle & Ports

```mermaid
graph LR
    subgraph "Domain-Modelle"
        M1[Benutzer]
        M2[Benutzerstandort]
        M3[Hilfszentrum]
        M4[Notfallkontakt]
        M5[Autobahnsperrung]
    end
    
    subgraph "Eingehende Ports"
        IP1[UserMetaDataPort]
        IP2[UserLocationPort]
        IP3[FriendshipPort]
        IP4[AutobahnClosurePort]
    end
    
    subgraph "Ausgehende Ports"
        OP1[HelpCentersFeedPort]
        OP2[AutobahnClosureFeedPort]
        OP3[UserRepositoryPort]
        OP4[LocationRepositoryPort]
    end
    
    IP1 --> M1
    IP2 --> M2
    IP3 --> M4
    IP4 --> M5
    
    OP1 --> M3
    OP2 --> M5
    OP3 --> M1
    OP4 --> M2
```

### REST-API-Design (Best Practices)

```mermaid
graph TB
    subgraph "REST Controller"
        C1[NotfallkontakteController]
        C2[UserLocationsController]
        C3[HelpCenterController]
        C4[UserMetaDataController]
        C5[AutobahnClosureController]
        C6[MeteoAlarmController]
        C7[NotfalltippsController]
    end
    
    subgraph "REST Best Practices"
        R1[HTTP-Methoden: GET, POST, PUT, PATCH, DELETE]
        R2[Statuscodes: 200, 201, 400, 401, 404, 409]
        R3[OpenAPI/Swagger-Dokumentation]
        R4[Request/Response DTOs]
        R5[Validierung & Fehlerbehandlung]
        R6[Authentifizierung via JWT]
    end
    
    C1 --> R1
    C1 --> R2
    C1 --> R3
    C1 --> R4
    C1 --> R5
    C1 --> R6
```

---

## 🔐 Sicherheitsarchitektur

### Authentifizierungs- & Autorisierungsablauf

```mermaid
sequenceDiagram
    participant App as Mobile App
    participant KC as Keycloak
    participant API as Spring Boot API
    participant DB as PostgreSQL
    
    App->>KC: OAuth2 Autorisierungsanfrage
    KC->>App: Autorisierungscode
    App->>KC: Austausch gegen JWT-Token
    KC->>App: JWT Access Token
    
    App->>API: API-Anfrage mit JWT
    API->>API: JWT-Signaturvalidierung
    API->>API: Benutzerkontext extrahieren
    API->>DB: Datenbankabfrage mit Benutzerkontext
    DB->>API: Benutzerdaten
    API->>App: Antwort
```

### Sicherheitsfunktionen

* **OAuth2/OIDC:** Standardisierte Authentifizierung über Keycloak
* **JWT Tokens:** Zustandslose Sitzungen mit Benutzerkontext
* **Rollenbasierter Zugriff:** Feingranulare Rechteverwaltung
* **CORS-Konfiguration:** Sichere Cross-Origin-Anfragen
* **HTTPS-Erzwingung:** Verschlüsselte Kommunikation
* **Isolierung des Benutzerkontexts:** Zugriff nur auf eigene Daten

---

## 🗺️ Kartenarchitektur

### Benutzerdefinierte Kartenimplementierung

```mermaid
graph TB
    subgraph "Kartenkomponenten"
        M1[Kachelraster]
        M2[Kartensteuerung]
        M3[Karten-Overlay]
        M4[Hilfszentren-Overlay]
        M5[Warnungen-Overlay]
        M6[Kartenstatusleiste]
        M7[Kartenlegende]
    end
    
    subgraph "Karten-State-Management"
        S1[useMapState]
        S2[useMapTiles]
        S3[useMapPan]
        S4[useHelpCenters]
        S5[useWarnings]
    end
    
    subgraph "Datenquellen"
        D1[OpenStreetMap Tiles]
        D2[Overpass API – Hilfszentren]
        D3[Wetter-/Warnungs-APIs]
        D4[Freundesstandorte]
    end
    
    M1 --> S1
    M2 --> S2
    M3 --> S3
    M4 --> S4
    M5 --> S5
    
    S1 --> D1
    S4 --> D2
    S5 --> D3
    M3 --> D4
```

---

## 🤖 KI/ML-Architektur (Notfallassistent)

### ONNX Runtime-Integration

```mermaid
graph TB
    subgraph "AI-Komponenten"
        A1[Notfallassistent-Screen]
        A2[Chat-Interface]
        A3[Nachrichten-Handler]
        A4[Modell-Loader]
        A5[Embedding-Suche]
    end
    
    subgraph "ONNX Runtime"
        O1[Text-Embedding-Modell]
        O2[Semantische Suche]
        O3[Antwortgenerierung]
        O4[Offline-Verarbeitung]
    end
    
    subgraph "Notfalltipps"
        E1[NINA-Notfalltipps]
        E2[Gecachte Tipps-Datenbank]
        E3[Semantische Indizierung]
        E4[Kontextbezogene Antworten]
    end
    
    A1 --> A2
    A2 --> A3
    A3 --> A4
    A4 --> A5
    
    A5 --> O1
    O1 --> O2
    O2 --> O3
    O3 --> O4
    
    O2 --> E1
    E1 --> E2
    E2 --> E3
    E3 --> E4
```

---

## 🔧 Technologie-Integrationen

### Zentrale Integrationsmuster

* **Frontend–Backend:** RESTful APIs mit JWT-Authentifizierung
* **State Management:** Redux & RTK Query für Serverstatus
* **Offline-Synchronisation:** Redux Persist mit Konfliktlösung
* **Echtzeit-Updates:** Push-Benachrichtigungen (zukünftig WebSockets)
* **Externe APIs:** Adapter-Pattern zur Anbindung von Drittanbietern
* **KI/ML:** ONNX Runtime für Offline-Unterstützung bei Notfällen
* **Karten:** Individuelle Kachelkarten mit Overlays
* **Authentifizierung:** OAuth2-Flow mit Keycloak-Integration
