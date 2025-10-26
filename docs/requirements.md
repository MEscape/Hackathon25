# 🛡️ SafeNet – Connected Safety for Everyone  
**Hackathon Fulda 2025 – Kategorie: Disaster Tech**

---

## 💡 Vision

Katastrophen kennen keine Grenzen – aber gemeinsam können wir sie überstehen.  
**SafeNet** schafft ein intelligentes Netzwerk aus Menschen, Daten und Orten, das in Krisensituationen Leben retten kann.

Unsere Vision:  
> "Menschen vernetzen, Wissen teilen, Sicherheit schaffen."

---

## 🌍 Mission

**SafeNet** ist eine App, die in Echtzeit erkennt, **wo Gefahr droht**, **wo Hilfe verfügbar ist** und **wer in der Nähe Unterstützung braucht oder leisten kann**.  
Sie vereint aktuelle Gefahreninformationen, Notfallkommunikation, persönliche Netzwerke und lokale Hilfsangebote in einer einzigen, intuitiven Plattform.

---

## 👥 Team SafeNet

- **Rollenvielfalt**: Frontend, Backend, Machine Learning, Design, UX, Data Integration  
- **Ziel**: Innerhalb von 25 Stunden eine funktionierende Plattform bauen, die zeigt, wie vernetzte Daten und KI helfen können, Menschen in Krisen zu schützen.  
- **Motto**: *Tech meets humanity.*

---

## 📱 Hauptfunktionen

### 🏠 **Welcome Page**
- Kurze Einführung in SafeNet und seine Sicherheitsvision  
- Authentifizierung über **Keycloak (OAuth2)**  
- Automatische Weiterleitung zur personalisierten **Home Page**

---

### 🧭 **Home Page – Dein Sicherheitszentrum**
Der zentrale Hub der App – von hier aus hast du alle wichtigen Funktionen im Blick.

#### 🔒 Sicherheitsstatus
- Zeigt den aktuellen Gefahrenlevel in deiner Umgebung  
- Dynamische Farbskala (Grün → Gelb → Rot)  
- Regelmäßige Aktualisierung über Echtzeitdaten  

#### ⚡ Quick Actions
- **🚨 Emergency Call** → Alarmiere deine Freunde im Notfall  
- **📜 Notfalltipps** → Erhalte lebenswichtige Hinweise, auch offline  
- **🤖 Offline Chatbot** → Trainiert auf Katastrophenwissen, funktioniert ohne Internet  
- **📰 News Feed** → Offizielle Meldungen und Warnungen aus vertrauenswürdigen Quellen  
- **🗺️ Karte öffnen** → Zeigt dir Heatmaps, Freunde und Hilfsstellen in deiner Nähe  
- **⚙️ Einstellungen** → Bearbeite dein Profil, Gesundheitsdaten und Sicherheitsfreigaben  

---

### 🗺️ **Map – Das Herzstück von SafeNet**

Ein interaktives, dynamisches Lagebild deiner Umgebung.

#### 🔥 Gefahrenzonen (Heatmaps)
- Farbige **Heatmaps**, die Risiko-Hotspots visualisieren  
- Datenaggregation aus mehreren öffentlichen Quellen (z. B. Umwelt, Verkehr, Wetter)  
- Deep-Learning-basierte Bewertung, um potenzielle Gefahrenzonen zu identifizieren  

#### 🏥 Hilfseinrichtungen
- Zeigt **Krankenhäuser, Polizeistationen, Feuerwehr, Notunterkünfte**  
- Standortbasiert mit Entfernung und Kontaktoption  
- Navigation über Standardkarten  

#### 👥 Freunde auf der Karte
- Freunde in Echtzeit auf der Karte sichtbar  
- Klick öffnet Profil (z. B. Blutgruppe, Allergien, Beruf, Telefonnummer)  
- Unterstützt schnelle Hilfe und Koordination  

---

### 🚨 **Emergency Call**
- Alarmiert alle Freunde und Kontakte auf Knopfdruck  
- Standort wird automatisch mitgesendet  
- Nutzung von **React-Native-Callkeep** und Push-Notifications  
- Visuelles Feedback, sobald Kontakte reagieren  

---

