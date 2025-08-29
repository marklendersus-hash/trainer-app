import { state, setupDbRefs, setFilter, setStatsFilter, setSort, setHomeCalendarFilter, setTrainingListView, setMatchtagListView } from './state.js';
import { db, auth, APP_VERSION, saveSpieler, deleteSpieler, setAnwesenheit, toggleTrainingCancellation, deleteTraining, saveMatchtag, updateSpielerMatchDetails, toggleMatchCancellation, deleteMatchtag, saveMannschaftInfo, deleteMannschaftEmblem, saveTrainingSchedule, generateRecurringTrainings, exportData, importJSONData, deleteAllData, deleteCollectionData, deleteMannschaftInfo, saveTrainingDetails, appId, saveVoteInPlayerProfile, saveTrikotwaescher } from './api.js';
import { render } from './render.js';
import { fetchHolidaysForYear, formatDateWithWeekday, berechneAlter, parseDateString, getAktuellerStatus, getStatusIndicator, formatDate } from './utils.js';
import * as firestoreModule from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";
import { collection, onSnapshot, doc, query, orderBy } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";
import { signInAnonymously, signInWithCustomToken } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";

// =================================================================
// MODALS LOGIK
// =================================================================
const modalContainer = document.getElementById('modal-container');

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
            <div class="flex flex-col space-y-2 mt-6">
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
    showModal(
        "Welche Daten möchten Sie löschen?",
        "Diese Aktion kann nicht rückgängig gemacht werden.",
        [
            { text: 'Alle App-Daten', class: 'bg-red-600', onClick: () => callbacks.confirmDeletion('all') },
            { text: 'Nur Spielerdaten', class: 'bg-yellow-600', onClick: () => callbacks.confirmDeletion('spieler') },
            { text: 'Nur Trainingsdaten', class: 'bg-yellow-600', onClick: () => callbacks.confirmDeletion('training') },
            { text: 'Nur Matchdaten', class: 'bg-yellow-600', onClick: () => callbacks.confirmDeletion('matchtage') },
            { text: 'Nur Mannschaftsinfo', class: 'bg-yellow-600', onClick: () => callbacks.confirmDeletion('mannschaft') },
            { text: 'Abbrechen', class: 'bg-gray-500' }
        ]
    );
};

const showExportOptionsModal = (callbacks) => {
    showModal(
        "Welche Daten möchten Sie exportieren?",
        "Wählen Sie die zu exportierenden Daten aus.",
        [
            { text: 'Alle Daten', class: 'bg-green-600', onClick: () => callbacks.exportData('all') },
            { text: 'Nur Spielerdaten', class: 'bg-green-600', onClick: () => callbacks.exportData('spieler') },
            { text: 'Nur Trainingsdaten', class: 'bg-green-600', onClick: () => callbacks.exportData('training') },
            { text: 'Nur Matchdaten', class: 'bg-green-600', onClick: () => callbacks.exportData('matchtage') },
            { text: 'Abbrechen', class: 'bg-gray-500' }
        ]
    );
};

const confirmDeletion = (type, callbacks) => {
    let title = "Bestätigung";
    let message = "";
    let action = null;

    switch(type) {
        case 'all':
            title = "Alle Daten löschen?";
            message = "Möchten Sie wirklich ALLE Daten (Spieler, Trainings, Matchtage, Team-Info) unwiderruflich löschen? Dies kann nicht rückgängig gemacht werden!";
            action = () => callbacks.deleteAllData();
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
                { text: 'Abbrechen', class: 'bg-gray-500' },
                { text: 'Ja, löschen', class: 'bg-red-600', onClick: action }
            ]
        );
    }
};

const showCreateEventModal = (dateString, callbacks) => {
    showModal(
        'Neues Ereignis erstellen',
        'Was möchten Sie für diesen Tag erstellen?',
        [
            {
                text: 'Training',
                class: 'bg-blue-600',
                onClick: () => callbacks.navigateTo('trainingDetail', dateString)
            },
            {
                text: 'Match',
                class: 'bg-yellow-600',
                onClick: () => callbacks.navigateTo('matchtagDetail', dateString)
            },
            { text: 'Abbrechen', class: 'bg-gray-500' }
        ]
    );
};

