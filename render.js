import { state } from './state.js';
import { formatDate, parseDateString, getAktuellerStatus, getStatusIndicator, getTrainingsAnzahlGesamt, getMatchAnzahlGesamt, getSpielminutenGesamt, getToreGesamt, getVorlagenGesamt, berechneAlter, formatDateWithWeekday } from './utils.js';

const appContainer = document.getElementById('app-container');
const placeholderBg = () => '475569';
const placeholderText = () => 'E2E8F0';

// =================================================================
// EINSTELLUNGEN-VIEW LOGIK
// =================================================================
const renderEinstellungen = () => {
    const emblemVorschauHtml = state.teamInfo.emblemUrl
        ? `<img id="emblemVorschau" src="${state.teamInfo.emblemUrl}" class="w-24 h-24 rounded-full mx-auto object-cover">`
        : `<img id="emblemVorschau" src="#" alt="Vorschau" class="w-24 h-24 rounded-full mx-auto object-cover hidden">`;
    return `
        <div class="p-6 rounded-xl border border-gray-700">
            <h2 class="text-xl font-bold text-center">Darstellung</h2>
            <p class="text-center text-gray-500 dark:text-gray-400">Der Dunkelmodus ist standardmäßig aktiviert.</p>
        </div>
        <div class="p-6 rounded-xl border border-gray-700">
            <h2 class="text-xl font-bold text-center">Mannschaft</h2>
            <form id="mannschaftForm" class="space-y-3">
                <div>
                    <label class="font-semibold text-sm">Mannschaftsname</label>
                    <input type="text" name="name" value="${state.teamInfo.name || ''}" class="w-full p-2 mt-1 bg-gray-100 dark:bg-gray-700 dark:text-gray-200 rounded-lg">
                </div>
                <div>
                    <label class="font-semibold text-sm">Mannschaftsname (Zeile 2)</label>
                    <input type="text" name="name2" value="${state.teamInfo.name2 || ''}" class="w-full p-2 mt-1 bg-gray-100 dark:bg-gray-700 dark:text-gray-200 rounded-lg">
                </div>
                <div>
                    <label class="font-semibold text-sm">Vereinsemblem</label>
                    ${emblemVorschauHtml}
                    <input type="file" name="emblem" id="emblemUpload" accept="image/*" class="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100 mt-2 dark:text-gray-400 dark:file:bg-gray-700 dark:file:text-gray-300 dark:hover:file:bg-gray-600">
                    ${state.teamInfo.emblemUrl ? `<button type="button" id="delete-emblem-btn" class="w-full mt-2 py-2 text-sm text-white bg-red-600 hover:bg-red-700 rounded-lg btn">Emblem löschen</button>` : ''}
                </div>
                <button type="submit" class="w-full py-3 mt-4 font-medium text-white uppercase bg-green-600 rounded-lg shadow-lg hover:bg-green-700 btn">Mannschaftsinfo Speichern</button>
            </form>
        </div>
        <div class="p-6 rounded-xl border border-gray-700">
            <h2 class="text-xl font-bold text-center">Regelmäßige Trainingseinheiten</h2>
            <form id="trainingsForm" class="space-y-3">
                ${
                    ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag', 'Sonntag'].map(tag => {
                        const schedule = state.teamInfo.trainingSchedule || {};
                        const isChecked = !!schedule[tag];
                        const timeValue = schedule[tag] || '';
                        return `
                            <div class="flex items-center justify-between p-2 rounded-lg hover:bg-gray-700/50">
                                <label for="training_${tag}" class="flex items-center space-x-3 flex-grow cursor-pointer">
                                    <input type="checkbox" id="training_${tag}" name="wochentag" value="${tag}" ${isChecked ? 'checked' : ''} class="h-5 w-5 rounded text-green-600 focus:ring-green-500">
                                    <span>${tag}</span>
                                </label>
                                <input type="time" name="zeit_${tag}" value="${timeValue}" class="p-1 bg-gray-100 dark:bg-gray-700 dark:text-gray-200 rounded-lg w-32 border dark:border-gray-600 focus:ring-green-500 focus:border-green-500">
                            </div>
                            `;
                    }).join('')
                }
                <div class="border-t dark:border-gray-700 pt-4">
                    <label for="trainingEndDate" class="font-semibold text-sm">Trainings automatisch eintragen bis:</label>
                    <input type="date" id="trainingEndDate" name="trainingEndDate" value="${state.teamInfo.trainingEndDate || ''}" class="w-full p-2 mt-1 bg-gray-100 dark:bg-gray-700 dark:text-gray-200 rounded-lg">
                </div>
                <button type="submit" class="w-full py-3 mt-4 font-medium text-white uppercase bg-blue-600 rounded-lg shadow-lg hover:bg-blue-700 btn">Trainingsplan Speichern & Kalender Aktualisieren</button>
            </form>
        </div>
        <div class="p-6 rounded-xl border border-gray-700">
            <h2 class="text-xl font-bold text-center">Datenverwaltung</h2>
            <input type="file" id="jsonImportInput" accept=".json" class="hidden">
            <button onclick="window.app.importData()" class="w-full py-3 font-medium text-white uppercase bg-blue-600 rounded-lg shadow-lg hover:bg-blue-700 btn">Daten Importieren (JSON)</button>
            <button onclick="window.app.showExportOptionsModal()" class="w-full py-3 font-medium text-white uppercase bg-gray-600 rounded-lg shadow-lg hover:bg-gray-700 btn">Daten Exportieren (JSON)</button>
            <button onclick="window.app.showDeleteOptionsModal()" class="w-full py-3 font-medium text-white uppercase bg-red-600 rounded-lg shadow-lg hover:bg-red-700 btn mt-4">Daten löschen</button>
        </div>
    `;
};


