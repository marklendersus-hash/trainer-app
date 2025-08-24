import { state, setupDbRefs, setFilter, setStatsFilter, setSort, setHomeCalendarFilter, setTrainingListView, setMatchtagListView } from './state.js';
import { db, auth, APP_VERSION, saveSpieler, deleteSpieler, setAnwesenheit, toggleTrainingCancellation, deleteTraining, saveMatchtag, updateSpielerMatchDetails, toggleMatchCancellation, deleteMatchtag, saveMannschaftInfo, saveTrainingSchedule, generateRecurringTrainings, exportData, importJSONData, deleteAllData, deleteCollectionData, deleteMannschaftInfo, saveFormation, saveTrainingDetails, appId } from './api.js';
import { render } from './render.js';
import { fetchHolidaysForYear, formatDateWithWeekday, berechneAlter, parseDateString, getAktuellerStatus, getStatusIndicator, formatDate } from './utils.js';
import * as firestoreModule from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";
import { collection, onSnapshot, doc, query, orderBy } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";
import { signInAnonymously, signInWithCustomToken } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";

// =================================================================
// MODALS LOGIK (Hierher verschoben)
// =================================================================
const modalContainer = document.getElementById('modal-container');
const placeholderBg = () => '475569';
const placeholderText = () => 'E2E8F0';

const showModal = (title, message, buttons = [{text: 'Schließen', class: 'bg-blue-600'}]) => {
    state.isModalOpen = true; 
    modalContainer.innerHTML = ''; 
    const modal = document.createElement('div');
    modal.className = 'modal-backdrop';
    
    const closeModalCallback = () => {
        modal.classList.remove('visible');
        setTimeout(() => {
            if (modalContainer.contains(modal)) {
                modalContainer.removeChild(modal);
            }
            state.isModalOpen = false;
        }, 300);
    };

    let buttonsHtml = buttons.map(btn => 
        `<button class="flex-1 py-2 ${btn.class} text-white rounded-lg btn">${btn.text}</button>`
    ).join('');

    modal.innerHTML = `
        <div class="modal-content text-center">
            <h3 class="text-lg font-bold mb-4">${title}</h3>
            <div class="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">${message}</div>
            <div class="flex space-x-2 mt-6">
                ${buttonsHtml}
            </div>
        </div>
    `;

    if (buttons.length > 0) {
        modal.querySelectorAll('button').forEach((button, index) => {
            button.onclick = () => {
                if (buttons[index].onClick) {
                    buttons[index].onClick();
                }
                closeModalCallback();
            };
        });
    }
    
    modalContainer.appendChild(modal);
    setTimeout(() => modal.classList.add('visible'), 10);
};

const closeModal = () => {
    const modalBackdrop = modalContainer.querySelector('.modal-backdrop');
    if (modalBackdrop) {
        modalBackdrop.classList.remove('visible');
        setTimeout(() => {
            if (modalContainer.contains(modalBackdrop)) {
                modalContainer.removeChild(modalBackdrop);
            }
            state.isModalOpen = false;
        }, 300);
    }
};