const showEventDetailModal = (dateString, callbacks) => {
    const training = state.trainingseinheiten.find(t => t.id === dateString && !t.cancelled);
    const match = state.matchtage.find(s => s.id === dateString && !s.cancelled);
    const geburtstage = state.spieler.filter(p => p.geburtstag && p.geburtstag.slice(5) === dateString.slice(5));

    let title = `Details für ${formatDateWithWeekday(dateString)}`;
    let content = '<div class="space-y-1 text-left">';
    let buttons = [];

    if (geburtstage.length > 0) {
        content += `<p><i class="fas fa-birthday-cake fa-fw text-pink-500 mr-2"></i><strong>Geburtstag:</strong> ${geburtstage.map(p => p.name).join(', ')}</p>`;
    }

    if (training) {
        content += `<p><i class="fas fa-running fa-fw text-blue-500 mr-2"></i><strong>Training:</strong> ${training.time || 'Nicht festgelegt'}</p>`;
        buttons.push({
            text: 'Training bearbeiten',
            class: 'bg-blue-600',
            onClick: () => callbacks.navigateTo('trainingDetail', dateString)
        });
    }

    if (match) {
        let matchDetails = `Gegner: ${match.gegner || '?'} (${match.spielort || '?'})`;
        if (match.toreHeim !== null && match.toreAuswaerts !== null) {
            matchDetails += ` | Ergebnis: ${match.toreHeim}:${match.toreAuswaerts}`;
        }
        content += `<p><i class="fas fa-futbol fa-fw text-yellow-500 mr-2"></i><strong>Match:</strong> ${matchDetails}</p>`;
        buttons.push({
            text: 'Match bearbeiten',
            class: 'bg-yellow-600',
            onClick: () => callbacks.navigateTo('matchtagDetail', dateString)
        });
    }
    
    content += '</div>';

    if (!training && !match && geburtstage.length > 0) {
        buttons.push({
            text: 'Training erstellen',
            class: 'bg-green-600',
            onClick: () => callbacks.navigateTo('trainingDetail', dateString)
        });
        buttons.push({
            text: 'Match erstellen',
            class: 'bg-green-600',
            onClick: () => callbacks.navigateTo('matchtagDetail', dateString)
        });
    }

    buttons.push({ text: 'Schließen', class: 'bg-gray-500' });

    showModal(title, content, buttons);
};

const handleCalendarDayClick = (dateString, callbacks) => {
    const trainingOnDay = state.trainingseinheiten.find(t => t.id === dateString && !t.cancelled);
    const matchOnDay = state.matchtage.find(s => s.id === dateString && !s.cancelled);
    const geburtstagOnDay = state.spieler.some(p => p.geburtstag && p.geburtstag.slice(5) === dateString.slice(5));

    if (trainingOnDay || matchOnDay || geburtstagOnDay) {
        showEventDetailModal(dateString, callbacks);
    } else {
        showCreateEventModal(dateString, callbacks);
    }
};