// =================================================================
// EVENTS-VIEW LOGIK
// =================================================================
const createTrainingCardHtml = (training, aktiveSpielerCount) => { /* ... unchanged ... */ };
const createMatchtagCardHtml = (matchtag) => { /* ... unchanged ... */ };
const createTop10CardHtml = (spieler, index, statText, baseClass) => { /* ... unchanged ... */ };
const renderTrainingUebersicht = (callbacks) => { /* ... unchanged ... */ };
const renderMatchtagUebersicht = (callbacks) => { /* ... unchanged ... */ };
const renderTrainingDetail = (callbacks) => { /* ... unchanged ... */ };
const renderMatchtagDetail = (callbacks) => { /* ... unchanged ... */ };


// =================================================================
// HOME-VIEW LOGIK
// =================================================================
const renderHome = (callbacks) => { /* ... unchanged ... */ };


// =================================================================
// SPIELER-VIEW LOGIK
// =================================================================
const createSpielerCardHtml = (spieler, totalTrainings) => { /* ... unchanged ... */ };
const renderSpielerUebersicht = (callbacks) => { /* ... unchanged ... */ };
const renderSpielerDetail = (callbacks) => { /* ... unchanged ... */ };

const renderSpielerForm = (callbacks) => {
    const isEditing = !!state.currentId;
    const spielerToEdit = isEditing ? state.spieler.find(s => s.id === state.currentId) : {};
    const fotoVorschauHtml = spielerToEdit.fotoUrl
        ? `<img id="fotoVorschau" src="${spielerToEdit.fotoUrl}" class="w-24 h-24 rounded-full mx-auto object-cover">`
        : `<img id="fotoVorschau" src="#" alt="Vorschau" class="w-24 h-24 rounded-full mx-auto object-cover hidden">`;

    return `
        <form id="spielerForm">
            <div class="p-6 rounded-xl space-y-3 border border-gray-700">
                <h2 class="text-xl font-bold text-center">Stammdaten</h2>
                <input type="hidden" name="id" value="${spielerToEdit.id || ''}">
                <div>
                    <label class="font-semibold">Profilfoto</label>
                    ${fotoVorschauHtml}
                    <input type="file" name="foto" id="fotoUpload" accept="image/*" class="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100 mt-2 dark:text-gray-400 dark:file:bg-gray-700 dark:file:text-gray-300 dark:hover:file:bg-gray-600">
                    ${spielerToEdit.fotoUrl ? `<button type="button" id="delete-foto-btn" class="w-full mt-2 py-2 text-sm text-white bg-red-600 hover:bg-red-700 rounded-lg btn">Foto löschen</button>` : ''}
                </div>
                <div>
                    <label class="font-semibold">Name</label>
                    <input type="text" name="name" value="${spielerToEdit.name || ''}" class="w-full p-2 mt-1 bg-gray-100 dark:bg-gray-700 dark:text-gray-200 rounded-lg" required>
                </div>
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <label class="font-semibold">Nummer</label>
                        <input type="number" name="nummer" value="${spielerToEdit.nummer || ''}" class="w-full p-2 mt-1 bg-gray-100 dark:bg-gray-700 dark:text-gray-200 rounded-lg">
                    </div>
                    <div>
                        <label class="font-semibold">Geburtstag</label>
                        <input type="date" name="geburtstag" value="${spielerToEdit.geburtstag || ''}" class="w-full p-2 mt-1 bg-gray-100 dark:bg-gray-700 dark:text-gray-200 rounded-lg">
                    </div>
                </div>
                <div>
                    <label class="font-semibold">Position</label>
                    <select name="position" class="w-full p-2 mt-1 bg-gray-100 dark:bg-gray-700 dark:text-gray-200 rounded-lg">
                        <option value="Torwart" ${spielerToEdit.position === 'Torwart' ? 'selected' : ''}>Torwart</option>
                        <option value="Abwehr" ${spielerToEdit.position === 'Abwehr' ? 'selected' : ''}>Abwehr</option>
                        <option value="Mittelfeld" ${spielerToEdit.position === 'Mittelfeld' ? 'selected' : ''}>Mittelfeld</option>
                        <option value="Sturm" ${spielerToEdit.position === 'Sturm' ? 'selected' : ''}>Sturm</option>
                    </select>
                </div>
            </div>

            <div class="p-6 rounded-xl space-y-3 border border-gray-700">
                <h2 class="text-xl font-bold text-center">Status & Abwesenheiten</h2>
                <div>
                    <label class="font-semibold">Manueller Status</label>
                    <select name="status" class="w-full p-2 mt-1 bg-gray-100 dark:bg-gray-700 dark:text-gray-200 rounded-lg">
                        <option value="Aktiv" ${spielerToEdit.status === 'Aktiv' ? 'selected' : ''}>Aktiv</option>
                        <option value="Inaktiv" ${spielerToEdit.status === 'Inaktiv' ? 'selected' : ''}>Inaktiv</option>
                        <option value="Gesperrt" ${spielerToEdit.status === 'Gesperrt' ? 'selected' : ''}>Gesperrt</option>
                        <option value="Krank" ${spielerToEdit.status === 'Krank' ? 'selected' : ''}>Krank</option>
                        <option value="Urlaub" ${spielerToEdit.status === 'Urlaub' ? 'selected' : ''}>Urlaub</option>
                        <option value="Verletzt" ${spielerToEdit.status === 'Verletzt' ? 'selected' : ''}>Verletzt</option>
                    </select>
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label class="text-sm">Urlaub von</label>
                        <div class="flex items-center gap-2">
                            <input type="date" name="urlaubVon" id="urlaubVonInput" value="${spielerToEdit.urlaubVon || ''}" class="flex-grow p-2 mt-1 bg-gray-100 dark:bg-gray-700 dark:text-gray-200 rounded-lg">
                            <button type="button" onclick="window.app.clearDateField('urlaubVonInput')" class="p-2 mt-1 bg-red-100 text-red-600 rounded-lg btn" title="Datum löschen"><i class="fas fa-times"></i></button>
                        </div>
                    </div>
                    <div>
                        <label class="text-sm">Urlaub bis</label>
                        <div class="flex items-center gap-2">
                            <input type="date" name="urlaubBis" id="urlaubBisInput" value="${spielerToEdit.urlaubBis || ''}" class="flex-grow p-2 mt-1 bg-gray-100 dark:bg-gray-700 dark:text-gray-200 rounded-lg">
                            <button type="button" onclick="window.app.clearDateField('urlaubBisInput')" class="p-2 mt-1 bg-red-100 text-red-600 rounded-lg btn" title="Datum löschen"><i class="fas fa-times"></i></button>
                        </div>
                    </div>
                </div>
                <div class="mt-2">
                    <label class="font-semibold">Verletzt bis</label>
                    <div class="flex items-center gap-2">
                        <input type="date" name="verletztBis" id="verletztBisInput" value="${spielerToEdit.verletztBis || ''}" class="flex-grow p-2 mt-1 bg-gray-100 dark:bg-gray-700 dark:text-gray-200 rounded-lg">
                        <button type="button" onclick="window.app.clearDateField('verletztBisInput')" class="p-2 mt-1 bg-red-100 text-red-600 rounded-lg btn" title="Datum löschen"><i class="fas fa-times"></i></button>
                        </div>
                </div>
            </div>

            <div class="p-6 rounded-xl space-y-3 border border-gray-700">
                <h2 class="text-xl font-bold text-center">Notizen</h2>
                <div>
                    <textarea name="notiz" rows="3" class="w-full p-2 mt-1 bg-gray-100 dark:bg-gray-700 dark:text-gray-200 rounded-lg">${spielerToEdit.notiz || ''}</textarea>
                </div>
            </div>
            <button type="submit" class="w-full py-3 mt-4 font-medium text-white uppercase bg-green-600 rounded-lg shadow-lg hover:bg-green-700 btn">Speichern</button>
        </form>
    `;
};


