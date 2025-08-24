import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { getFirestore, collection, doc, addDoc, setDoc, deleteDoc, updateDoc, query, getDoc, where, getDocs, writeBatch, setLogLevel } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
import { state } from './state.js';
import { showModal, closeModal } from './modals.js';

export const APP_VERSION = `Version 2025-08-24-003 B2-Storage`;
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

async function uploadFileToB2(file) {
    if (!file || file.size === 0) return null;
    const uploadUrl = '/api/upload';
    try {
        const response = await fetch(uploadUrl, {
            method: 'POST',
            headers: {
                'Content-Type': file.type,
                'x-file-name': file.name
            },
            body: file
        });
        const result = await response.json();
        if (!response.ok) throw new Error(result.message || 'Upload fehlgeschlagen');
        return result.url;
    } catch (error) {
        console.error("Fehler beim Upload zu B2 via Serverless Function:", error);
        showModal("Upload Fehler", `Die Datei konnte nicht hochgeladen werden: ${error.message}`, [{text: 'OK', class: 'bg-red-500'}]);
        return null;
    }
}

export const saveSpieler = async (data, id, file, callbacks) => {
    showModal("Speichern...", '<div class="animate-pulse">Spielerdaten werden verarbeitet...</div>', []);
    try {
        if (file && file.size > 0) {
            const newFotoUrl = await uploadFileToB2(file);
            if (newFotoUrl) {
                data.fotoUrl = newFotoUrl;
            } else {
                throw new Error("Spielerfoto konnte nicht hochgeladen werden.");
            }
        }
        const spielerCollection = collection(db, `artifacts/${appId}/public/data/spieler`);
        if (id) {
            await updateDoc(doc(spielerCollection, id), data);
            showModal("Erfolg", "Spieler erfolgreich aktualisiert!", [{text: 'OK', class: 'bg-green-500', onClick: () => callbacks.goBack()}]);
        } else {
            await addDoc(spielerCollection, data);
            showModal("Erfolg", "Spieler erfolgreich hinzugefügt!", [{text: 'OK', class: 'bg-green-500', onClick: () => callbacks.navigateTo('spielerUebersicht', null, true)}]);
        }
    } catch (error) {
        console.error("saveSpieler: FEHLER beim Speichern:", error);
        showModal("Fehler", `Fehler beim Speichern des Spielers: ${error.message || 'Unbekannter Fehler'}.`, [{text: 'OK', class: 'bg-red-500'}]);
    }
};

export const saveMannschaftInfo = async (form, callbacks) => {
    showModal("Speichern...", '<div class="animate-pulse">Mannschaftsinfo wird gespeichert...</div>', []);
    const formData = new FormData(form);
    const teamData = {
        name: formData.get('name'),
        name2: formData.get('name2'),
    };
    const file = formData.get('emblem');
    try {
        if (file && file.size > 0) {
            const newEmblemUrl = await uploadFileToB2(file);
            if (newEmblemUrl) {
                teamData.emblemUrl = newEmblemUrl;
            } else {
                throw new Error("Vereinsemblem konnte nicht hochgeladen werden.");
            }
        }
        const configDoc = doc(db, `artifacts/${appId}/public/data/config/team`);
        await setDoc(configDoc, teamData, { merge: true });
        showModal("Gespeichert", "Mannschaftsinfo erfolgreich aktualisiert.", [{text: 'OK', class: 'bg-green-500'}]);
    } catch (error) {
        console.error("saveMannschaftInfo: FEHLER beim Speichern der Mannschaftsinfo:", error);
        showModal("Fehler", `Konnte Mannschaftsinfo nicht speichern: ${error.message || 'Unbekannter Fehler'}.`, [{text: 'OK', class: 'bg-red-500'}]);
    }
};

export const deleteSpieler = async (id, callbacks) => {
    const spielerCollection = collection(db, `artifacts/${appId}/public/data/spieler`);
    showModal(
        "Spieler löschen?",
        "Möchten Sie diesen Spieler wirklich endgültig löschen?",
        [
            { text: 'Abbrechen', class: 'bg-gray-500' },
            { text: 'Ja, löschen', class: 'bg-red-600', onClick: async () => {
                try {
                    await deleteDoc(doc(spielerCollection, id));
                    showModal("Gelöscht", "Spieler wurde gelöscht.", [{text: 'OK', class: 'bg-blue-500', onClick: () => callbacks.navigateTo('spielerUebersicht', null, true)}]);
                } catch (error) {
                    showModal("Fehler", `Fehler beim Löschen des Spielers: ${error.message || 'Unbekannter Fehler'}.`, [{text: 'OK', class: 'bg-red-500'}]);
                }
            }}
        ]
    );
};

export const setAnwesenheit = async (datumString, spielerId, status) => {
    const trainingCollection = collection(db, `artifacts/${appId}/public/data/trainingseinheiten`);
    const docRef = doc(trainingCollection, datumString);
    try {
        const docSnap = await getDoc(docRef);
        if (!docSnap.exists()) {
            await setDoc(docRef, { teilnehmer: { [spielerId]: status } });
        } else {
            await updateDoc(docRef, {
                [`teilnehmer.${spielerId}`]: status
            });
        }
    } catch (error) {
        console.error("setAnwesenheit: FEHLER beim Setzen der Anwesenheit:", error);
        showModal("Fehler", `Fehler beim Speichern der Anwesenheit: ${error.message || 'Unbekannter Fehler'}.`, [{text: 'OK', class: 'bg-red-500'}]);
    }
};

export const saveTrainingDetails = async (datumString, data, callbacks) => {
    const trainingCollection = collection(db, `artifacts/${appId}/public/data/trainingseinheiten`);
    const docRef = doc(trainingCollection, datumString);
    showModal("Speichern...", '<div class="animate-pulse">Trainingsdetails werden gespeichert...</div>', []);
    try {
        const docSnap = await getDoc(docRef);
        const dataToSave = { time: data.time || null };
        if (docSnap.exists()) {
            await updateDoc(docRef, dataToSave);
        } else {
            await setDoc(docRef, dataToSave);
        }
        showModal("Gespeichert", "Trainingsdetails wurden gespeichert!", [{text: 'OK', class: 'bg-green-500', onClick: () => callbacks.goBack()}]);
    } catch(error) {
        showModal("Fehler", `Fehler beim Speichern der Trainingsdetails: ${error.message || 'Unbekannter Fehler'}.`, [{text: 'OK', class: 'bg-red-500'}]);
    }
};
