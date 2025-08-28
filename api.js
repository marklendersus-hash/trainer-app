import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { getFirestore, collection, doc, addDoc, setDoc, deleteDoc, updateDoc, query, getDoc, where, getDocs, writeBatch, setLogLevel } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
import { state } from './state.js';
import { firebaseConfig } from './config.js';

export const APP_VERSION = `Version 2025-08-28-1028`;
export const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
setLogLevel('debug');

// Wandelt eine Datei in einen Base64-String um, der in der Datenbank gespeichert werden kann.
const fileToBase64 = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});

export const saveSpieler = async (data, id, file, callbacks) => {
    callbacks.showModal("Speichern...", '<div class="animate-pulse">Spielerdaten werden verarbeitet...</div>', []);
    try {
        const spielerCollection = collection(db, `artifacts/${appId}/public/data/spieler`);

        if (file && file.size > 0) {
            // Bild direkt als Base64-String speichern
            data.fotoUrl = await fileToBase64(file);
        }

        if (id) {
            await updateDoc(doc(spielerCollection, id), data);
            callbacks.showModal("Erfolg", "Spieler erfolgreich aktualisiert!", [{text: 'OK', class: 'bg-green-500', onClick: () => callbacks.goBack()}]);
        } else {
            await addDoc(spielerCollection, data);
            callbacks.showModal("Erfolg", "Spieler erfolgreich hinzugefügt!", [{text: 'OK', class: 'bg-green-500', onClick: () => callbacks.navigateTo('spielerUebersicht', null, true)}]);
        }
    } catch (error) {
        console.error("saveSpieler: FEHLER beim Speichern:", error);
        callbacks.showModal("Fehler", `Fehler beim Speichern des Spielers: ${error.message || 'Unbekannter Fehler'}.`, [{text: 'OK', class: 'bg-red-500'}]);
    }
};

export const saveMannschaftInfo = async (form, wasMarkedForDeletion, callbacks) => {
    callbacks.showModal("Speichern...", '<div class="animate-pulse">Mannschaftsinfo wird gespeichert...</div>', []);
    const formData = new FormData(form);
    const teamData = {
        name: formData.get('name'),
        name2: formData.get('name2'),
        emblemUrl: state.teamInfo.emblemUrl || null
    };
    const file = formData.get('emblem');
    try {
        const configDoc = doc(db, `artifacts/${appId}/public/data/config/team`);

        if (file && file.size > 0) {
            teamData.emblemUrl = await fileToBase64(file);
        } else if (wasMarkedForDeletion) {
            teamData.emblemUrl = null;
        }
        
        await setDoc(configDoc, teamData, { merge: true });
        callbacks.showModal("Gespeichert", "Mannschaftsinfo erfolgreich aktualisiert.", [{text: 'OK', class: 'bg-green-500'}]);
    } catch (error) {
        console.error("saveMannschaftInfo: FEHLER beim Speichern der Mannschaftsinfo:", error);
        callbacks.showModal("Fehler", `Konnte Mannschaftsinfo nicht speichern: ${error.message || 'Unbekannter Fehler'}.`, [{text: 'OK', class: 'bg-red-500'}]);
    }
};

export const deleteSpieler = async (id, callbacks) => {
    const spielerCollection = collection(db, `artifacts/${appId}/public/data/spieler`);
    const spielerDocRef = doc(spielerCollection, id);
    callbacks.showModal(
        "Spieler löschen?",
        "Möchten Sie diesen Spieler wirklich endgültig löschen?",
        [
            { text: 'Abbrechen', class: 'bg-gray-500' },
            { text: 'Ja, löschen', class: 'bg-red-600', onClick: async () => {
                try {
                    await deleteDoc(spielerDocRef);
                    callbacks.showModal("Gelöscht", "Spieler wurde gelöscht.", [{text: 'OK', class: 'bg-blue-500', onClick: () => callbacks.navigateTo('spielerUebersicht', null, true)}]);
                } catch (error) {
                    callbacks.showModal("Fehler", `Fehler beim Löschen des Spielers: ${error.message || 'Unbekannter Fehler'}.`, [{text: 'OK', class: 'bg-red-500'}]);
                }
            }}
        ]
    );
};

