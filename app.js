import { state, setupDbRefs, setFilter, setStatsFilter, setSort, setHomeCalendarFilter, setTrainingListView, setMatchtagListView } from './state.js';
import { db, auth, APP_VERSION, saveSpieler, deleteSpieler, setAnwesenheit, toggleTrainingCancellation, deleteTraining, saveMatchtag, updateSpielerMatchDetails, toggleMatchCancellation, deleteMatchtag, saveMannschaftInfo, saveTrainingSchedule, generateRecurringTrainings, exportData, importJSONData, deleteAllData, deleteCollectionData, deleteMannschaftInfo, saveFormation, saveTrainingDetails, appId } from './api.js';
import { showModal, closeModal, showAddEventModal, showExportOptionsModal, showFormationModal, showEventDetailModal, showDeleteOptionsModal, confirmDeletion } from './modals.js';
import { render } from './render.js';
import { fetchHolidaysForYear } from './utils.js';
import * as firestoreModule from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";
import { collection, onSnapshot, doc, query, orderBy } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";
import { signInAnonymously, signInWithCustomToken } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";

// --- Globaler App-Status & Logik ---
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
    setAnwesenheit: (datumString, spielerId, status) => setAnwesenheit(datumString, spielerId, status),
    toggleTrainingCancellation: (datumString) => toggleTrainingCancellation(datumString),
    deleteTraining: (datumString) => deleteTraining(datumString, appCallbacks),
    saveMatchtag: (datumString, data) => saveMatchtag(datumString, data, appCallbacks),
    updateSpielerMatchDetails: (datumString, spielerId, field, value) => updateSpielerMatchDetails(datumString, spielerId, field, value),
    toggleMatchCancellation: (datumString) => toggleMatchCancellation(datumString),
    deleteMatchtag: (datumString) => deleteMatchtag(datumString, appCallbacks),
    saveMannschaftInfo: (form) => saveMannschaftInfo(form, appCallbacks),
    saveTrainingSchedule: (form) => saveTrainingSchedule(form, appCallbacks),
    generateRecurringTrainings: (schedule, endDateString) => generateRecurringTrainings(schedule, endDateString, appCallbacks),
    exportData: (type = 'all') => exportData(type),
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
    saveFormation: (matchtagId, formationData) => saveFormation(matchtagId, formationData),
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
    }
};

window.app = appCallbacks;
window.app.init();
