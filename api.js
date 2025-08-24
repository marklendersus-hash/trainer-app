// =================================================================
// FILENAME: app.js
// =================================================================
import { state, setupDbRefs, setFilter, setStatsFilter, setSort, setHomeCalendarFilter, setTrainingListView, setMatchtagListView } from './state.js';
import { db, auth, APP_VERSION, saveSpieler, deleteSpieler, setAnwesenheit, toggleTrainingCancellation, deleteTraining, saveMatchtag, updateSpielerMatchDetails, toggleMatchCancellation, deleteMatchtag, saveMannschaftInfo, saveTrainingSchedule, generateRecurringTrainings, exportData, importJSONData, deleteAllData, deleteCollectionData, deleteMannschaftInfo, saveFormation, saveTrainingDetails, appId } from './api.js';
import { showModal, closeModal, showAddEventModal, showExportOptionsModal, showFormationModal, showEventDetailModal, showDeleteOptionsModal, confirmDeletion } from './modals.js';
import { render } from './render.js';
import { fetchHolidaysForYear, parseDateString } from './utils.js';
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


// =================================================================
// FILENAME: api.js
// =================================================================
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { getFirestore, collection, doc, addDoc, setDoc, deleteDoc, updateDoc, query, getDoc, where, getDocs, writeBatch, setLogLevel } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
import { state } from './state.js';
import { showModal, closeModal } from './modals.js';

export const APP_VERSION = `Version 2025-08-24-002 B2-Storage`;
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

// ... (rest of api.js functions remain the same) ...


// =================================================================
// FILENAME: render.js
// =================================================================
import { state } from './state.js';
import { renderHome } from './home-view.js';
import { renderSpielerUebersicht, renderSpielerDetail, renderSpielerForm } from './spieler-view.js';
import { renderTrainingUebersicht, renderMatchtagUebersicht, renderTrainingDetail, renderMatchtagDetail } from './events-view.js';
import { renderEinstellungen } from './einstellungen-view.js';

const appContainer = document.getElementById('app-container');

export const render = (callbacks) => {
    appContainer.innerHTML = '';

    const header = (title) => {
        const displayTitle = state.teamInfo.name || title;
        const displayTitle2 = state.teamInfo.name2 || '';
        const emblemHtml = state.teamInfo.emblemUrl
            ? `<img src="${state.teamInfo.emblemUrl}" class="w-8 h-8 rounded-full object-cover mr-3 flex-shrink-0" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
               <div class="w-8 h-8 rounded-full bg-gray-500 flex-shrink-0 mr-3 hidden items-center justify-center"></div>`
            : `<div class="w-8 h-8 rounded-full bg-gray-500 flex-shrink-0 mr-3 flex items-center justify-center"></div>`;
        const titleClass = (displayTitle.length > 15) ? 'text-base font-bold' : 'text-lg font-bold';

        return `
        <header class="bg-white text-gray-800 p-4 sticky top-0 z-50 flex items-center justify-between text-center h-16 border-b-2 border-green-600 dark:bg-gray-800 dark:text-gray-200 dark:border-green-500">
            ${state.isLoggedIn ? `<button onclick="window.app.navigateTo('einstellungen', null, true)" class="flex flex-col items-center justify-center text-gray-600 hover:text-green-600 w-12 h-12 rounded-full hover:bg-gray-100 transition-colors dark:text-gray-400 dark:hover:text-green-400 dark:hover:bg-gray-700 absolute top-2 left-2" title="Einstellungen"><i class="fas fa-cog text-xl"></i></button>` : ''}
            <div class="flex items-center justify-center flex-grow">
                ${emblemHtml}
                <div>
                    <h1 class="${titleClass} whitespace-nowrap">${displayTitle}</h1>
                    ${displayTitle2 ? `<h2 class="text-sm text-gray-500 dark:text-gray-400 leading-tight whitespace-nowrap">${displayTitle2}</h2>` : ''}
                </div>
            </div>
            ${state.isLoggedIn ? `<button onclick="window.app.logout()" class="flex flex-col items-center justify-center text-gray-600 hover:text-green-600 w-12 h-12 rounded-full hover:bg-gray-100 transition-colors dark:text-gray-400 dark:hover:text-green-400 dark:hover:bg-gray-700 absolute top-2 right-2" title="Ausloggen"><i class="fas fa-sign-out-alt text-xl"></i></button>` : ''}
        </header>`;
    };

    const navigationBarHtml = () => {
        if (state.currentPage === 'login' || !state.isLoggedIn) return '';
        const showBack = state.navigationStack.length > 0 && state.currentPage !== 'home';
        const buttonSizeClass = 'w-16 h-16';
        const navButton = (page, icon, title) => {
            const activePages = {
                'home': ['home', 'eventDetail'],
                'spielerUebersicht': ['spielerUebersicht', 'spielerDetail', 'spielerForm'],
                'trainingUebersicht': ['trainingUebersicht', 'trainingDetail'],
                'matchtagUebersicht': ['matchtagUebersicht', 'matchtagDetail'],
                'einstellungen': ['einstellungen']
            };
            const isActive = activePages[page]?.includes(state.currentPage);
            const activeClass = 'text-green-600 dark:text-green-400';
            return `<div class="flex-1 flex justify-center items-center">
                        <button onclick="window.app.navigateTo('${page}', null, true)" class="flex flex-col items-center justify-center text-gray-600 hover:text-green-600 ${buttonSizeClass} rounded-full hover:bg-gray-100 transition-colors ${isActive ? activeClass : ''} dark:text-gray-400 dark:hover:text-green-400 dark:hover:bg-gray-700" title="${title}">
                            <i class="fas ${icon} text-xl"></i>
                            <span class="text-xs mt-1">${title}</span>
                        </button>
                    </div>`;
        };
        let leftButtonHtml = showBack
            ? `<div class="flex-1 flex justify-center items-center"><button onclick="window.app.goBack()" class="flex flex-col items-center justify-center text-gray-600 hover:text-green-600 ${buttonSizeClass} rounded-full hover:bg-gray-100 transition-colors dark:text-gray-400 dark:hover:text-green-400 dark:hover:bg-gray-700" title="Zurück"><i class="fas fa-arrow-left text-xl"></i><span class="text-xs mt-1">Zurück</span></button></div>`
            : navButton('home', 'fa-home', 'Home');
        return `
            <div class="fixed bottom-0 left-0 right-0 z-40 p-4">
                <div class="bg-gradient-to-b from-gray-50 to-white border border-gray-200/75 shadow-lg rounded-full px-2 py-2 w-full max-w-sm mx-auto dark:from-gray-700 dark:to-gray-800 dark:border-gray-600/75">
                    <div class="flex justify-around items-center">
                        ${leftButtonHtml}
                        ${navButton('trainingUebersicht', 'fa-running', 'Training')}
                        ${navButton('matchtagUebersicht', 'fa-futbol', 'Matches')}
                        ${navButton('spielerUebersicht', 'fa-users', 'Spieler')}
                    </div>
                </div>
            </div>`;
    };

    if (state.loading) {
        appContainer.innerHTML = `<div class="flex justify-center items-center h-screen"><div class="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-green-500"></div></div>`;
    } else {
        let pageContent = '', pageTitle = '';
        switch (state.currentPage) {
            case 'login': pageContent = `...`; break; // Login HTML omitted for brevity
            case 'home': pageTitle = 'Home Übersicht'; pageContent = renderHome(callbacks); break;
            case 'spielerUebersicht': pageTitle = 'Spielerübersicht'; pageContent = renderSpielerUebersicht(callbacks); break;
            case 'spielerDetail': pageTitle = 'Spieler Detail'; pageContent = renderSpielerDetail(callbacks); break;
            case 'spielerForm': pageTitle = 'Spieler bearbeiten'; pageContent = renderSpielerForm(callbacks); break;
            case 'trainingUebersicht': pageTitle = 'Training'; pageContent = renderTrainingUebersicht(callbacks); break;
            case 'trainingDetail': pageTitle = 'Training Details'; pageContent = renderTrainingDetail(callbacks); break;
            case 'matchtagUebersicht': pageTitle = 'Matchtage'; pageContent = renderMatchtagUebersicht(callbacks); break;
            case 'matchtagDetail': pageTitle = 'Matchtag Details'; pageContent = renderMatchtagDetail(callbacks); break;
            case 'einstellungen': pageTitle = 'Einstellungen'; pageContent = renderEinstellungen(callbacks); break;
            default: pageTitle = 'Fehler'; pageContent = `<p>Seite nicht gefunden.</p>`;
        }
        appContainer.innerHTML = state.currentPage === 'login' ? pageContent : `${header(pageTitle)}${navigationBarHtml()}<main class="p-4 space-y-4 pb-24">${pageContent}</main>`;
        callbacks.addEventListeners();
    }
};


