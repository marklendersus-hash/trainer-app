# Trainer App

Eine umfassende Web-Anwendung zur Verwaltung von Fußballmannschaften, die Trainern hilft, den Überblick über Spieler, Trainingseinheiten, Spieltage und Statistiken zu behalten. Die App ist als Progressive Web App (PWA) konzipiert und kann direkt zum Startbildschirm hinzugefügt werden, um ein App-ähnliches Erlebnis zu bieten.

![App Screenshot Placeholder](https://placehold.co/800x450/1f2937/f3f4f6?text=Trainer%20App)

---

## ✨ Features

### ⚽ Mannschafts- & Spieler-Verwaltung

- **Spieler-CRUD:** Erstellen, Anzeigen, Bearbeiten und Löschen von Spielern.
- **Umfassende Spielerprofile:** Speichern von Stammdaten wie Name, Rückennummer, Position, Geburtstag und Kontaktdaten.
- **Profilbilder:** Hochladen von Spielerfotos, die sicher auf einem externen S3-kompatiblen Speicher (Backblaze B2) abgelegt werden.
- **Status-Tracking:** Verwalten des Spielerstatus (Aktiv, Inaktiv, Verletzt, Gesperrt, Krank, Urlaub) mit automatischen Aktualisierungen basierend auf hinterlegten Daten (z.B. "Verletzt bis").
- **Intelligente Übersicht:** Eine filter- und sortierbare Liste aller Spieler, die auf einen Blick wichtige Kennzahlen wie Trainingsbeteiligung, absolvierte Matches und Spielminuten anzeigt.
- **Detaillierte Statistiken:** Einzelansicht für jeden Spieler mit einer kompletten Übersicht über alle Leistungsdaten (Tore, Vorlagen, etc.).

### 🏃‍♂️ Trainings-Planung & -Analyse

- **Trainings-Management:** Anlegen und Verwalten von einzelnen Trainingseinheiten mit Datum und Uhrzeit.
- **Anwesenheits-Tracking:** Einfaches Erfassen der Anwesenheit für jedes Training (Anwesend, Abwesend, Unentschuldigt).
- **Automatischer Trainingsplan:** Definieren von wiederkehrenden, wöchentlichen Trainingstagen und -zeiten. Die App generiert automatisch alle zukünftigen Trainingseinheiten bis zu einem wählbaren Enddatum.
- **Absage-Funktion:** Trainingseinheiten können als "abgesagt" markiert und bei Bedarf wieder reaktiviert werden.
- **Statistik-Ansicht:** Eine "Top 10"-Liste zeigt die trainingsfleißigsten Spieler basierend auf ihrer prozentualen Beteiligung.

### 🏆 Spieltags-Vorbereitung & -Statistik

- **Spieltags-Management:** Anlegen und Verwalten von Spieltagen mit Gegner, Spielort (Heim/Auswärts), Ergebnis, Spielart (Liga, Pokal, etc.) und Anstoßzeit.
- **Kader-Nominierung:** Einfache Zuweisung von Spielern zur Startelf, zur Ersatzbank oder als "Nicht im Kader". Spieler mit Status wie "Verletzt" werden automatisch als nicht verfügbar angezeigt.
- **Visuelles Formationstool:**
    - Ein interaktives Fußballfeld ermöglicht das Aufstellen der Spieler per Drag & Drop.
    - Vordefinierte Formationen (z.B. 4-4-2, 4-3-3) können ausgewählt werden, um die Spieler automatisch zu positionieren.
    - Die gespeicherte Formation wird visuell für den jeweiligen Spieltag hinterlegt.
- **Live-Statistiken (Erfassung):** Eintragen von Spielminuten, Toren und Vorlagen für jeden Spieler während oder nach dem Spiel.
- **Leistungsanalyse:** Eine "Top 10"-Ansicht für verschiedene Match-Statistiken (meiste Spiele, Minuten, Tore, Vorlagen) ermöglicht eine schnelle Leistungsübersicht.

### 📅 Dashboard & Kalender

- **Interaktiver Kalender:** Eine Monatsansicht zeigt alle wichtigen Termine:
    - Trainings (inkl. abgesagter Termine)
    - Spieltage (inkl. abgesagter Termine)
    - Spielergeburtstage
    - Nationale Feiertage (automatisch über eine externe API bezogen)
- **Termin-Details:** Ein Klick auf einen Tag öffnet eine detaillierte Übersicht aller Ereignisse an diesem Datum.
- **Filterbare Ansicht:** Die Kalenderansicht kann angepasst werden, um nur bestimmte Ereignistypen (Trainings, Matches, Geburtstage) anzuzeigen.
- **Nächste Termine:** Eine übersichtliche Liste zeigt die bevorstehenden Ereignisse an, um nichts zu verpassen.

### ⚙️ Einstellungen & Daten-Management

- **Team-Anpassung:** Hinterlegen des Mannschaftsnamens und Hochladen eines Vereinsemblems, das in der gesamten App angezeigt wird.
- **Daten-Backup & Wiederherstellung:**
    - **Export:** Alle wichtigen Daten (Spieler, Trainings, Matches, Team-Info) können als JSON-Datei exportiert werden. Es ist auch ein selektiver Export möglich.
    - **Import:** Eine zuvor exportierte JSON-Datei kann wieder importiert werden, um den App-Zustand wiederherzustellen oder auf ein anderes Gerät zu übertragen.
- **Datenlöschung:** Eine sichere Funktion, um gezielt bestimmte Datenbereiche (z.B. nur alle Trainings) oder die gesamte Datenbank unwiderruflich zu löschen.

### 📱 Progressive Web App (PWA)

- **Offline-Fähigkeit:** Dank eines Service Workers können die App-Grundlagen auch ohne Internetverbindung geladen werden.
- **Zum Startbildschirm hinzufügen:** Die App kann wie eine native App auf dem Smartphone oder Desktop installiert werden, um einen schnellen Zugriff zu ermöglichen.

---

## 🛠️ Technische Details

- **Backend:** Firebase (Firestore Database, Anonymous Authentication)
- **Frontend:** Vanilla JavaScript (ES6 Module), Tailwind CSS, HTML5
- **Architektur:**
    - Modulare, zustandsbasierte Architektur (`state.js`, `api.js`, `render.js`, `app.js`).
    - Echtzeit-Daten-Synchronisation durch Firebase `onSnapshot`-Listener.
    - Komponenten-ähnliche Render-Funktionen, die bei jeder Zustandsänderung die UI aktualisieren.
- **File-Uploads:** Eine serverseitige Funktion (Serverless Function) handhabt Datei-Uploads sicher, ohne sensible Zugangsdaten im Frontend preiszugeben.
- **Abhängigkeiten:**
    - Firebase Web SDK
    - AWS S3 Client SDK (für die Kompatibilität mit Backblaze B2)

