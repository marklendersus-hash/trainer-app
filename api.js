import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { getFirestore, collection, doc, addDoc, setDoc, deleteDoc, updateDoc, query, getDoc, where, getDocs, writeBatch, setLogLevel } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";
// Firebase Storage wird nicht mehr für Uploads benötigt, kann aber für das Löschen alter Bilder noch nützlich sein.
// Wir entfernen die Upload-bezogenen Imports.
import { getAuth } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
import { state } from './state.js';
import { showModal, closeModal } from './views/modals.js';

// --- VERSION & KONFIGURATION ---
export const APP_VERSION = `Version 2025-08-23-999 B2-Storage`;

export const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';

const firebaseConfig = {
  apiKey: "AIzaSyBCjgKFLqMWg4OC1zaFLner1pyE_4vFNnU",
  authDomain: "trainer-app-2025-08.firebaseapp.com",
  projectId: "trainer-app-2025-08",
  storageBucket: "trainer-app-2025-08.firebasestorage.app",
  messagingSenderId: "8465381059",
  appId: "1:8465381059:web:4785e9728abfc79f3e1476"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
setLogLevel('debug');


// Dies ist die NEUE Funktion, die du in deine `api.js`-Datei einfügen musst.
// Sie ersetzt die alte `uploadFileToB2` Funktion.

async function uploadFileToB2(file) {
    // Prüfen, ob eine Datei vorhanden ist.
    if (!file || file.size === 0) {
        return null;
    }

    // Der Endpunkt unserer Serverless Function. 
    // Da die Funktion im selben Projekt liegt, können wir einen relativen Pfad verwenden.
    const uploadUrl = '/api/upload';

    try {
        // Sende die Datei per POST-Request an unsere sichere Serverless Function.
        const response = await fetch(uploadUrl, {
            method: 'POST',
            headers: {
                // Wichtige Metadaten für die Serverless Function.
                'Content-Type': file.type,
                'x-file-name': file.name
            },
            body: file // Die Datei selbst wird als Body gesendet.
        });

        // Verarbeite die Antwort der Serverless Function.
        const result = await response.json();

        if (!response.ok) {
            // Wenn der Server einen Fehler meldet, werfen wir einen Fehler,
            // damit er im `catch`-Block behandelt werden kann.
            throw new Error(result.message || 'Upload fehlgeschlagen');
        }

        // Wenn alles gut ging, gibt die Serverless Function ein JSON-Objekt
        // mit der öffentlichen URL des Bildes zurück.
        return result.url;

    } catch (error) {
        console.error("Fehler beim Upload zu B2 via Serverless Function:", error);
        // Zeige dem Benutzer eine Fehlermeldung.
        // Die `showModal` Funktion muss in deiner App verfügbar sein.
        showModal("Upload Fehler", `Die Datei konnte nicht hochgeladen werden: ${error.message}`, [{text: 'OK', class: 'bg-red-500'}]);
        return null;
    }
}


export const saveSpieler = async (data, id, file, callbacks) => {
    console.log("saveSpieler: Funktion aufgerufen.");
    showModal("Speichern...", '<div class="animate-pulse">Spielerdaten werden verarbeitet...</div>', []);
    try {
        // *** ANPASSUNG START: B2 Upload statt Firebase Storage ***
        // 1. Prüfen, ob eine neue Datei hochgeladen werden soll.
        if (file && file.size > 0) {
            console.log("saveSpieler: Lade neues Spielerfoto hoch...");
            // 2. Die neue Helferfunktion aufrufen, um das Bild zu B2 hochzuladen.
            const newFotoUrl = await uploadFileToB2(file);
            // 3. Wenn der Upload erfolgreich war, die neue URL zu den Daten hinzufügen.
            if (newFotoUrl) {
                data.fotoUrl = newFotoUrl;
                console.log("saveSpieler: Foto-URL von B2 erhalten:", data.fotoUrl);
            } else {
                // Wenn der Upload fehlschlägt, den Speicherprozess abbrechen.
                throw new Error("Spielerfoto konnte nicht hochgeladen werden.");
            }
        }
        // *** ANPASSUNG ENDE ***

        let docRef;
        const spielerCollection = collection(db, `artifacts/${appId}/public/data/spieler`);

        if (id) {
            docRef = doc(spielerCollection, id);
            await updateDoc(docRef, data);
            console.log("saveSpieler: Spieler erfolgreich aktualisiert.");
            showModal("Erfolg", "Spieler erfolgreich aktualisiert!", [{text: 'OK', class: 'bg-green-500', onClick: () => callbacks.goBack()}]);
        } else {
            // Beim Erstellen eines neuen Spielers muss der Upload VOR dem Speichern in Firestore erfolgen.
            docRef = await addDoc(spielerCollection, data);
            console.log("saveSpieler: Spieler erfolgreich hinzugefügt.");
            showModal("Erfolg", "Spieler erfolgreich hinzugefügt!", [{text: 'OK', class: 'bg-green-500', onClick: () => callbacks.navigateTo('spielerUebersicht', null, true)}]);
        }
    } catch (error) {
        console.error("saveSpieler: FEHLER beim Speichern:", error);
        showModal("Fehler", `Fehler beim Speichern des Spielers: ${error.message || 'Unbekannter Fehler'}.`, [{text: 'OK', class: 'bg-red-500'}]);
    }
};


export const saveMannschaftInfo = async (form, callbacks) => {
    console.log("saveMannschaftInfo: Funktion aufgerufen.");
    showModal("Speichern...", '<div class="animate-pulse">Mannschaftsinfo wird gespeichert...</div>', []);
    const formData = new FormData(form);
    const teamData = {
        name: formData.get('name'),
        name2: formData.get('name2'),
    };
    const file = formData.get('emblem');
    try {
        // *** ANPASSUNG START: B2 Upload statt Firebase Storage ***
        if (file && file.size > 0) {
            console.log("saveMannschaftInfo: Lade neues Emblem hoch...");
            const newEmblemUrl = await uploadFileToB2(file);
            if (newEmblemUrl) {
                teamData.emblemUrl = newEmblemUrl;
                console.log("saveMannschaftInfo: Emblem URL von B2 erhalten:", teamData.emblemUrl);
            } else {
                throw new Error("Vereinsemblem konnte nicht hochgeladen werden.");
            }
        }
        // *** ANPASSUNG ENDE ***

        const configDoc = doc(db, `artifacts/${appId}/public/data/config/team`);
        await setDoc(configDoc, teamData, { merge: true });
        console.log("saveMannschaftInfo: Mannschaftsinfo erfolgreich aktualisiert.");
        showModal("Gespeichert", "Mannschaftsinfo erfolgreich aktualisiert.", [{text: 'OK', class: 'bg-green-500'}]);
    } catch (error) {
        console.error("saveMannschaftInfo: FEHLER beim Speichern der Mannschaftsinfo:", error);
        showModal("Fehler", `Konnte Mannschaftsinfo nicht speichern: ${error.message || 'Unbekannter Fehler'}.`, [{text: 'OK', class: 'bg-red-500'}]);
    }
};


// --- ALLE ANDEREN FUNKTIONEN BLEIBEN UNVERÄNDERT ---
// (deleteSpieler, setAnwesenheit, etc. interagieren nur mit Firestore und benötigen keine Änderungen)

export const deleteSpieler = async (id, callbacks) => {
    console.log("deleteSpieler: Funktion aufgerufen. ID:", id);
    const spielerCollection = collection(db, `artifacts/${appId}/public/data/spieler`);
    showModal(
        "Spieler löschen?",
        "Möchten Sie diesen Spieler wirklich endgültig löschen?",
        [
            { text: 'Abbrechen', class: 'bg-gray-500' },
            { text: 'Ja, löschen', class: 'bg-red-600', onClick: async () => {
                try {
                    console.log("deleteSpieler: Lösche Dokument mit ID:", id);
                    await deleteDoc(doc(spielerCollection, id));
                    console.log("deleteSpieler: Spieler erfolgreich gelöscht.");
                    showModal("Gelöscht", "Spieler wurde gelöscht.", [{text: 'OK', class: 'bg-blue-500', onClick: () => callbacks.navigateTo('spielerUebersicht', null, true)}]);
                } catch (error) {
                    console.error("deleteSpieler: FEHLER beim Löschen:", error);
                    if (error.code === 'permission-denied') {
                        showModal("Fehler: Zugriff verweigert", "Sie haben keine Berechtigung, diesen Spieler zu löschen. Bitte überprüfen Sie die Firebase-Sicherheitsregeln.", [{text: 'OK', class: 'bg-red-500'}]);
                    } else {
                        showModal("Fehler", `Fehler beim Löschen des Spielers: ${error.message || 'Unbekannter Fehler'}. Details in der Konsole.`, [{text: 'OK', class: 'bg-red-500'}]);
                    }
                }
            }}
        ]
    );
};

export const setAnwesenheit = async (datumString, spielerId, status) => {
    console.log(`setAnwesenheit: Funktion aufgerufen. Datum: ${datumString}, Spieler: ${spielerId}, Status: ${status}`);
    const trainingCollection = collection(db, `artifacts/${appId}/public/data/trainingseinheiten`);
    const docRef = doc(trainingCollection, datumString);
    try {
        const docSnap = await getDoc(docRef);
        if (!docSnap.exists()) {
            console.log("setAnwesenheit: Dokument existiert nicht, erstelle neues Dokument.");
            await setDoc(docRef, { teilnehmer: { [spielerId]: status } });
        } else {
            console.log("setAnwesenheit: Dokument existiert, aktualisiere Anwesenheit.");
            await updateDoc(docRef, {
                [`teilnehmer.${spielerId}`]: status
            });
        }
        console.log("setAnwesenheit: Anwesenheit erfolgreich gespeichert.");
    } catch (error) {
        console.error("setAnwesenheit: FEHLER beim Setzen der Anwesenheit:", error);
        if (error.code === 'permission-denied') {
            showModal("Fehler: Zugriff verweigert", "Sie haben keine Berechtigung, die Anwesenheit zu speichern. Bitte überprüfen Sie die Firebase-Sicherheitsregeln.", [{text: 'OK', class: 'bg-red-500'}]);
        } else {
            showModal("Fehler", `Fehler beim Speichern der Anwesenheit: ${error.message || 'Unbekannter Fehler'}. Details in der Konsole.`, [{text: 'OK', class: 'bg-red-500'}]);
        }
    }
};

// NEUE FUNKTIONALITÄT: Funktion zum Speichern von Trainingsdetails (Uhrzeit)
export const saveTrainingDetails = async (datumString, data, callbacks) => {
    console.log("saveTrainingDetails: Funktion aufgerufen. Datum:", datumString);
    console.log("saveTrainingDetails: Daten:", JSON.stringify(data));
    const trainingCollection = collection(db, `artifacts/${appId}/public/data/trainingseinheiten`);
    const docRef = doc(trainingCollection, datumString);
    showModal("Speichern...", '<div class="animate-pulse">Trainingsdetails werden gespeichert...</div>', []);
    try {
        const docSnap = await getDoc(docRef);
        const dataToSave = {
            time: data.time || null // Speichere die Uhrzeit
        };

        if (docSnap.exists()) {
            console.log("saveTrainingDetails: Training existiert, aktualisiere.");
            await updateDoc(docRef, dataToSave);
        } else {
            console.log("saveTrainingDetails: Training existiert nicht, erstelle neu.");
            await setDoc(docRef, dataToSave);
        }
        console.log("saveTrainingDetails: Trainingsdetails erfolgreich gespeichert.");
        showModal("Gespeichert", "Trainingsdetails wurden gespeichert!", [{text: 'OK', class: 'bg-green-500', onClick: () => callbacks.goBack()}]);
    } catch(error) {
        console.error("saveTrainingDetails: FEHLER beim Speichern der Trainingsdetails:", error);
        if (error.code === 'permission-denied') {
            showModal("Fehler: Zugriff verweigert", "Sie haben keine Berechtigung, Trainingsdetails zu speichern. Bitte überprüfen Sie die Firebase-Sicherheitsregeln.", [{text: 'OK', class: 'bg-red-500'}]);
        } else {
            showModal("Fehler", `Fehler beim Speichern der Trainingsdetails: ${error.message || 'Unbekannter Fehler'}. Details in der Konsole.`, [{text: 'OK', class: 'bg-red-500'}]);
        }
    }
};


export const toggleTrainingCancellation = async (datumString) => {
    console.log("toggleTrainingCancellation: Funktion aufgerufen. Datum:", datumString);
    const trainingCollection = collection(db, `artifacts/${appId}/public/data/trainingseinheiten`);
    const training = state.trainingseinheiten.find(t => t.id === datumString);
    if (!training) {
        console.warn("toggleTrainingCancellation: Training nicht gefunden für Datum:", datumString);
        return;
    }
    const newCancelledState = !training.cancelled;
    const actionText = newCancelledState ? 'abgesagt' : 'reaktiviert';
    const docRef = doc(trainingCollection, datumString);
    try {
        console.log(`toggleTrainingCancellation: Setze cancelled auf ${newCancelledState} für Training ${datumString}`);
        await updateDoc(docRef, {
            cancelled: newCancelledState
        });
        console.log(`toggleTrainingCancellation: Training erfolgreich ${actionText}.`);
        showModal("Erfolg", `Training wurde erfolgreich ${actionText}.`, [{text: 'OK', class: 'bg-green-500'}]);
    } catch (error) {
        console.error(`toggleTrainingCancellation: FEHLER beim ${actionText} des Trainings:`, error);
        if (error.code === 'permission-denied') {
            showModal("Fehler: Zugriff verweigert", `Sie haben keine Berechtigung, das Training zu ${actionText}. Bitte überprüfen Sie die Firebase-Sicherheitsregeln.`, [{text: 'OK', class: 'bg-red-500'}]);
        } else {
            showModal("Fehler", `Das Training konnte nicht ${actionText} werden: ${error.message || 'Unbekannter Fehler'}. Details in der Konsole.`, [{text: 'OK', class: 'bg-red-500'}]);
        }
    }
};

export const deleteTraining = async (datumString, callbacks) => {
    console.log("deleteTraining: Funktion aufgerufen. Datum:", datumString);
    const trainingCollection = collection(db, `artifacts/${appId}/public/data/trainingseinheiten`);
    showModal(
        "Training löschen?",
        "Möchten Sie diesen Trainingstag wirklich löschen?",
        [
            { text: 'Abbrechen', class: 'bg-gray-500' },
            { text: 'Ja, löschen', class: 'bg-red-600', onClick: async () => {
                try {
                    console.log("deleteTraining: Lösche Dokument mit Datum:", datumString);
                    await deleteDoc(doc(trainingCollection, datumString));
                    console.log("deleteTraining: Trainingstag erfolgreich gelöscht.");
                    showModal("Gelöscht", "Trainingstag wurde gelöscht.", [{text: 'OK', class: 'bg-blue-500', onClick: () => callbacks.navigateTo('home', null, true)}]);
                } catch (error) {
                    console.error("deleteTraining: FEHLER beim Löschen:", error);
                    if (error.code === 'permission-denied') {
                        showModal("Fehler: Zugriff verweigert", "Sie haben keine Berechtigung, diesen Trainingstag zu löschen. Bitte überprüfen Sie die Firebase-Sicherheitsregeln.", [{text: 'OK', class: 'bg-red-500'}]);
                    } else {
                        showModal("Fehler", `Fehler beim Löschen des Trainingstags: ${error.message || 'Unbekannter Fehler'}. Details in der Konsole.`, [{text: 'OK', class: 'bg-red-500'}]);
                    }
                }
            }}
        ]
    );
};

export const saveMatchtag = async(datumString, data, callbacks) => {
    console.log("saveMatchtag: Funktion aufgerufen. Datum:", datumString);
    console.log("saveMatchtag: Daten:", JSON.stringify(data));
    const matchtageCollection = collection(db, `artifacts/${appId}/public/data/spieltage`);
    const docRef = doc(matchtageCollection, datumString);
    showModal("Speichern...", '<div class="animate-pulse">Matchdaten werden gespeichert...</div>', []);
    try {
        const docSnap = await getDoc(docRef);
        // Ensure 'time' field is included in the data being saved
        const dataToSave = {
            gegner: data.gegner,
            spielort: data.spielort,
            toreHeim: data.toreHeim,
            toreAuswaerts: data.toreAuswaerts,
            spielArt: data.spielArt,
            time: data.time || null // Add the time field
        };

        if (docSnap.exists()) {
            console.log("saveMatchtag: Matchtag existiert, aktualisiere.");
            await updateDoc(docRef, dataToSave);
        } else {
            console.log("saveMatchtag: Matchtag existiert nicht, erstelle neu.");
            await setDoc(docRef, dataToSave);
        }
        console.log("saveMatchtag: Matchdaten erfolgreich gespeichert.");
        showModal("Gespeichert", "Matchdaten wurden gespeichert!", [{text: 'OK', class: 'bg-green-500', onClick: () => callbacks.goBack()}]);
    } catch(error) {
        console.error("saveMatchtag: FEHLER beim Speichern des Matchtags:", error);
        if (error.code === 'permission-denied') {
            showModal("Fehler: Zugriff verweigert", "Sie haben keine Berechtigung, Matchdaten zu speichern. Bitte überprüfen Sie die Firebase-Sicherheitsregeln.", [{text: 'OK', class: 'bg-red-500'}]);
        } else {
            showModal("Fehler", `Fehler beim Speichern des Matchtags: ${error.message || 'Unbekannter Fehler'}. Details in der Konsole.`, [{text: 'OK', class: 'bg-red-500'}]);
        }
    }
};

export const updateSpielerMatchDetails = async (datumString, spielerId, field, value) => {
    console.log(`updateSpielerMatchDetails: Datum: ${datumString}, Spieler: ${spielerId}, Feld: ${field}, Wert: ${value}`);
    const matchtageCollection = collection(db, `artifacts/${appId}/public/data/spieltage`);
    const docRef = doc(matchtageCollection, datumString);
    const key = `aufstellung.${spielerId}.${field}`;
    if(field === 'spielminuten' || field === 'tore' || field === 'vorlagen') {
        value = value === '' ? null : parseInt(value);
    }
    try {
        const docSnap = await getDoc(docRef);
        if (!docSnap.exists()) {
            console.log("updateSpielerMatchDetails: Matchtag-Dokument existiert nicht, erstelle es mit Aufstellung.");
            await setDoc(docRef, { aufstellung: { [spielerId]: { [field]: value } } });
        } else {
            console.log("updateSpielerMatchDetails: Matchtag-Dokument existiert, aktualisiere Feld.");
            await updateDoc(docRef, { [key]: value });
        }
        console.log("updateSpielerMatchDetails: Spieler Match Details erfolgreich aktualisiert.");
    } catch (error) {
        console.error("updateSpielerMatchDetails: FEHLER beim Update der Aufstellung:", error);
        if (error.code === 'permission-denied') {
            showModal("Fehler: Zugriff verweigert", "Sie haben keine Berechtigung, Spielerdetails im Match zu aktualisieren. Bitte überprüfen Sie die Firebase-Sicherheitsregeln.", [{text: 'OK', class: 'bg-red-500'}]);
        } else {
            showModal("Fehler", `Fehler beim Update der Aufstellung: ${error.message || 'Unbekannter Fehler'}. Details in der Konsole.`, [{text: 'OK', class: 'bg-red-500'}]);
        }
    }
};

export const toggleMatchCancellation = async (datumString) => {
    console.log("toggleMatchCancellation: Funktion aufgerufen. Datum:", datumString);
    const matchtageCollection = collection(db, `artifacts/${appId}/public/data/spieltage`);
    const matchtag = state.matchtage.find(s => s.id === datumString);
    if (!matchtag) {
        console.warn("toggleMatchCancellation: Matchtag nicht gefunden für Datum:", datumString);
        return;
    }
    const newCancelledState = !matchtag.cancelled;
    const actionText = newCancelledState ? 'abgesagt' : 'reaktiviert';
    const docRef = doc(matchtageCollection, datumString);
    try {
        console.log(`toggleMatchCancellation: Setze cancelled auf ${newCancelledState} für Matchtag ${datumString}`);
        await updateDoc(docRef, {
            cancelled: newCancelledState
        });
        console.log(`toggleMatchCancellation: Match erfolgreich ${actionText}.`);
        showModal("Erfolg", `Match wurde erfolgreich ${actionText}.`, [{text: 'OK', class: 'bg-green-500'}]);
    } catch (error) {
        console.error(`toggleMatchCancellation: FEHLER beim ${actionText} des Matchs:`, error);
        if (error.code === 'permission-denied') {
            showModal("Fehler: Zugriff verweigert", `Sie haben keine Berechtigung, das Match zu ${actionText}. Bitte überprüfen Sie die Firebase-Sicherheitsregeln.`, [{text: 'OK', class: 'bg-red-500'}]);
        } else {
            showModal("Fehler", `Das Match konnte nicht ${actionText} werden: ${error.message || 'Unbekannter Fehler'}. Details in der Konsole.`, [{text: 'OK', class: 'bg-red-500'}]);
        }
    }
};

export const deleteMatchtag = async (datumString, callbacks) => {
    console.log("deleteMatchtag: Funktion aufgerufen. Datum:", datumString);
    const matchtageCollection = collection(db, `artifacts/${appId}/public/data/spieltage`);
    showModal(
        "Matchtag löschen?",
        "Möchten Sie diesen Matchtag wirklich löschen?",
        [
            { text: 'Abbrechen', class: 'bg-gray-500' },
            { text: 'Ja, löschen', class: 'bg-red-600', onClick: async () => {
                try {
                    console.log("deleteMatchtag: Lösche Dokument mit Datum:", datumString);
                    await deleteDoc(doc(matchtageCollection, datumString));
                    console.log("deleteMatchtag: Matchtag erfolgreich gelöscht.");
                    showModal("Gelöscht", "Matchtag wurde gelöscht.", [{text: 'OK', class: 'bg-blue-500', onClick: () => callbacks.navigateTo('home', null, true)}]);
                } catch (error) {
                    console.error("deleteMatchtag: FEHLER beim Löschen:", error);
                    if (error.code === 'permission-denied') {
                        showModal("Fehler: Zugriff verweigert", "Sie haben keine Berechtigung, diesen Matchtag zu löschen. Bitte überprüfen Sie die Firebase-Sicherheitsregeln.", [{text: 'OK', class: 'bg-red-500'}]);
                    } else {
                        showModal("Fehler", `Fehler beim Löschen des Matchtags: ${error.message || 'Unbekannter Fehler'}. Details in der Konsole.`, [{text: 'OK', class: 'bg-red-500'}]);
                    }
                }
            }}
        ]
    );
};


export const saveTrainingSchedule = async (form, callbacks) => {
    console.log("saveTrainingSchedule: Funktion aufgerufen.");
    const configDoc = doc(db, `artifacts/${appId}/public/data/config/team`);
    const trainingCollection = collection(db, `artifacts/${appId}/public/data/trainingseinheiten`);
    showModal("Speichern...", '<div class="animate-pulse">Trainingsplan wird gespeichert...</div>', []);
    const formData = new FormData(form);
    const trainingSchedule = {};
    const checkedDays = formData.getAll('wochentag');
    checkedDays.forEach(tag => {
        const time = formData.get(`zeit_${tag}`);
        if (time) {
            trainingSchedule[tag] = time;
        }
    });
    const trainingEndDate = formData.get('trainingEndDate');
    console.log("saveTrainingSchedule: Trainingsplan Daten:", JSON.stringify(trainingSchedule));
    console.log("saveTrainingSchedule: Trainingsende Datum:", trainingEndDate);

    try {
        await setDoc(configDoc, { trainingSchedule, trainingEndDate }, { merge: true });
        console.log("saveTrainingSchedule: Trainingsplan in Config gespeichert.");
        await generateRecurringTrainings(trainingSchedule, trainingEndDate, trainingCollection, db);
        console.log("saveTrainingSchedule: Wiederkehrende Trainings generiert.");
        showModal("Gespeichert", "Trainingsplan erfolgreich aktualisiert und Kalender wurde synchronisiert.", [{text: 'OK', class: 'bg-green-500'}]);
    } catch (error) {
        console.error("saveTrainingSchedule: FEHLER beim Speichern des Trainingsplans:", error);
        if (error.code === 'permission-denied') {
            showModal("Fehler: Zugriff verweigert", "Sie haben keine Berechtigung, den Trainingsplan zu speichern. Bitte überprüfen Sie die Firebase-Sicherheitsregeln.", [{text: 'OK', class: 'bg-red-500'}]);
        } else {
            showModal("Fehler", `Konnte Trainingsplan nicht speichern: ${error.message || 'Unbekannter Fehler'}. Details in der Konsole.`, [{text: 'OK', class: 'bg-red-500'}]);
        }
    }
};

export const generateRecurringTrainings = async (schedule, endDateString, trainingCollection, db) => {
    console.log("generateRecurringTrainings: Funktion aufgerufen.");
    if (!endDateString || Object.keys(schedule).length === 0) {
        console.log("generateRecurringTrainings: Kein Enddatum oder leerer Zeitplan, lösche autogenerierte Trainings.");
        const q_del = query(trainingCollection, where("autogenerated", "==", true));
        const querySnapshot_del = await getDocs(q_del);
        if (querySnapshot_del.empty) {
            console.log("generateRecurringTrainings: Keine autogenerierten Trainings zum Löschen gefunden.");
            return;
        }
        const batch_del = writeBatch(db);
        querySnapshot_del.forEach((doc) => {
            console.log("generateRecurringTrainings: Lösche autogeneriertes Training:", doc.id);
            batch_del.delete(doc.ref);
        });
        await batch_del.commit();
        console.log("generateRecurringTrainings: Autogenerierte Trainings gelöscht.");
        return;
    }
    console.log("generateRecurringTrainings: Lösche alte autogenerierte Trainings vor Neuerstellung.");
    const q = query(trainingCollection, where("autogenerated", "==", true));
    const querySnapshot = await getDocs(q);
    const batch = writeBatch(db);
    querySnapshot.forEach((doc) => {
        batch.delete(doc.ref);
    });
    await batch.commit();
    console.log("generateRecurringTrainings: Alte autogenerierte Trainings gelöscht. Beginne Neuerstellung.");

    const newBatch = writeBatch(db);
    const startDate = new Date();
    startDate.setHours(0,0,0,0);
    const endDate = new Date(endDateString);
    endDate.setHours(0,0,0,0);
    const dayMapping = { 0: 'Sonntag', 1: 'Montag', 2: 'Dienstag', 3: 'Mittwoch', 4: 'Donnerstag', 5: 'Freitag', 6: 'Samstag' };
    let currentDate = startDate;
    let trainingsAdded = 0;
    while (currentDate <= endDate) {
        const dayName = dayMapping[currentDate.getDay()];
        if (schedule[dayName]) {
            const dateStr = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}`;
            const docRef = doc(trainingCollection, dateStr);
            const trainingData = {
                teilnehmer: {},
                autogenerated: true,
                time: schedule[dayName]
            };
            newBatch.set(docRef, trainingData, { merge: true });
            trainingsAdded++;
        }
        currentDate.setDate(currentDate.getDate() + 1);
    }
    await newBatch.commit();
    console.log(`generateRecurringTrainings: ${trainingsAdded} neue Trainings generiert und gespeichert.`);
};

export const exportData = (dataType) => {
    console.log(`exportData: Funktion aufgerufen für Daten-Typ: ${dataType}`);
    let dataToExport = {};

    switch (dataType) {
        case 'spieler':
            dataToExport = { spieler: state.spieler };
            break;
        case 'training':
            dataToExport = { trainingseinheiten: state.trainingseinheiten };
            break;
        case 'matchtage':
            dataToExport = { matchtage: state.matchtage };
            break;
        case 'all':
        default:
            dataToExport = {
                teamInfo: state.teamInfo,
                spieler: state.spieler,
                trainingseinheiten: state.trainingseinheiten,
                matchtage: state.matchtage
            };
            break;
    }

    const jsonString = JSON.stringify(dataToExport, null, 2);
    const blob = new Blob([jsonString], {type: "application/json"});
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `trainer-app-backup-${dataType}-${new Date().toISOString().slice(0,10)}.json`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    console.log("exportData: Datenexport initiiert.");
    closeModal();
};

export const importJSONData = async (jsonString, callbacks) => {
    console.log("importJSONData: Funktion aufgerufen.");
    const spielerCollection = collection(db, `artifacts/${appId}/public/data/spieler`);
    const trainingCollection = collection(db, `artifacts/${appId}/public/data/trainingseinheiten`);
    const matchtageCollection = collection(db, `artifacts/${appId}/public/data/spieltage`);
    const configDoc = doc(db, `artifacts/${appId}/public/data/config/team`);
    showModal("Importieren...", '<div class="animate-pulse">Daten werden importiert...</div>', []);
    try {
        const importedData = JSON.parse(jsonString);
        console.log("importJSONData: Importierte Daten geparst.");
        const batch = writeBatch(db);
        if (importedData.teamInfo) {
            console.log("importJSONData: Importiere Team-Info.");
            batch.set(configDoc, importedData.teamInfo, { merge: true });
        }
        if (importedData.spieler && Array.isArray(importedData.spieler)) {
            console.log(`importJSONData: Importiere ${importedData.spieler.length} Spieler.`);
            for (const player of importedData.spieler) {
                const docRef = player.id ? doc(spielerCollection, player.id) : doc(spielerCollection);
                const { id, ...data } = player;
                batch.set(docRef, data, { merge: true });
            }
        }
        if (importedData.trainingseinheiten && Array.isArray(importedData.trainingseinheiten)) {
            console.log(`importJSONData: Importiere ${importedData.trainingseinheiten.length} Trainingseinheiten.`);
            for (const training of importedData.trainingseinheiten) {
                const docRef = doc(trainingCollection, training.id);
                const { id, ...data } = training;
                batch.set(docRef, data, { merge: true });
            }
        }
        const matchData = importedData.matchtage || importedData.spieltage;
        if (matchData && Array.isArray(matchData)) {
            console.log(`importJSONData: Importiere ${matchData.length} Matchtage.`);
            for (const matchtag of matchData) {
                const docRef = doc(matchtageCollection, matchtag.id);
                const { id, ...data } = matchtag;
                batch.set(docRef, data, { merge: true });
            }
        }
        await batch.commit();
        console.log("importJSONData: Batch-Import abgeschlossen.");
        showModal("Import abgeschlossen", "Daten erfolgreich importiert!", [{text: 'OK', class: 'bg-blue-500'}]);
    } catch (error) {
        console.error("importJSONData: FEHLER beim Import der Daten:", error);
        if (error.code === 'permission-denied') {
            showModal("Fehler: Zugriff verweigert", "Sie haben keine Berechtigung, Daten zu importieren. Bitte überprüfen Sie die Firebase-Sicherheitsregeln.", [{text: 'OK', class: 'bg-red-500'}]);
        } else {
            showModal("Importfehler", `Ein Fehler ist beim Importieren der Daten aufgetreten: ${error.message || 'Unbekannter Fehler'}. Stellen Sie sicher, dass es sich um eine gültige JSON-Datei handelt. Details in der Konsole.`, [{text: 'OK', class: 'bg-red-500'}]);
        }
    }
};

export const deleteAllData = async (callbacks) => {
    console.log("deleteAllData: Funktion aufgerufen.");
    const spielerCollection = collection(db, `artifacts/${appId}/public/data/spieler`);
    const trainingCollection = collection(db, `artifacts/${appId}/public/data/trainingseinheiten`);
    const matchtageCollection = collection(db, `artifacts/${appId}/public/data/spieltage`);
    const configDoc = doc(db, `artifacts/${appId}/public/data/config/team`);
    
    showModal("Löschen...", '<div class="animate-pulse">Alle Daten werden gelöscht...</div>', []);

    try {
        const collections = [spielerCollection, trainingCollection, matchtageCollection];
        for (const col of collections) {
            console.log("deleteAllData: Lösche Sammlung:", col.path);
            const snapshot = await getDocs(col);
            const batch = writeBatch(db);
            snapshot.docs.forEach(doc => batch.delete(doc.ref));
            await batch.commit();
            console.log(`deleteAllData: Sammlung ${col.path} gelöscht.`);
        }
        console.log("deleteAllData: Lösche Konfigurationsdokument:", configDoc.path);
        await deleteDoc(configDoc);
        console.log("deleteAllData: Alle Daten erfolgreich gelöscht.");
        showModal("Gelöscht", "Alle Daten wurden gelöscht.", [{text: 'OK', class: 'bg-blue-500'}]);
    } catch (error) {
        console.error("deleteAllData: FEHLER beim Löschen aller Daten:", error);
        if (error.code === 'permission-denied') {
            showModal("Fehler: Zugriff verweigert", "Sie haben keine Berechtigung, alle Daten zu löschen. Bitte überprüfen Sie die Firebase-Sicherheitsregeln.", [{text: 'OK', class: 'bg-red-500'}]);
        } else {
            showModal("Fehler", `Fehler beim Löschen aller Daten: ${error.message || 'Unbekannter Fehler'}. Details in der Konsole.`, [{text: 'OK', class: 'bg-red-500'}]);
        }
    }
};

export const deleteCollectionData = async (collectionRef, collectionName, callbacks) => {
    console.log(`deleteCollectionData: Funktion aufgerufen. Sammlung: ${collectionName}`);
    showModal("Löschen...", `<div class="animate-pulse">${collectionName} werden gelöscht...</div>`, []);
    try {
        const snapshot = await getDocs(collectionRef);
        const batch = writeBatch(db);
        console.log(`deleteCollectionData: ${snapshot.docs.length} Dokumente in ${collectionName} zum Löschen gefunden.`);
        snapshot.docs.forEach(doc => batch.delete(doc.ref));
        await batch.commit();
        console.log(`deleteCollectionData: ${collectionName} erfolgreich gelöscht.`);
        showModal("Gelöscht", `${collectionName} wurden gelöscht.`, [{text: 'OK', class: 'bg-blue-500'}]);
    } catch (error) {
        console.error(`deleteCollectionData: FEHLER beim Löschen von ${collectionName}:`, error);
        if (error.code === 'permission-denied') {
            showModal("Fehler: Zugriff verweigert", `Sie haben keine Berechtigung, ${collectionName} zu löschen. Bitte überprüfen Sie die Firebase-Sicherheitsregeln.`, [{text: 'OK', class: 'bg-red-500'}]);
        } else {
            showModal("Fehler", `Fehler beim Löschen von ${collectionName}: ${error.message || 'Unbekannter Fehler'}. Details in der Konsole.`, [{text: 'OK', class: 'bg-red-500'}]);
        }
    }
};

export const deleteMannschaftInfo = async (callbacks) => {
    console.log("deleteMannschaftInfo: Funktion aufgerufen.");
    showModal("Löschen...", '<div class="animate-pulse">Mannschaftsinfo wird gelöscht...</div>', []);
    const configDoc = doc(db, `artifacts/${appId}/public/data/config/team`);
    try {
        await deleteDoc(configDoc);
        console.log("deleteMannschaftInfo: Mannschaftsinfo erfolgreich gelöscht.");
        showModal("Gelöscht", "Die Mannschaftsinfo wurde gelöscht.", [{text: 'OK', class: 'bg-blue-500'}]);
    } catch (error) {
        console.error("deleteMannschaftInfo: FEHLER beim Löschen der Mannschaftsinfo:", error);
        if (error.code === 'permission-denied') {
            showModal("Fehler: Zugriff verweigert", "Sie haben keine Berechtigung, die Mannschaftsinfo zu löschen. Bitte überprüfen Sie die Firebase-Sicherheitsregeln.", [{text: 'OK', class: 'bg-red-500'}]);
        } else {
            showModal("Fehler", `Fehler beim Löschen der Mannschaftsinfo: ${error.message || 'Unbekannter Fehler'}. Details in der Konsole.`, [{text: 'OK', class: 'bg-red-500'}]);
        }
    }
};

export const saveFormation = async (matchtagId, formationData) => {
    console.log("saveFormation: Funktion aufgerufen. Matchtag ID:", matchtagId);
    console.log("saveFormation: Formationsdaten:", JSON.stringify(formationData));
    const matchtageCollection = collection(db, `artifacts/${appId}/public/data/spieltage`);
    const docRef = doc(matchtageCollection, matchtagId);
    const updates = {};
    const currentMatchtag = state.matchtage.find(s => s.id === matchtagId);
    state.spieler.forEach(player => {
        const playerId = player.id;
        const currentPos = currentMatchtag?.aufstellung?.[playerId]?.position;
        const currentPosX = currentMatchtag?.aufstellung?.[playerId]?.posX;
        const currentPosY = currentMatchtag?.aufstellung?.[playerId]?.posY;
        const newFormationData = formationData[playerId];

        if (newFormationData && newFormationData.posX !== null && newFormationData.posY !== null) {
            updates[`aufstellung.${playerId}.posX`] = newFormationData.posX;
            updates[`aufstellung.${playerId}.posY`] = newFormationData.posY;
            if (currentPos !== 'Startelf' && currentPos !== 'Ersatzbank') {
                updates[`aufstellung.${playerId}.position`] = 'Startelf';
            }
            console.log(`saveFormation: Spieler ${playerId} auf Feld gesetzt: posX=${newFormationData.posX}, posY=${newFormationData.posY}`);
        } else {
            if (currentPos === 'Startelf' || currentPos === 'Ersatzbank' || currentPosX !== null || currentPosY !== null) {
                updates[`aufstellung.${playerId}.position`] = 'Nicht dabei';
                updates[`aufstellung.${playerId}.posX`] = null;
                updates[`aufstellung.${playerId}.posY`] = null;
                console.log(`saveFormation: Spieler ${playerId} von Startelf/Bank entfernt oder Position auf null gesetzt.`);
            }
        }
    });
    try {
        console.log("saveFormation: Aktualisiere Dokument mit Updates:", JSON.stringify(updates));
        await updateDoc(docRef, updates);
        console.log("saveFormation: Formation erfolgreich gespeichert.");
    } catch (error) {
        console.error("saveFormation: FEHLER beim Aktualisieren der Formation in Firestore:", error);
        if (error.code === 'permission-denied') {
            showModal("Fehler: Zugriff verweigert", "Sie haben keine Berechtigung, die Formation zu speichern. Bitte überprüfen Sie die Firebase-Sicherheitsregeln.", [{text: 'OK', class: 'bg-red-500'}]);
        } else {
            showModal("Fehler", `Fehler beim Speichern der Formation: ${error.message || 'Unbekannter Fehler'}. Details in der Konsole.`, [{text: 'OK', class: 'bg-red-500'}]);
        }
        throw error;
    }
};