// =================================================================
// HAUPT-RENDER FUNKTION
// =================================================================
export const render = (callbacks) => {
    appContainer.innerHTML = '';

    const header = (title) => { /* ... unchanged ... */ };
    const navigationBarHtml = () => { /* ... unchanged ... */ };

    if (state.loading) {
        appContainer.innerHTML = `<div class="flex justify-center items-center h-screen"><div class="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-green-500"></div></div>`;
    } else {
        let pageContent = '', pageTitle = '';
        switch (state.currentPage) {
            case 'login':
                pageContent = `
                    <div class="min-h-screen flex flex-col justify-center items-center p-4 bg-gray-900">
                        <div class="w-full max-w-md">
                            <div class="bg-gray-800/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg text-center">
                                <div class="flex justify-center mb-6">
                                    ${state.teamInfo.emblemUrl
                                        ? `<img src="${state.teamInfo.emblemUrl}" class="w-20 h-20 rounded-full object-cover shadow-md" onerror="this.style.display='none';">`
                                        : `<div class="w-20 h-20 rounded-full bg-gray-600 flex items-center justify-center text-4xl text-gray-500 shadow-md"></div>`
                                    }
                                </div>
                                <h1 class="text-2xl font-bold text-gray-200 mb-2">Willkommen</h1>
                                <p class="text-gray-400 mb-8">${state.teamInfo.name2 || 'Bitte melden Sie sich an'}</p>
                                <form id="loginForm" class="space-y-6">
                                    <div class="relative">
                                        <span class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"><i class="fas fa-envelope"></i></span>
                                        <input type="email" id="email" name="email" class="w-full p-3 pl-12 text-gray-300 bg-gray-700 rounded-lg focus:outline-none focus:bg-gray-600 focus:ring-2 focus:ring-green-500 transition-all" value="trainer@demo.com" placeholder="Benutzer (E-Mail)" required>
                                    </div>
                                    <div class="relative">
                                        <span class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"><i class="fas fa-lock"></i></span>
                                        <input type="password" id="password" name="password" class="w-full p-3 pl-12 text-gray-300 bg-gray-700 rounded-lg focus:outline-none focus:bg-gray-600 focus:ring-2 focus:ring-green-500 transition-all" value="1234" placeholder="Passwort" required>
                                    </div>
                                    <div>
                                        <button type="submit" class="w-full py-3 mt-6 font-medium tracking-widest text-white uppercase bg-gradient-to-r from-green-500 to-green-600 rounded-lg shadow-lg focus:outline-none hover:from-green-600 hover:to-green-700 hover:shadow-xl btn">Anmelden</button>
                                    </div>
                                </form>
                            </div>
                            <p class="text-center text-gray-400 text-xs mt-4">${callbacks.getCurrentVersion()}</p>
                        </div>
                    </div>
                `;
                break;
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