// =================================================================
// HAUPT-APP LOGIK
// =================================================================
const appCallbacks = {
    getCurrentVersion: () => APP_VERSION,
    applyTheme: () => {
        document.documentElement.classList.add('dark');
    },
    init: async () => {
        appCallbacks.applyTheme();
        state.loading = true;
        render(appCallbacks);
        try {
            if (typeof __initial_auth_token !== 'undefined') {
                await signInWithCustomToken(auth, __initial_auth_token);
            } else {
                await signInAnonymously(auth);
            }
            state.userId = auth.currentUser?.uid;
            if (!state.userId) {
                throw new Error("User could not be authenticated.");
            }
            setupDbRefs(db, appId, firestoreModule);
            if (sessionStorage.getItem('trainerAppLoggedIn') === 'true') {
                state.isLoggedIn = true;
                state.currentPage = 'home';
                appCallbacks.setupListeners();
                await fetchHolidaysForYear(new Date().getFullYear(), state);
            } else {
                state.isLoggedIn = false;
                state.currentPage = 'login';
            }
        } catch(e) {
            console.error("Firebase Auth Error", e);
            showModal("Authentifizierungsfehler", "Die Anmeldung bei Firebase ist fehlgeschlagen. Bitte überprüfen Sie Ihre Firebase-Einstellungen.", [{text: 'OK', class: 'bg-red-500'}]);
        } finally {
            state.loading = false;
            render(appCallbacks);
        }
    },
    setupListeners: () => {
        window.spielerCollection = collection(db, `artifacts/${appId}/public/data/spieler`);
        window.trainingCollection = collection(db, `artifacts/${appId}/public/data/trainingseinheiten`);
        window.matchtageCollection = collection(db, `artifacts/${appId}/public/data/spieltage`);
        const configDoc = doc(db, `artifacts/${appId}/public/data/config/team`);

        onSnapshot(query(window.spielerCollection, orderBy("name")), (snapshot) => {
            state.spieler = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            // Populate spielfuehrerWahl.votes from the loaded players
            state.spielfuehrerWahl.votes = state.spieler.reduce((acc, spieler) => {
                if (spieler.spielfuehrerStimmen) {
                    acc[spieler.id] = spieler.spielfuehrerStimmen;
                }
                return acc;
            }, {});
            if(state.isLoggedIn) render(appCallbacks);
        });
        onSnapshot(query(window.trainingCollection), (snapshot) => {
            state.trainingseinheiten = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            if(state.isLoggedIn) render(appCallbacks);
        });
        onSnapshot(query(window.matchtageCollection), (snapshot) => {
            state.matchtage = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            if(state.isLoggedIn) render(appCallbacks);
        });
        onSnapshot(configDoc, (doc) => {
            if (doc.exists()) {
                state.teamInfo = { trainingSchedule: {}, ...doc.data() };
            }
            if(state.isLoggedIn) render(appCallbacks);
        });
    },
    login: async (email, password) => {
        const BENUTZER_EMAIL = 'trainer@demo.com';
        const PASSWORT = '1234';

        if (email === BENUTZER_EMAIL && password === PASSWORT) {
            sessionStorage.setItem('trainerAppLoggedIn', 'true');
            state.isLoggedIn = true;
            state.currentPage = 'home';
            state.loading = true;
            render(appCallbacks);
            appCallbacks.setupListeners();
            await fetchHolidaysForYear(new Date().getFullYear(), state);
            state.loading = false;
            render(appCallbacks);
        } else {
            showModal("Anmeldung fehlgeschlagen", "Anmeldung fehlgeschlagen. Bitte überprüfen Sie Ihre Eingaben.", [{text: 'OK', class: 'bg-red-500'}]);
        }
    },
    logout: () => {
        sessionStorage.removeItem('trainerAppLoggedIn');
        Object.assign(state, {
            isLoggedIn: false,
            spieler: [],
            trainingseinheiten: [],
            matchtage: [],
            feiertage: [],
            holidaysFetched: {},
            teamInfo: { name: 'Mein Team', name2: '', emblemUrl: null, trainingSchedule: {} },
            currentPage: 'login',
            currentId: null,
            currentDate: new Date(),
            loading: false,
            filter: '',
            sortBy: 'status',
            sortAsc: true,
            statsFilter: 'matches',
            navigationStack: [],
            initialFormData: '',
            formationPlayers: {},
            showTrainingsOnHomeCalendar: true,
            showMatchesOnHomeCalendar: true,
            isModalOpen: false
        });
        render(appCallbacks);
    },
    navigateTo: (page, id = null, isNavAction = false) => {
        const doNavigation = () => {
            if (!isNavAction && state.currentPage !== page) {
                state.navigationStack.push({ page: state.currentPage, id: state.currentId });
            }
            if (isNavAction) {
                state.navigationStack = [];
            }
            state.currentPage = page;
            state.currentId = id;
            if (page !== 'spielerUebersicht') state.filter = '';
            if (page === 'home') {
                state.currentDate = new Date();
            }
            if (page === 'wahlergebnis') {
                appCallbacks.calculateWahlergebnis();
            }
            render(appCallbacks);
            document.getElementById('app-container').scrollTo(0, 0);
        };
        if (!['spielerForm'].includes(state.currentPage)) {
            doNavigation();
            return;
        }
        const form = document.getElementById('spielerForm');
        if (form && new URLSearchParams(new FormData(form)).toString() !== state.initialFormData) {
            showModal(
                'Ungespeicherte Änderungen',
                'Möchten Sie die Seite verlassen und die Änderungen verwerfen?',
                [
                    { text: 'Abbrechen', class: 'bg-gray-500' },
                    { text: 'Verwerfen', class: 'bg-red-600', onClick: doNavigation }
                ]
            );
        } else {
            doNavigation();
        }
    },
    goBack: () => {
        const doNavigation = () => {
            const previous = state.navigationStack.pop();
            if (previous) {
                state.currentPage = previous.page;
                state.currentId = previous.id;
                render(appCallbacks);
                document.getElementById('app-container').scrollTo(0, 0);
            } else {
                appCallbacks.navigateTo('home', null, true);
            }
        };
        if (state.isModalOpen) {
            closeModal();
            return;
        }
        if (!['spielerForm'].includes(state.currentPage)) {
            doNavigation();
            return;
        }
        const form = document.getElementById('spielerForm');
        if (form && new URLSearchParams(new FormData(form)).toString() !== state.initialFormData) {
            showModal(
                'Ungespeicherte Änderungen',
                'Möchten Sie die Seite verlassen und die Änderungen verwerfen?',
                [
                    { text: 'Abbrechen', class: 'bg-gray-500' },
                    { text: 'Verwerfen', class: 'bg-red-600', onClick: doNavigation }
                ]
            );
        } else {
            doNavigation();
        }
    },
    changeMonth: async (direction) => {
        state.currentDate.setMonth(state.currentDate.getMonth() + direction);
        await fetchHolidaysForYear(state.currentDate.getFullYear(), state);
        render(appCallbacks);
    },
    goToToday: async () => {
        state.currentDate = new Date();
        await fetchHolidaysForYear(new Date().getFullYear(), state);
        render(appCallbacks);
    },
    setFilter: (value) => {
        setFilter(value);
        render(appCallbacks);
    },
    setStatsFilter: (filter) => {
        setStatsFilter(filter);
        render(appCallbacks);
    },
    setSort: (sortBy) => {
        setSort(sortBy);
        render(appCallbacks);
    },
    setHomeCalendarFilter: (type, isChecked) => {
        setHomeCalendarFilter(type, isChecked);
        render(appCallbacks);
    },
    setTrainingListView: (view) => {
        setTrainingListView(view);
        render(appCallbacks);
    },
    setMatchtagListView: (view) => {
        setMatchtagListView(view);
        render(appCallbacks);
    },
    saveSpieler: (data, id, file) => saveSpieler(data, id, file, appCallbacks),
    deleteSpieler: (id) => deleteSpieler(id, appCallbacks),
    deleteSpielerFoto: (id) => deleteSpielerFoto(id, appCallbacks),
    setAnwesenheit: (datumString, spielerId, status) => setAnwesenheit(datumString, spielerId, status, appCallbacks),
    toggleTrainingCancellation: (datumString) => toggleTrainingCancellation(datumString, appCallbacks),
    deleteTraining: (datumString) => deleteTraining(datumString, appCallbacks),
    saveMatchtag: (datumString, data) => saveMatchtag(datumString, data, appCallbacks),
    updateSpielerMatchDetails: (datumString, spielerId, field, value) => updateSpielerMatchDetails(datumString, spielerId, field, value, appCallbacks),
    toggleMatchCancellation: (datumString) => toggleMatchCancellation(datumString, appCallbacks),
    deleteMatchtag: (datumString) => deleteMatchtag(datumString, appCallbacks),
    saveMannschaftInfo: (form, wasMarkedForDeletion) => saveMannschaftInfo(form, wasMarkedForDeletion, appCallbacks),
    saveTrainingSchedule: (form) => saveTrainingSchedule(form, appCallbacks),
    generateRecurringTrainings: (schedule, endDateString) => generateRecurringTrainings(schedule, endDateString, appCallbacks),
    exportData: (type = 'all') => exportData(type, appCallbacks),
    importData: () => { document.getElementById('jsonImportInput').click(); },
    importJSONData: (jsonString) => importJSONData(jsonString, appCallbacks),
    showDeleteOptionsModal: () => showDeleteOptionsModal(appCallbacks),
    showExportOptionsModal: () => showExportOptionsModal(appCallbacks),
    confirmDeletion: (type) => confirmDeletion(type, appCallbacks),
    deleteAllData: () => deleteAllData(appCallbacks),
    deleteCollectionData: (collectionRef, collectionName) => deleteCollectionData(collectionRef, collectionName, appCallbacks),
    deleteMannschaftInfo: () => deleteMannschaftInfo(appCallbacks),
    deleteMannschaftEmblem: () => deleteMannschaftEmblem(appCallbacks),
    calculateWahlergebnis: () => {
        const allVotes = state.spieler.map(s => s.spielfuehrerStimmen || []).flat();
        const voteCounts = allVotes.reduce((acc, id) => {
            if (id) { // only count valid votes
                acc[id] = (acc[id] || 0) + 1;
            }
            return acc;
        }, {});

        const sortedResults = Object.entries(voteCounts).sort(([,a],[,b]) => b-a);
        state.wahlergebnis = sortedResults;
    },
    updateSpielfuehrerWahl: (voterId, voteIndex, selectedSpielerId) => {
        if (!state.spielfuehrerWahl.votes[voterId]) {
            state.spielfuehrerWahl.votes[voterId] = ["", ""];
        }

        const otherVoteIndex = voteIndex === 0 ? 1 : 0;
        if (state.spielfuehrerWahl.votes[voterId][otherVoteIndex] === selectedSpielerId && selectedSpielerId !== "") {
            showModal("Fehler", "Ein Spieler kann nicht zweimal für denselben Spieler stimmen.", [{text: 'OK', class: 'bg-red-500'}]);
            // Re-render to reset the dropdown
            render(appCallbacks);
            return;
        }

        state.spielfuehrerWahl.votes[voterId][voteIndex] = selectedSpielerId;
        
        // Update the local state immediately for instant feedback
        const spieler = state.spieler.find(s => s.id === voterId);
        if (spieler) {
            if (!spieler.spielfuehrerStimmen) {
                spieler.spielfuehrerStimmen = ["", ""];
            }
            spieler.spielfuehrerStimmen[voteIndex] = selectedSpielerId;
        }

        const allVotes = Object.values(state.spielfuehrerWahl.votes).flat();
        const voteCounts = allVotes.reduce((acc, id) => {
            if (id) { // only count valid votes
                acc[id] = (acc[id] || 0) + 1;
            }
            return acc;
        }, {});

        const sortedResults = Object.entries(voteCounts).sort(([,a],[,b]) => b-a);
        state.wahlergebnis = sortedResults;

        // Debounced save
        if (window.saveWahlTimeout) {
            clearTimeout(window.saveWahlTimeout);
        }
        window.saveWahlTimeout = setTimeout(() => {
            saveVoteInPlayerProfile(voterId, state.spielfuehrerWahl.votes[voterId], appCallbacks);
        }, 1000);
    },
    clearDateField: (inputId) => { document.getElementById(inputId).value = ''; },
    markFotoForDeletion: () => {
        document.getElementById('deleteFotoFlag').value = 'true';
        const vorschau = document.getElementById('fotoVorschau');
        vorschau.src = '#';
        vorschau.classList.add('hidden');
        const deleteButton = document.querySelector('[onclick="window.app.markFotoForDeletion()"]');
        if (deleteButton) {
            deleteButton.style.display = 'none';
        }
    },
    markEmblemForDeletion: () => {
        document.getElementById('deleteEmblemFlag').value = 'true';
        const vorschau = document.getElementById('emblemVorschau');
        if (vorschau) {
            vorschau.src = '#';
            vorschau.classList.add('hidden');
        }
        const deleteButton = document.querySelector('[onclick="window.app.markEmblemForDeletion()"]');
        if (deleteButton) {
            deleteButton.style.display = 'none';
        }
    },
    saveTrainingDetails: (datumString, data) => saveTrainingDetails(datumString, data, appCallbacks),
    saveTrikotwaescher: (matchId, spielerId) => saveTrikotwaescher(matchId, spielerId, appCallbacks),
    handleCalendarDayClick: (dateString) => handleCalendarDayClick(dateString, appCallbacks),
    showAddEventModal: (type) => showAddEventModal(type, appCallbacks),
    closeModal: () => closeModal(),
    showModal: (title, message, buttons) => showModal(title, message, buttons),
    addEventListeners: () => {
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const email = e.target.email.value;
                const password = e.target.password.value;
                appCallbacks.login(email, password);
            });
        }
        const spielerForm = document.getElementById('spielerForm');
        if (spielerForm) {
            state.initialFormData = new URLSearchParams(new FormData(spielerForm)).toString();
            const fotoUpload = document.getElementById('fotoUpload');
            if (fotoUpload) {
                fotoUpload.addEventListener('change', (e) => {
                    const file = e.target.files[0];
                    if (file) {
                        const reader = new FileReader();
                        reader.onload = (event) => {
                            const vorschau = document.getElementById('fotoVorschau');
                            vorschau.src = event.target.result;
                            vorschau.classList.remove('hidden');
                        }
                        reader.readAsDataURL(file);
                    }
                });
            }
            spielerForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                const data = Object.fromEntries(formData.entries());
                const id = data.id;
                const file = data.foto;
                delete data.id;
                delete data.foto;
                const wasMarkedForDeletion = data.deleteFoto === 'true';
                delete data.deleteFoto;

                Object.keys(data).forEach(key => {
                    if (data[key] === '') data[key] = null;
                });

                if (wasMarkedForDeletion) {
                    data.fotoUrl = null;
                }

                if (data.nummer) data.nummer = parseInt(data.nummer);
                
                appCallbacks.saveSpieler(data, id, wasMarkedForDeletion ? null : file);
            });
        }
        const matchtagForm = document.getElementById('matchtagForm');
        if(matchtagForm) {
            matchtagForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                const data = Object.fromEntries(formData.entries());
                appCallbacks.saveMatchtag(data.id, {
                    gegner: data.gegner,
                    spielort: data.spielort,
                    toreHeim: data.toreHeim === '' ? null : parseInt(data.toreHeim),
                    toreAuswaerts: data.toreAuswaerts === '' ? null : parseInt(data.toreAuswaerts),
                    spielArt: data.spielArt,
                    time: data.time || null
                });
            });
            const heimBtn = document.getElementById('heimBtn');
            const auswaertsBtn = document.getElementById('auswaertsBtn');
            const spielortInput = document.querySelector('input[name="spielort"]');
            if (heimBtn && auswaertsBtn && spielortInput) {
                heimBtn.addEventListener('click', () => {
                    spielortInput.value = 'Heim';
                    heimBtn.classList.add('bg-green-600', 'text-white');
                    heimBtn.classList.remove('bg-gray-200', 'dark:bg-gray-700');
                    auswaertsBtn.classList.remove('bg-green-600', 'text-white');
                    auswaertsBtn.classList.add('bg-gray-200', 'dark:bg-gray-700');
                });
                auswaertsBtn.addEventListener('click', () => {
                    spielortInput.value = 'Auswärts';
                    auswaertsBtn.classList.add('bg-green-600', 'text-white');
                    auswaertsBtn.classList.remove('bg-gray-200', 'dark:bg-gray-700');
                    heimBtn.classList.remove('bg-green-600', 'text-white');
                    heimBtn.classList.add('bg-gray-200', 'dark:bg-gray-700');
                });
            }
        }
        const trainingDetailForm = document.getElementById('trainingDetailForm');
        if (trainingDetailForm) {
            trainingDetailForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                const data = Object.fromEntries(formData.entries());
                appCallbacks.saveTrainingDetails(data.id, { time: data.time });
            });
        }
        const mannschaftForm = document.getElementById('mannschaftForm');
        if (mannschaftForm) {
            mannschaftForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const form = e.target;
                const wasMarkedForDeletion = form.deleteEmblem.value === 'true';

                if (wasMarkedForDeletion) {
                    showModal(
                        "Emblem löschen?",
                        "Möchten Sie das Emblem wirklich löschen? Diese Änderung wird zusammen mit den anderen Mannschaftsinformationen gespeichert.",
                        [
                            { text: 'Abbrechen', class: 'bg-gray-500' },
                            { 
                                text: 'Ja, speichern & löschen', 
                                class: 'bg-red-600', 
                                onClick: () => {
                                    appCallbacks.saveMannschaftInfo(form, wasMarkedForDeletion);
                                }
                            }
                        ]
                    );
                } else {
                    appCallbacks.saveMannschaftInfo(form, wasMarkedForDeletion);
                }
            });
        }

        const emblemUpload = document.getElementById('emblemUpload');
        if (emblemUpload) {
            emblemUpload.addEventListener('change', (e) => {
                const file = e.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = (event) => {
                        const vorschau = document.getElementById('emblemVorschau');
                        if (vorschau) {
                            vorschau.src = event.target.result;
                            vorschau.classList.remove('hidden');
                        }
                    }
                    reader.readAsDataURL(file);
                }
            });
        }
        const trainingsForm = document.getElementById('trainingsForm');
        if (trainingsForm) {
            trainingsForm.addEventListener('submit', (e) => {
                e.preventDefault();
                appCallbacks.saveTrainingSchedule(e.target);
            });
        }
        const jsonImportInput = document.getElementById('jsonImportInput');
        if (jsonImportInput) {
            jsonImportInput.addEventListener('change', (e) => {
                const file = e.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = (event) => {
                        appCallbacks.importJSONData(event.target.result);
                    };
                    reader.readAsText(file);
                }
            });
        }
        
        // KORREKTUR: Alle fehlenden Event Listeners wieder hinzugefügt
        const addTrainingBtn = document.getElementById('add-training-btn');
        if (addTrainingBtn) {
            addTrainingBtn.addEventListener('click', () => appCallbacks.showAddEventModal('training'));
        }

        const addMatchBtn = document.getElementById('add-match-btn');
        if (addMatchBtn) {
            addMatchBtn.addEventListener('click', () => appCallbacks.showAddEventModal('match'));
        }
        
        const showAllTrainingsBtn = document.getElementById('show-all-trainings-btn');
        if (showAllTrainingsBtn) {
            showAllTrainingsBtn.addEventListener('click', () => appCallbacks.setTrainingListView('all'));
        }

        const showTop10TrainingsBtn = document.getElementById('show-top10-trainings-btn');
        if (showTop10TrainingsBtn) {
            showTop10TrainingsBtn.addEventListener('click', () => appCallbacks.setTrainingListView('top10'));
        }

        const showAllMatchesBtn = document.getElementById('show-all-matches-btn');
        if (showAllMatchesBtn) {
            showAllMatchesBtn.addEventListener('click', () => appCallbacks.setMatchtagListView('all'));
        }

        const showTop10MatchesBtn = document.getElementById('show-top10-matches-btn');
        if (showTop10MatchesBtn) {
            showTop10MatchesBtn.addEventListener('click', () => appCallbacks.setMatchtagListView('top10'));
        }
        
        const filterMatchesBtn = document.getElementById('filter-matches-btn');
        if (filterMatchesBtn) {
            filterMatchesBtn.addEventListener('click', () => appCallbacks.setStatsFilter('matches'));
        }

        const filterMinutenBtn = document.getElementById('filter-minuten-btn');
        if (filterMinutenBtn) {
            filterMinutenBtn.addEventListener('click', () => appCallbacks.setStatsFilter('minuten'));
        }

        const filterToreBtn = document.getElementById('filter-tore-btn');
        if (filterToreBtn) {
            filterToreBtn.addEventListener('click', () => appCallbacks.setStatsFilter('tore'));
        }

        const filterVorlagenBtn = document.getElementById('filter-vorlagen-btn');
        if (filterVorlagenBtn) {
            filterVorlagenBtn.addEventListener('click', () => appCallbacks.setStatsFilter('vorlagen'));
        }

        document.querySelectorAll('.training-card').forEach(card => {
            card.addEventListener('click', (e) => appCallbacks.navigateTo('trainingDetail', e.currentTarget.dataset.id));
        });
        
        document.querySelectorAll('.match-card').forEach(card => {
            card.addEventListener('click', (e) => appCallbacks.navigateTo('matchtagDetail', e.currentTarget.dataset.id));
        });
        
        document.querySelectorAll('.spieler-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                appCallbacks.navigateTo('spielerDetail', e.currentTarget.dataset.id);
            });
        });
        
        document.querySelectorAll('.anwesenheit-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                appCallbacks.setAnwesenheit(state.currentId, e.currentTarget.dataset.spielerId, e.currentTarget.dataset.status);
            });
        });
        
        document.querySelectorAll('.match-position-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                appCallbacks.updateSpielerMatchDetails(state.currentId, e.currentTarget.dataset.spielerId, 'position', e.currentTarget.dataset.position);
            });
        });
        
        document.querySelectorAll('.match-stat-input').forEach(input => {
            input.addEventListener('change', (e) => {
                appCallbacks.updateSpielerMatchDetails(state.currentId, e.currentTarget.dataset.spielerId, e.currentTarget.dataset.field, e.currentTarget.value);
            });
        });

        const toggleTrainingBtn = document.getElementById('toggle-training-cancellation');
        if (toggleTrainingBtn) {
            toggleTrainingBtn.addEventListener('click', () => appCallbacks.toggleTrainingCancellation(state.currentId));
        }

        const deleteTrainingBtn = document.getElementById('delete-training-btn');
        if (deleteTrainingBtn) {
            deleteTrainingBtn.addEventListener('click', () => appCallbacks.deleteTraining(state.currentId));
        }

        const toggleMatchBtn = document.getElementById('toggle-match-cancellation');
        if (toggleMatchBtn) {
            toggleMatchBtn.addEventListener('click', () => appCallbacks.toggleMatchCancellation(state.currentId));
        }

        const deleteMatchBtn = document.getElementById('delete-match-btn');
        if (deleteMatchBtn) {
            deleteMatchBtn.addEventListener('click', () => appCallbacks.deleteMatchtag(state.currentId));
        }

        const washJerseysBtn = document.getElementById('wash-jerseys-btn');
        if (washJerseysBtn) {
            washJerseysBtn.addEventListener('click', () => appCallbacks.navigateTo('trikotsWaschen'));
        }

        document.querySelectorAll('.trikot-select').forEach(select => {
            select.addEventListener('change', (e) => {
                const matchId = e.target.dataset.matchId;
                const spielerId = e.target.value;
                appCallbacks.saveTrikotwaescher(matchId, spielerId);
            });
        });

        const saveWahlBtn = document.getElementById('saveWahl');
        if (saveWahlBtn) {
            saveWahlBtn.addEventListener('click', () => {
                console.log('saveWahlBtn clicked');
                appCallbacks.saveSpielfuehrerWahl(state.spielfuehrerWahl.votes);
            });
        }

        // The wahlForm is no longer used, as the votes are saved on change.
    }
};

window.app = appCallbacks;
window.app.init();