export const deleteSpielerFoto = async (spielerId, callbacks) => {
    callbacks.showModal(
        "Spielerfoto löschen?",
        "Möchten Sie das Spielerfoto wirklich löschen? Das Foto wird sofort entfernt und kann nicht wiederhergestellt werden.",
        [
            { text: 'Abbrechen', class: 'bg-gray-500' },
            { 
                text: 'Ja, löschen', 
                class: 'bg-red-600', 
                onClick: async () => {
                    callbacks.showModal("Löschen...", '<div class="animate-pulse">Foto wird gelöscht...</div>', []);
                    const spielerDoc = doc(db, `artifacts/${appId}/public/data/spieler`, spielerId);
                    try {
                        await updateDoc(spielerDoc, {
                            fotoUrl: null 
                        });
                        callbacks.showModal("Gelöscht", "Das Spielerfoto wurde entfernt.", [{text: 'OK', class: 'bg-blue-500'}]);
                    } catch (error) {
                        callbacks.showModal("Fehler", `Fehler beim Löschen des Fotos: ${error.message || 'Unbekannter Fehler'}.`, [{text: 'OK', class: 'bg-red-500'}]);
                    }
                }
            }
        ]
    );
};

export const setAnwesenheit = async (datumString, spielerId, status, callbacks) => {
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
        callbacks.showModal("Fehler", `Fehler beim Speichern der Anwesenheit: ${error.message || 'Unbekannter Fehler'}.`, [{text: 'OK', class: 'bg-red-500'}]);
    }
};

export const saveTrainingDetails = async (datumString, data, callbacks) => {
    const trainingCollection = collection(db, `artifacts/${appId}/public/data/trainingseinheiten`);
    const docRef = doc(trainingCollection, datumString);
    callbacks.showModal("Speichern...", '<div class="animate-pulse">Trainingsdetails werden gespeichert...</div>', []);
    try {
        const docSnap = await getDoc(docRef);
        const dataToSave = { time: data.time || null };
        if (docSnap.exists()) {
            await updateDoc(docRef, dataToSave);
        } else {
            await setDoc(docRef, dataToSave);
        }
        callbacks.showModal("Gespeichert", "Trainingsdetails wurden gespeichert!", [{text: 'OK', class: 'bg-green-500', onClick: () => callbacks.goBack()}]);
    } catch(error) {
        callbacks.showModal("Fehler", `Fehler beim Speichern der Trainingsdetails: ${error.message || 'Unbekannter Fehler'}.`, [{text: 'OK', class: 'bg-red-500'}]);
    }
};

export const toggleTrainingCancellation = async (datumString, callbacks) => {
    const trainingCollection = collection(db, `artifacts/${appId}/public/data/trainingseinheiten`);
    const training = state.trainingseinheiten.find(t => t.id === datumString);
    if (!training) return;
    const newCancelledState = !training.cancelled;
    const actionText = newCancelledState ? 'abgesagt' : 'reaktiviert';
    const docRef = doc(trainingCollection, datumString);
    try {
        await updateDoc(docRef, { cancelled: newCancelledState });
        callbacks.showModal("Erfolg", `Training wurde erfolgreich ${actionText}.`, [{text: 'OK', class: 'bg-green-500'}]);
    } catch (error) {
        callbacks.showModal("Fehler", `Das Training konnte nicht ${actionText} werden: ${error.message || 'Unbekannter Fehler'}.`, [{text: 'OK', class: 'bg-red-500'}]);
    }
};

export const deleteTraining = async (datumString, callbacks) => {
    const trainingCollection = collection(db, `artifacts/${appId}/public/data/trainingseinheiten`);
    callbacks.showModal(
        "Training löschen?",
        "Möchten Sie diesen Trainingstag wirklich löschen?",
        [
            { text: 'Abbrechen', class: 'bg-gray-500' },
            { text: 'Ja, löschen', class: 'bg-red-600', onClick: async () => {
                try {
                    await deleteDoc(doc(trainingCollection, datumString));
                    callbacks.showModal("Gelöscht", "Trainingstag wurde gelöscht.", [{text: 'OK', class: 'bg-blue-500', onClick: () => callbacks.navigateTo('home', null, true)}]);
                } catch (error) {
                    callbacks.showModal("Fehler", `Fehler beim Löschen des Trainingstags: ${error.message || 'Unbekannter Fehler'}.`, [{text: 'OK', class: 'bg-red-500'}]);
                }
            }}
        ]
    );
};

