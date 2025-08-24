import { state, setupDbRefs, setFilter, setStatsFilter, setSort, setHomeCalendarFilter, setTrainingListView, setMatchtagListView } from './state.js';
import { db, auth, APP_VERSION, saveSpieler, deleteSpieler, setAnwesenheit, toggleTrainingCancellation, deleteTraining, saveMatchtag, updateSpielerMatchDetails, toggleMatchCancellation, deleteMatchtag, saveMannschaftInfo, saveTrainingSchedule, generateRecurringTrainings, exportData, importJSONData, deleteAllData, deleteCollectionData, deleteMannschaftInfo, saveFormation, saveTrainingDetails, appId } from './api.js';
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
    showModal(
        "Welche Daten möchten Sie löschen?",
        `
            <div class="space-y-3">
                <button onclick="window.app.confirmDeletion('all')" class="w-full py-3 font-medium text-white uppercase bg-red-600 rounded-lg shadow-lg hover:bg-red-700 btn">Alle App-Daten</button>
                <button onclick="window.app.confirmDeletion('spieler')" class="w-full py-3 font-medium text-white uppercase bg-yellow-600 rounded-lg shadow-lg hover:bg-yellow-700 btn">Nur Spielerdaten</button>
                <button onclick="window.app.confirmDeletion('training')" class="w-full py-3 font-medium text-white uppercase bg-yellow-600 rounded-lg shadow-lg hover:bg-yellow-700 btn">Nur Trainingsdaten</button>
                <button onclick="window.app.confirmDeletion('matchtage')" class="w-full py-3 font-medium text-white uppercase bg-yellow-600 rounded-lg shadow-lg hover:bg-yellow-700 btn">Nur Matchdaten</button>
                <button onclick="window.app.confirmDeletion('mannschaft')" class="w-full py-3 font-medium text-white uppercase bg-yellow-600 rounded-lg shadow-lg hover:bg-yellow-700 btn">Nur Mannschaftsinfo</button>
            </div>
        `,
        [{ text: 'Abbrechen', class: 'bg-gray-500' }]
    );
};

const showExportOptionsModal = (callbacks) => {
    showModal(
        "Welche Daten möchten Sie exportieren?",
        `
            <div class="space-y-3">
                <button onclick="window.app.exportData('all')" class="w-full py-3 font-medium text-white uppercase bg-green-600 rounded-lg shadow-lg hover:bg-green-700 btn">Alle Daten</button>
                <button onclick="window.app.exportData('spieler')" class="w-full py-3 font-medium text-white uppercase bg-green-600 rounded-lg shadow-lg hover:bg-green-700 btn">Nur Spielerdaten</button>
                <button onclick="window.app.exportData('training')" class="w-full py-3 font-medium text-white uppercase bg-green-600 rounded-lg shadow-lg hover:bg-green-700 btn">Nur Trainingsdaten</button>
                <button onclick="window.app.exportData('matchtage')" class="w-full py-3 font-medium text-white uppercase bg-green-600 rounded-lg shadow-lg hover:bg-green-700 btn">Nur Matchdaten</button>
            </div>
        `,
        [{ text: 'Abbrechen', class: 'bg-gray-500' }]
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

const showFormationModal = (matchtagId, callbacks) => { /* ... showFormationModal logic ... */ };
const showEventDetailModal = (dateString, callbacks) => { /* ... showEventDetailModal logic ... */ };


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
        const spielerCollection = collection(db, `artifacts/${appId}/public/data/spieler`);
        const trainingCollection = collection(db, `artifacts/${appId}/public/data/trainingseinheiten`);
        const matchtageCollection = collection(db, `artifacts/${appId}/public/data/spieltage`);
        const configDoc = doc(db, `artifacts/${appId}/public/data/config/team`);

        onSnapshot(query(spielerCollection, orderBy("name")), (snapshot) => {
            state.spieler = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            if(state.isLoggedIn) render(appCallbacks);
        });
        onSnapshot(query(trainingCollection), (snapshot) => {
            state.trainingseinheiten = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            if(state.isLoggedIn) render(appCallbacks);
        });
        onSnapshot(query(matchtageCollection), (snapshot) => {
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
            render(appCallbacks);
            window.scrollTo(0, 0);
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
                window.scrollTo(0, 0);
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
    setAnwesenheit: (datumString, spielerId, status) => setAnwesenheit(datumString, spielerId, status, appCallbacks),
    toggleTrainingCancellation: (datumString) => toggleTrainingCancellation(datumString, appCallbacks),
    deleteTraining: (datumString) => deleteTraining(datumString, appCallbacks),
    saveMatchtag: (datumString, data) => saveMatchtag(datumString, data, appCallbacks),
    updateSpielerMatchDetails: (datumString, spielerId, field, value) => updateSpielerMatchDetails(datumString, spielerId, field, value, appCallbacks),
    toggleMatchCancellation: (datumString) => toggleMatchCancellation(datumString, appCallbacks),
    deleteMatchtag: (datumString) => deleteMatchtag(datumString, appCallbacks),
    saveMannschaftInfo: (form) => saveMannschaftInfo(form, appCallbacks),
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
    clearDateField: (inputId) => { document.getElementById(inputId).value = ''; },
    showFormationModal: (matchtagId) => showFormationModal(matchtagId, appCallbacks),
    saveFormation: (matchtagId, formationData) => saveFormation(matchtagId, formationData, appCallbacks),
    saveTrainingDetails: (datumString, data) => saveTrainingDetails(datumString, data, appCallbacks),
    showEventDetailModal: (dateString) => showEventDetailModal(dateString, appCallbacks),
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
                Object.keys(data).forEach(key => {
                    if (data[key] === '') data[key] = null;
                });
                if (data.nummer) data.nummer = parseInt(data.nummer);
                appCallbacks.saveSpieler(data, id, file);
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
                appCallbacks.saveMannschaftInfo(e.target);
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
        
        const showFormationBtn = document.getElementById('show-formation-modal');
        if (showFormationBtn) {
            showFormationBtn.addEventListener('click', () => appCallbacks.showFormationModal(state.currentId));
        }
    }
};

window.app = appCallbacks;
window.app.init();