const showAddEventModal = (type, callbacks) => {
    state.isModalOpen = true; 
    modalContainer.innerHTML = ''; 
    const modal = document.createElement('div');
    modal.className = 'modal-backdrop';

    const title = type === 'training' ? 'Neues Training Hinzufügen' : 'Neuen Matchtag Hinzufügen';
    const page = type === 'training' ? 'trainingDetail' : 'matchtagDetail';
    const today = formatDate(new Date());

    modal.innerHTML = `
        <div class="modal-content text-center">
            <h3 class="text-lg font-bold mb-4">${title}</h3>
            <p class="mb-2 text-left">Bitte wählen Sie ein Datum aus:</p>
            <input type="date" id="newEventDateInput" class="w-full p-2 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600" value="${today}">
            <div id="modalError" class="text-red-500 text-sm mt-2 h-4"></div>
            <div class="flex space-x-2 mt-4">
                <button id="modalCancelBtn" class="flex-1 py-2 bg-gray-500 text-white rounded-lg btn">Abbrechen</button>
                <button id="modalConfirmBtn" class="flex-1 py-2 bg-green-600 text-white rounded-lg btn">Weiter</button>
            </div>
        </div>
    `;
    modalContainer.appendChild(modal);
    setTimeout(() => modal.classList.add('visible'), 10);

    document.getElementById('modalCancelBtn').onclick = () => closeModal();
    document.getElementById('modalConfirmBtn').onclick = () => {
        const dateInput = document.getElementById('newEventDateInput');
        const errorDiv = document.getElementById('modalError');
        if (dateInput.value) {
            errorDiv.textContent = '';
            try {
                callbacks.navigateTo(page, dateInput.value);
                closeModal();
            } catch (error) {
                errorDiv.textContent = `Ein Fehler ist aufgetreten: ${error.message}`;
            }
        } else {
            errorDiv.textContent = 'Bitte ein gültiges Datum auswählen.';
        }
    };
};

const showDeleteOptionsModal = (callbacks) => {
    state.isModalOpen = true;
    modalContainer.innerHTML = '';
    const modal = document.createElement('div');
    modal.className = 'modal-backdrop visible';

    modal.innerHTML = `
        <div class="modal-content text-center">
            <h3 class="text-lg font-bold mb-4">Welche Daten möchten Sie löschen?</h3>
            <div class="space-y-3">
                <button onclick="window.app.confirmDeletion('all')" class="w-full py-3 font-medium text-white uppercase bg-red-600 rounded-lg shadow-lg hover:bg-red-700 btn">Alle App-Daten</button>
                <button onclick="window.app.confirmDeletion('spieler')" class="w-full py-3 font-medium text-white uppercase bg-yellow-600 rounded-lg shadow-lg hover:bg-yellow-700 btn">Nur Spielerdaten</button>
                <button onclick="window.app.confirmDeletion('training')" class="w-full py-3 font-medium text-white uppercase bg-yellow-600 rounded-lg shadow-lg hover:bg-yellow-700 btn">Nur Trainingsdaten</button>
                <button onclick="window.app.confirmDeletion('matchtage')" class="w-full py-3 font-medium text-white uppercase bg-yellow-600 rounded-lg shadow-lg hover:bg-yellow-700 btn">Nur Matchdaten</button>
                <button onclick="window.app.confirmDeletion('mannschaft')" class="w-full py-3 font-medium text-white uppercase bg-yellow-600 rounded-lg shadow-lg hover:bg-yellow-700 btn">Nur Mannschaftsinfo</button>
            </div>
            <button onclick="window.app.closeModal()" class="w-full py-2 bg-gray-500 text-white rounded-lg btn mt-6">Abbrechen</button>
        </div>
    `;
    modalContainer.appendChild(modal);
    setTimeout(() => modal.classList.add('visible'), 10);
};

const showExportOptionsModal = (callbacks) => {
    state.isModalOpen = true;
    modalContainer.innerHTML = '';
    const modal = document.createElement('div');
    modal.className = 'modal-backdrop visible';

    modal.innerHTML = `
        <div class="modal-content text-center">
            <h3 class="text-lg font-bold mb-4">Welche Daten möchten Sie exportieren?</h3>
            <div class="space-y-3">
                <button onclick="window.app.exportData('all')" class="w-full py-3 font-medium text-white uppercase bg-green-600 rounded-lg shadow-lg hover:bg-green-700 btn">Alle Daten</button>
                <button onclick="window.app.exportData('spieler')" class="w-full py-3 font-medium text-white uppercase bg-green-600 rounded-lg shadow-lg hover:bg-green-700 btn">Nur Spielerdaten</button>
                <button onclick="window.app.exportData('training')" class="w-full py-3 font-medium text-white uppercase bg-green-600 rounded-lg shadow-lg hover:bg-green-700 btn">Nur Trainingsdaten</button>
                <button onclick="window.app.exportData('matchtage')" class="w-full py-3 font-medium text-white uppercase bg-green-600 rounded-lg shadow-lg hover:bg-green-700 btn">Nur Matchdaten</button>
                <button onclick="window.app.closeModal()" class="w-full py-2 bg-gray-500 text-white rounded-lg btn mt-6">Abbrechen</button>
            </div>
        </div>
    `;
    modalContainer.appendChild(modal);
    setTimeout(() => modal.classList.add('visible'), 10);
};