export const saveMatchtag = async(datumString, data, callbacks) => {
    const matchtageCollection = collection(db, `artifacts/${appId}/public/data/spieltage`);
    const docRef = doc(matchtageCollection, datumString);
    callbacks.showModal("Speichern...", '<div class="animate-pulse">Matchdaten werden gespeichert...</div>', []);
    try {
        const docSnap = await getDoc(docRef);
        const dataToSave = {
            gegner: data.gegner,
            spielort: data.spielort,
            toreHeim: data.toreHeim,
            toreAuswaerts: data.toreAuswaerts,
            spielArt: data.spielArt,
            time: data.time || null
        };
        if (docSnap.exists()) {
            await updateDoc(docRef, dataToSave);
        } else {
            await setDoc(docRef, dataToSave);
        }
        callbacks.showModal("Gespeichert", "Matchdaten wurden gespeichert!", [{text: 'OK', class: 'bg-green-500', onClick: () => callbacks.goBack()}]);
    } catch(error) {
        callbacks.showModal("Fehler", `Fehler beim Speichern des Matchtags: ${error.message || 'Unbekannter Fehler'}.`, [{text: 'OK', class: 'bg-red-500'}]);
    }
};

export const updateSpielerMatchDetails = async (datumString, spielerId, field, value, callbacks) => {
    const matchtageCollection = collection(db, `artifacts/${appId}/public/data/spieltage`);
    const docRef = doc(matchtageCollection, datumString);
    const key = `aufstellung.${spielerId}.${field}`;
    if(field === 'spielminuten' || field === 'tore' || field === 'vorlagen') {
        value = value === '' ? null : parseInt(value);
    }
    try {
        const docSnap = await getDoc(docRef);
        if (!docSnap.exists()) {
            await setDoc(docRef, { aufstellung: { [spielerId]: { [field]: value } } });
        } else {
            await updateDoc(docRef, { [key]: value });
        }
    } catch (error) {
        callbacks.showModal("Fehler", `Fehler beim Update der Aufstellung: ${error.message || 'Unbekannter Fehler'}.`, [{text: 'OK', class: 'bg-red-500'}]);
    }
};

export const toggleMatchCancellation = async (datumString, callbacks) => {
    const matchtageCollection = collection(db, `artifacts/${appId}/public/data/spieltage`);
    const matchtag = state.matchtage.find(s => s.id === datumString);
    if (!matchtag) return;
    const newCancelledState = !matchtag.cancelled;
    const actionText = newCancelledState ? 'abgesagt' : 'reaktiviert';
    const docRef = doc(matchtageCollection, datumString);
    try {
        await updateDoc(docRef, { cancelled: newCancelledState });
        callbacks.showModal("Erfolg", `Match wurde erfolgreich ${actionText}.`, [{text: 'OK', class: 'bg-green-500'}]);
    } catch (error) {
        callbacks.showModal("Fehler", `Das Match konnte nicht ${actionText} werden: ${error.message || 'Unbekannter Fehler'}.`, [{text: 'OK', class: 'bg-red-500'}]);
    }
};

export const deleteMatchtag = async (datumString, callbacks) => {
    const matchtageCollection = collection(db, `artifacts/${appId}/public/data/spieltage`);
    callbacks.showModal(
        "Matchtag löschen?",
        "Möchten Sie diesen Matchtag wirklich löschen?",
        [
            { text: 'Abbrechen', class: 'bg-gray-500' },
            { text: 'Ja, löschen', class: 'bg-red-600', onClick: async () => {
                try {
                    await deleteDoc(doc(matchtageCollection, datumString));
                    callbacks.showModal("Gelöscht", "Matchtag wurde gelöscht.", [{text: 'OK', class: 'bg-blue-500', onClick: () => callbacks.navigateTo('home', null, true)}]);
                } catch (error) {
                    callbacks.showModal("Fehler", `Fehler beim Löschen des Matchtags: ${error.message || 'Unbekannter Fehler'}.`, [{text: 'OK', class: 'bg-red-500'}]);
                }
            }}
        ]
    );
};