// =================================================================
// FILENAME: einstellungen-view.js
// =================================================================
import { state } from './state.js';

export const renderEinstellungen = () => {
    // ... (content of einstellungen-view.js)
    return `...`;
};


// =================================================================
// FILENAME: events-view.js
// =================================================================
import { state } from './state.js';
import { getAktuellerStatus, getStatusIndicator, formatDate, formatDateWithWeekday, getMatchAnzahlGesamt, getSpielminutenGesamt, getToreGesamt, getVorlagenGesamt, getTrainingsAnzahlGesamt } from './utils.js';

// ... (content of events-view.js)


// =================================================================
// FILENAME: home-view.js
// =================================================================
import { state } from './state.js';
import { formatDate, parseDateString } from './utils.js';

// ... (content of home-view.js)


// =================================================================
// FILENAME: modals.js
// =================================================================
import { state } from './state.js';
import { formatDateWithWeekday, berechneAlter, parseDateString, getAktuellerStatus, getStatusIndicator, formatDate } from './utils.js';

// ... (content of modals.js)


// =================================================================
// FILENAME: spieler-view.js
// =================================================================
import { state } from './state.js';
import { getAktuellerStatus, getStatusIndicator, formatDate, getTrainingsAnzahlGesamt, getMatchAnzahlGesamt, getSpielminutenGesamt, getToreGesamt, getVorlagenGesamt, berechneAlter, parseDateString } from './utils.js';

// ... (content of spieler-view.js)


// =================================================================
// FILENAME: sw.js (Service Worker)
// =================================================================
const CACHE_NAME = 'trainer-db-cache-v3'; // Increased version to force update
const urlsToCache = [
    '/',
    '/index.html',
    '/manifest.json',
    '/icons/icon-192x192.png',
    '/icons/icon-512x512.png',
    './utils.js',
    './state.js',
    './render.js',
    './api.js',
    './app.js',
    // KORREKTUR: style.css und ungenutztes firebase-storage.js entfernt
    'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
    'https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js',
    'https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js',
    'https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
    );
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.filter(cache => cache !== CACHE_NAME).map(cache => caches.delete(cache))
            );
        })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => response || fetch(event.request))
    );
});