const confirmDeletion = (type, callbacks) => {
    let title = "Bestätigung";
    let message = "";
    let action = null;

    switch(type) {
        case 'all':
            title = "Alle Daten löschen?";
            message = "Möchten Sie wirklich ALLE Daten (Spieler, Trainings, Matchtage, Team-Info) unwiderruflich löschen? Dies kann nicht rückgängig gemacht werden!";
            action = async () => {
                showModal("Löschen...", '<div class="animate-pulse">Alle Daten werden gelöscht...</div>', []);
                try {
                    await callbacks.deleteAllData();
                    showModal("Gelöscht", "Alle Daten wurden gelöscht.", [{text: 'OK', class: 'bg-blue-500'}]);
                } catch (error) {
                    showModal("Fehler", `Fehler beim Löschen aller Daten: ${error.message || 'Unbekannter Fehler'}.`, [{text: 'OK', class: 'bg-red-500'}]);
                }
            };
            break;
        case 'spieler':
            title = "Spielerdaten löschen?";
            message = "Möchten Sie wirklich alle Spielerdaten löschen?";
            action = () => callbacks.deleteCollectionData(window.spielerCollection, 'Spielerdaten');
            break;
        case 'training':
            title = "Trainingsdaten löschen?";
            message = "Möchten Sie wirklich alle Trainingsdaten löschen?";
            action = () => callbacks.deleteCollectionData(window.trainingCollection, 'Trainingsdaten');
            break;
        case 'matchtage':
            title = "Matchdaten löschen?";
            message = "Möchten Sie wirklich alle Matchdaten löschen?";
            action = () => callbacks.deleteCollectionData(window.matchtageCollection, 'Matchdaten');
            break;
        case 'mannschaft':
            title = "Mannschaftsinfo löschen?";
            message = "Möchten Sie wirklich die Mannschaftsinfo löschen?";
            action = () => callbacks.deleteMannschaftInfo();
            break;
    }

    if (action) {
        showModal(
            title,
            message,
            [
                { text: 'Abbrechen', class: 'bg-gray-500', onClick: () => closeModal() },
                { text: 'Ja, löschen', class: 'bg-red-600', onClick: action }
            ]
        );
    }
};