export const saveTrainingSchedule = async (form, callbacks) => {
    const configDoc = doc(db, `artifacts/${appId}/public/data/config/team`);
    const trainingCollection = collection(db, `artifacts/${appId}/public/data/trainingseinheiten`);
    callbacks.showModal("Speichern...", '<div class="animate-pulse">Trainingsplan wird gespeichert...</div>', []);
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

    try {
        await setDoc(configDoc, { trainingSchedule, trainingEndDate }, { merge: true });
        await generateRecurringTrainings(trainingSchedule, trainingEndDate, trainingCollection, db);
        callbacks.showModal("Gespeichert", "Trainingsplan erfolgreich aktualisiert und Kalender wurde synchronisiert.", [{text: 'OK', class: 'bg-green-500'}]);
    } catch (error) {
        callbacks.showModal("Fehler", `Konnte Trainingsplan nicht speichern: ${error.message || 'Unbekannter Fehler'}.`, [{text: 'OK', class: 'bg-red-500'}]);
    }
};

export const generateRecurringTrainings = async (schedule, endDateString, trainingCollection, db) => {
    if (!endDateString || Object.keys(schedule).length === 0) {
        const q_del = query(trainingCollection, where("autogenerated", "==", true));
        const querySnapshot_del = await getDocs(q_del);
        if (querySnapshot_del.empty) return;
        const batch_del = writeBatch(db);
        querySnapshot_del.forEach((doc) => batch_del.delete(doc.ref));
        await batch_del.commit();
        return;
    }
    
    const q = query(trainingCollection, where("autogenerated", "==", true));
    const querySnapshot = await getDocs(q);
    const batch = writeBatch(db);
    querySnapshot.forEach((doc) => batch.delete(doc.ref));
    await batch.commit();

    const newBatch = writeBatch(db);
    const startDate = new Date();
    startDate.setHours(0,0,0,0);
    const endDate = new Date(endDateString);
    endDate.setHours(0,0,0,0);
    const dayMapping = { 0: 'Sonntag', 1: 'Montag', 2: 'Dienstag', 3: 'Mittwoch', 4: 'Donnerstag', 5: 'Freitag', 6: 'Samstag' };
    let currentDate = startDate;
    
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
        }
        currentDate.setDate(currentDate.getDate() + 1);
    }
    await newBatch.commit();
};