### 💬 **Offline Chatbot**
- Funktioniert ohne Internetverbindung  
- Trainiert auf Notfallwissen: Erste Hilfe, Verhalten bei Katastrophen, Schutzmaßnahmen  
- Antwortet schnell und kontextbezogen auf Fragen wie:  
  - „Was tun bei Hochwasser?“  
  - „Wie erkenne ich CO-Vergiftung?“  

---

### 📜 **Notfalltipps**
- Kuratierte Tipps für verschiedene Szenarien:  
  - Brand  
  - Sturm  
  - Stromausfall  
  - Überschwemmung  
- Offline verfügbar, mit Checklisten-Funktion („Habe ich alles?“)

---

### 📰 **News & Warnmeldungen**
- Offizielle Informationen aus geprüften Quellen (BBK, DWD, Polizei etc.)  
- Integration von **RSS-Feeds** und **öffentlichen APIs**  
- Regionale Filterung, automatische Aktualisierung  

---

### 🧑‍🤝‍🧑 **Freunde & Kontakte**
- Freundschaftssystem mit:  
  - Anfragen senden  
  - Akzeptieren / Ablehnen  
  - Notfallgruppen (z. B. Familie, Team, Nachbarn)  
- Anzeige letzter bekannter Position  
- Unterstützt schnelle Koordination in Krisen  

---

### ⚙️ **Profil & Einstellungen**
- Personalisierte Informationen:  
  - Blutgruppe  
  - Allergien  
  - Beruf  
  - Telefonnummer  
- Steuerung von Sichtbarkeit und Standortfreigabe  
- Datenschutzkonform nach europäischen Standards  

---

## 🧩 Erweiterte Ideen & Visionen

| Kategorie | Idee |
|------------|------|
| 🧠 KI-Risikoanalyse | Vorhersage möglicher Gefahrenzonen (Flood Risk, Unwetter etc.) |
| 🛰️ Offline-Karten | Speichern letzter bekannter Gebiete für Krisen ohne Netz |
| 🚁 Helfer-Modus | Registrierung als Helfer (Sanitäter, Techniker, Feuerwehr etc.) |
| 🗣️ Community-Modus | Nutzer können lokale Gefahren melden |
| 🔋 Energiesparmodus | Minimal-UI bei Stromausfall |
| 🎯 Gamification | Sicherheitstraining & Challenges für Katastrophenbewusstsein |

---

## 🧭 Nutzerfluss (User Flow)

```

Start App
↓
Welcome Page → Login via Keycloak
↓
Home Page → Sicherheitsstatus + Quick Actions
↓
Map → Heatmaps + Hilfseinrichtungen + Freunde
↓
Emergency Call → Freunde alarmiert
↓
Offline Modus → Tipps + Chatbot verfügbar

```

---

## 🧱 App-Struktur (Feature-Module)

| Modul | Funktion |
|--------|-----------|
| **Auth** | Anmeldung & Nutzerverwaltung |
| **Map** | Kartenlogik, Heatmaps, Einrichtungen |
| **Friends** | Freundesnetzwerk & Alarmierung |
| **News** | Echtzeitwarnungen & RSS-Daten |
| **Tips** | Offline-Wissen & Chatbot |
| **Profile** | Gesundheits- & Nutzerdaten |

---

## 🎯 Hackathon-Ziel

Ein funktionierender **Prototyp**, der zeigt:
- Wie Datenintelligenz Leben schützen kann  
- Wie Menschen in Krisen vernetzt bleiben  
- Wie AI & Geo-Daten zusammenwirken können  

**MVP-Fokus:**
- Heatmap mit Gefahrenzonen  
- Anzeige von Hilfseinrichtungen  
- Freunde-Tracking  
- Emergency-Call  
- Offline-Chatbot  

---

## 🏁 Elevator Pitch

> **SafeNet** – Die App, die dich und deine Liebsten schützt.  
> Sie erkennt Gefahren, verbindet Menschen und zeigt dir, wo Hilfe ist.  
> **Sicher vernetzt. Immer bereit.**

---

## 👥 Team SafeNet
**Teammitglieder:**  
Frontend | Backend | AI/ML | Data Integration | Design & UX  

> Gemeinsam für mehr Sicherheit – mit Daten, Herz und Verstand.