const showFormationModal = (matchtagId, callbacks) => {
    state.isModalOpen = true; 
    const matchtag = state.matchtage.find(s => s.id === matchtagId) || { aufstellung: {} };
    state.formationPlayers = JSON.parse(JSON.stringify(matchtag.aufstellung || {}));

    modalContainer.innerHTML = `
        <div id="formation-modal-backdrop" class="modal-backdrop visible">
            <div class="modal-content-formation">
                <div class="flex flex-col md:flex-row gap-4 flex-grow min-h-0">
                    <div class="flex flex-col flex-grow w-full md:w-2/3">
                        <h3 class="text-lg font-bold mb-2 text-center">Formation für ${formatDateWithWeekday(matchtagId)}</h3>
                        <div id="footballPitch" class="football-pitch flex-grow relative border-2 border-white rounded-lg overflow-hidden">
                            <div class="pitch-line center-line"></div>
                            <div class="pitch-line center-circle"></div>
                            <div class="penalty-box top"></div>
                            <div class="penalty-box bottom"></div>
                            <div class="pitch-line top-arc"></div> 
                            <div class="pitch-line bottom-arc"></div> 
                        </div>
                    </div>
                    <div id="formationPlayerListContainer" class="player-list-container w-full md:w-1/3 bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg overflow-y-auto">
                        <div class="mb-4">
                            <label for="formation-select" class="block font-bold mb-2">Formation wählen:</label>
                            <select id="formation-select" class="w-full p-2 rounded-lg bg-white dark:bg-gray-800 dark:text-gray-200">
                                <option value="">Manuell</option>
                                <option value="4-4-2">4-4-2</option>
                                <option value="4-3-3">4-3-3</option>
                                <option value="3-5-2">3-5-2</option>
                                <option value="4-2-3-1">4-2-3-1</option>
                            </select>
                        </div>
                        <h4 class="font-bold mb-2">Verfügbare Spieler</h4>
                        <div id="formation-player-list" class="space-y-2">
                        </div>
                    </div>
                </div>
                <div class="flex space-x-2 mt-4 flex-shrink-0">
                    <button id="saveFormationBtn" class="flex-1 py-2 bg-green-600 text-white rounded-lg btn">Formation speichern</button>
                    <button id="closeFormationModalBtn" class="flex-1 py-2 bg-gray-500 text-white rounded-lg btn">Schließen</button>
                </div>
            </div>
        </div>
    `;

    const footballPitch = document.getElementById('footballPitch');
    const formationPlayerList = document.getElementById('formation-player-list');
    const formationSelect = document.getElementById('formation-select');
    let activePlayerElement = null; 
    let activePlayerId = null; 
    let initialX = 0;
    let initialY = 0;
    
    const renderPlayers = () => { /* ... renderPlayers logic ... */ };
    const startDrag = (e) => { /* ... startDrag logic ... */ };
    const doDrag = (e) => { /* ... doDrag logic ... */ };
    const stopDrag = (e) => { /* ... stopDrag logic ... */ };
    const applyFormation = (formation) => { /* ... applyFormation logic ... */ };

    formationSelect.addEventListener('change', (e) => {
        if (e.target.value) {
            applyFormation(e.target.value);
        }
    });

    renderPlayers();

    document.getElementById('saveFormationBtn').onclick = async () => {
        callbacks.showModal("Speichern...", '<div class="animate-pulse">Formation wird gespeichert...</div>', []);
        try {
            await callbacks.saveFormation(matchtagId, state.formationPlayers);
            callbacks.showModal("Erfolg", "Formation erfolgreich gespeichert!", [{text: 'OK', class: 'bg-green-500'}]);
            callbacks.closeModal();
        } catch (error) {
            callbacks.showModal("Fehler", `Fehler beim Speichern der Formation: ${error.message || 'Unbekannter Fehler'}.`, [{text: 'OK', class: 'bg-red-500'}]);
        }
    };

    document.getElementById('closeFormationModalBtn').onclick = () => callbacks.closeModal();
};

const showEventDetailModal = (dateString, callbacks) => { /* ... showEventDetailModal logic ... */ };


// =================================================================
// HAUPT-APP LOGIK
// =================================================================
const appCallbacks = {
    // ... (all other appCallbacks functions)
    
    // Modal functions are now part of the main app object
    showModal: showModal,
    closeModal: closeModal,
    showAddEventModal: (type) => showAddEventModal(type, appCallbacks),
    showDeleteOptionsModal: () => showDeleteOptionsModal(appCallbacks),
    showExportOptionsModal: () => showExportOptionsModal(appCallbacks),
    confirmDeletion: (type) => confirmDeletion(type, appCallbacks),
    showFormationModal: (matchtagId) => showFormationModal(matchtagId, appCallbacks),
    showEventDetailModal: (dateString) => showEventDetailModal(dateString, appCallbacks),

    // ... (rest of appCallbacks)
};

window.app = appCallbacks;
window.app.init();