export const exportData = (dataType, callbacks) => {
    let dataToExport = {};
    switch (dataType) {
        case 'spieler': dataToExport = { spieler: state.spieler }; break;
        case 'training': dataToExport = { trainingseinheiten: state.trainingseinheiten }; break;
        case 'matchtage': dataToExport = { matchtage: state.matchtage }; break;
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
    link.href = url;
    link.download = `trainer-app-backup-${dataType}-${new Date().toISOString().slice(0,10)}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    callbacks.closeModal();
};

export const importJSONData = async (jsonString, callbacks) => {
    const spielerCollection = collection(db, `artifacts/${appId}/public/data/spieler`);
    const trainingCollection = collection(db, `artifacts/${appId}/public/data/trainingseinheiten`);
    const matchtageCollection = collection(db, `artifacts/${appId}/public/data/spieltage`);
    const configDoc = doc(db, `artifacts/${appId}/public/data/config/team`);
    callbacks.showModal("Importieren...", '<div class="animate-pulse">Daten werden importiert...</div>', []);
    try {
        const importedData = JSON.parse(jsonString);
        const batch = writeBatch(db);
        if (importedData.teamInfo) {
            batch.set(configDoc, importedData.teamInfo, { merge: true });
        }
        if (importedData.spieler && Array.isArray(importedData.spieler)) {
            for (const player of importedData.spieler) {
                const docRef = player.id ? doc(spielerCollection, player.id) : doc(spielerCollection);
                const { id, ...data } = player;
                batch.set(docRef, data, { merge: true });
            }
        }
        if (importedData.trainingseinheiten && Array.isArray(importedData.trainingseinheiten)) {
            for (const training of importedData.trainingseinheiten) {
                const docRef = doc(trainingCollection, training.id);
                const { id, ...data } = training;
                batch.set(docRef, data, { merge: true });
            }
        }
        const matchData = importedData.matchtage || importedData.spieltage;
        if (matchData && Array.isArray(matchData)) {
            for (const matchtag of matchData) {
                const docRef = doc(matchtageCollection, matchtag.id);
                const { id, ...data } = matchtag;
                batch.set(docRef, data, { merge: true });
            }
        }
        await batch.commit();
        callbacks.showModal("Import abgeschlossen", "Daten erfolgreich importiert!", [{text: 'OK', class: 'bg-blue-500'}]);
    } catch (error) {
        callbacks.showModal("Importfehler", `Ein Fehler ist beim Importieren der Daten aufgetreten: ${error.message || 'Unbekannter Fehler'}.`, [{text: 'OK', class: 'bg-red-500'}]);
    }
};

export const deleteAllData = async (callbacks) => {
    const spielerCollection = collection(db, `artifacts/${appId}/public/data/spieler`);
    const trainingCollection = collection(db, `artifacts/${appId}/public/data/trainingseinheiten`);
    const matchtageCollection = collection(db, `artifacts/${appId}/public/data/spieltage`);
    const configDoc = doc(db, `artifacts/${appId}/public/data/config/team`);
    
    callbacks.showModal("Löschen...", '<div class="animate-pulse">Alle Daten werden gelöscht...</div>', []);

    try {
        const collections = [spielerCollection, trainingCollection, matchtageCollection];
        for (const col of collections) {
            const snapshot = await getDocs(col);
            const batch = writeBatch(db);
            snapshot.docs.forEach(doc => batch.delete(doc.ref));
            await batch.commit();
        }
        await deleteDoc(configDoc);
        callbacks.showModal("Gelöscht", "Alle Daten wurden gelöscht.", [{text: 'OK', class: 'bg-blue-500'}]);
    } catch (error) {
        callbacks.showModal("Fehler", `Fehler beim Löschen aller Daten: ${error.message || 'Unbekannter Fehler'}.`, [{text: 'OK', class: 'bg-red-500'}]);
    }
};

export const deleteCollectionData = async (collectionRef, collectionName, callbacks) => {
    callbacks.showModal("Löschen...", `<div class="animate-pulse">${collectionName} werden gelöscht...</div>`, []);
    try {
        const snapshot = await getDocs(collectionRef);
        const batch = writeBatch(db);
        snapshot.docs.forEach(doc => batch.delete(doc.ref));
        await batch.commit();
        callbacks.showModal("Gelöscht", `${collectionName} wurden gelöscht.`, [{text: 'OK', class: 'bg-blue-500'}]);
    } catch (error) {
        callbacks.showModal("Fehler", `Fehler beim Löschen von ${collectionName}: ${error.message || 'Unbekannter Fehler'}.`, [{text: 'OK', class: 'bg-red-500'}]);
    }
};

export const deleteMannschaftInfo = async (callbacks) => {
    callbacks.showModal("Löschen...", '<div class="animate-pulse">Mannschaftsinfo wird gelöscht...</div>', []);
    const configDoc = doc(db, `artifacts/${appId}/public/data/config/team`);
    try {
        await deleteDoc(configDoc);
        callbacks.showModal("Gelöscht", "Die Mannschaftsinfo wurde gelöscht.", [{text: 'OK', class: 'bg-blue-500'}]);
    } catch (error) {
        callbacks.showModal("Fehler", `Fehler beim Löschen der Mannschaftsinfo: ${error.message || 'Unbekannter Fehler'}.`, [{text: 'OK', class: 'bg-red-500'}]);
    }
};



export const deleteMannschaftEmblem = async (callbacks) => {
    callbacks.showModal(
        "Vereinsemblem löschen?",
        "Möchten Sie das Vereinsemblem wirklich löschen? Das Emblem wird sofort entfernt und kann nicht wiederhergestellt werden.",
        [
            { text: 'Abbrechen', class: 'bg-gray-500' },
            { 
                text: 'Ja, löschen', 
                class: 'bg-red-600', 
                onClick: async () => {
                    callbacks.showModal("Löschen...", '<div class="animate-pulse">Emblem wird gelöscht...</div>', []);
                    const configDoc = doc(db, `artifacts/${appId}/public/data/config/team`);
                    try {
                        await updateDoc(configDoc, {
                            emblemUrl: null 
                        });
                        callbacks.showModal("Gelöscht", "Das Vereinsemblem wurde entfernt.", [{text: 'OK', class: 'bg-blue-500'}]);
                    } catch (error) {
                        callbacks.showModal("Fehler", `Fehler beim Löschen des Emblems: ${error.message || 'Unbekannter Fehler'}.`, [{text: 'OK', class: 'bg-red-500'}]);
                    }
                }
            }
        ]
    );
};