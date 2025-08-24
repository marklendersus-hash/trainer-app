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
const createTrainingCardHtml = (training, aktiveSpielerCount) => {
    const anwesendCount = Object.values(training.teilnehmer || {}).filter(s => s === 'Anwesend').length;
    const percentage = aktiveSpielerCount > 0 ? Math.round((anwesendCount / aktiveSpielerCount) * 100) : 0;
    const isCancelled = training.cancelled;

    let statusText = `${percentage}% Anwesenheit`;
    let statusColor = 'text-blue-600 dark:text-blue-400';
    let statusIcon = 'fa-running';

    if (isCancelled) {
        statusText = 'Abgesagt';
        statusColor = 'text-red-500';
        statusIcon = 'fa-times-circle';
    } else if (aktiveSpielerCount === 0) {
        statusText = 'Keine aktiven Spieler';
        statusColor = 'text-gray-500 dark:text-gray-400';
    } else if (percentage === 100) {
        statusColor = 'text-green-600 dark:text-green-400';
    } else if (percentage < 50) {
        statusColor = 'text-orange-500';
    }

    return `
        <div data-id="${training.id}" class="flex justify-between items-center p-3 rounded-lg hover:bg-gray-700/50 cursor-pointer training-card">
            <div>
                <p class="font-semibold">${formatDateWithWeekday(training.id)} ${training.time ? `(${training.time} Uhr)` : ''}</p>
                <p class="text-sm ${statusColor} flex items-center gap-1"><i class="fas ${statusIcon}"></i> ${statusText}</p>
            </div>
            <i class="fas fa-chevron-right text-gray-400"></i>
        </div>
    `;
};

const createMatchtagCardHtml = (matchtag) => {
    const isCancelled = matchtag.cancelled;
    let resultText = `vs ${matchtag.gegner || 'Unbekannt'}`;
    let resultColor = 'text-gray-500 dark:text-gray-400';
    let resultIcon = 'fa-futbol';

    if (isCancelled) {
        resultText = 'Abgesagt';
        resultColor = 'text-red-500';
        resultIcon = 'fa-times-circle';
    } else if (matchtag.toreHeim !== null && matchtag.toreHeim !== undefined && matchtag.toreAuswaerts !== null && matchtag.toreAuswaerts !== undefined) {
        const heimTore = matchtag.spielort === 'Heim' ? matchtag.toreHeim : matchtag.toreAuswaerts;
        const gastTore = matchtag.spielort === 'Heim' ? matchtag.toreAuswaerts : matchtag.toreHeim;
        
        resultText = `${heimTore} : ${gastTore} gegen ${matchtag.gegner || 'Unbekannt'}`;
        if (heimTore > gastTore) {
            resultColor = 'text-green-600 dark:text-green-400';
        } else if (heimTore < gastTore) {
            resultColor = 'text-red-500';
        } else {
            resultColor = 'text-yellow-500';
        }
    }
    return `
        <div data-id="${matchtag.id}" class="flex justify-between items-center p-3 rounded-lg hover:bg-gray-700/50 cursor-pointer match-card">
            <div>
                <p class="font-semibold">${formatDateWithWeekday(matchtag.id)} ${matchtag.time ? `(${matchtag.time} Uhr)` : ''}</p>
                <p class="text-sm ${resultColor} flex items-center gap-1"><i class="fas ${resultIcon}"></i> ${resultText}</p>
            </div>
            <i class="fas fa-chevron-right text-gray-400"></i>
        </div>
    `;
};

const createTop10CardHtml = (spieler, index, statText, baseClass) => {
    return `
        <div class="flex justify-between items-center p-2 rounded-lg ${index < 3 ? baseClass : ''}">
            <div>
                <span class="font-semibold text-gray-500 dark:text-gray-400 w-8 inline-block">${index + 1}.</span>
                <button data-id="${spieler.id}" class="hover:text-blue-600 dark:hover:text-blue-400 spieler-link">${spieler.name}</button>
            </div>
            <span class="font-bold px-2 py-1 rounded-full text-sm">${statText}</span>
        </div>
    `;
};

const renderTrainingUebersicht = (callbacks) => {
    const addButtonHtml = `<div class="p-4 rounded-xl border border-gray-700">
        <button id="add-training-btn" class="w-full py-3 font-medium text-white uppercase bg-blue-600 rounded-lg shadow-lg hover:bg-blue-700 btn flex items-center justify-center gap-2">
            <i class="fas fa-plus"></i>
            Training hinzufügen
        </button>
    </div>`;

    let content = addButtonHtml;

    content += `
        <div class="p-4 rounded-xl border border-gray-700 mb-4">
            <div class="flex justify-between items-center gap-2">
                <button id="show-all-trainings-btn" class="px-4 py-2 rounded-lg btn ${state.trainingListView === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-700'}">Alle Trainingseinheiten</button>
                <button id="show-top10-trainings-btn" class="px-4 py-2 rounded-lg btn ${state.trainingListView === 'top10' ? 'bg-blue-600 text-white' : 'bg-gray-700'}">Top 10 Training-Statistik</button>
            </div>
        </div>
    `;

    const todayStringForTop = formatDate(new Date());
    const pastTrainingsForTop = state.trainingseinheiten.filter(t => !t.cancelled && t.id <= todayStringForTop);
    const totalTrainings = pastTrainingsForTop.length;
    const aktiveSpielerCount = state.spieler.filter(s => getAktuellerStatus(s) !== 'Inaktiv').length;

    const topTrainers = state.spieler
        .map(spieler => ({
            ...spieler,
            trainingCount: getTrainingsAnzahlGesamt(spieler.id, state)
        }))
        .filter(s => s.trainingCount > 0)
        .sort((a, b) => b.trainingCount - a.trainingCount)
        .slice(0, 10);

    if (state.trainingListView === 'top10') {
        content += `
        <div class="p-4 rounded-xl border border-gray-700">
            <h2 class="text-lg font-bold mb-4 text-center">Top 10 Training-Statistik</h2>
            <div class="space-y-2">
                ${topTrainers.length > 0 ? topTrainers.map((spieler, index) => createTop10CardHtml(spieler, index, `${spieler.trainingCount}/${totalTrainings} (${totalTrainings > 0 ? Math.round((spieler.trainingCount / totalTrainings) * 100) : 0}%)`, 'bg-green-900/50')).join('') : `<p class="text-center text-gray-500 dark:text-gray-400">Noch keine Trainingsdaten vorhanden.</p>`}
            </div>
        </div>
        `;
    } else if (state.trainingListView === 'all') {
        content += `
        <div class="p-4 rounded-xl border border-gray-700">
            <h2 class="text-lg font-bold mb-4 text-center">Alle Trainingseinheiten</h2>
            <div class="space-y-2">
                ${[...state.trainingseinheiten].sort((a, b) => a.id.localeCompare(b.id)).map(training => createTrainingCardHtml(training, aktiveSpielerCount)).join('')}
            </div>
        </div>
        `;
    }
    return content;
};

const renderMatchtagUebersicht = (callbacks) => {
    const addButtonHtml = `<div class="p-4 rounded-xl border border-gray-700">
        <button id="add-match-btn" class="w-full py-3 font-medium text-white uppercase bg-yellow-500 rounded-lg shadow-lg hover:bg-yellow-600 btn flex items-center justify-center gap-2">
            <i class="fas fa-plus"></i>
            Match hinzufügen
        </button>
    </div>`;
    
    let content = addButtonHtml;

    content += `
        <div class="p-4 rounded-xl border border-gray-700 mb-4">
            <div class="flex justify-between items-center gap-2">
                <button id="show-all-matches-btn" class="px-4 py-2 rounded-lg btn ${state.matchtagListView === 'all' ? 'bg-yellow-500 text-white' : 'bg-gray-700'}">Alle Matchtage</button>
                <button id="show-top10-matches-btn" class="px-4 py-2 rounded-lg btn ${state.matchtagListView === 'top10' ? 'bg-yellow-500 text-white' : 'bg-gray-700'}">Top 10 Match-Statistik</button>
            </div>
        </div>
    `;

    const statsFunctions = {
        matches: (id) => getMatchAnzahlGesamt(id, state),
        minuten: (id) => getSpielminutenGesamt(id, state),
        tore: (id) => getToreGesamt(id, state),
        vorlagen: (id) => getVorlagenGesamt(id, state)
    };
    const topSpieler = state.spieler
        .map(spieler => ({
            ...spieler,
            stat: statsFunctions[state.statsFilter](spieler.id)
        }))
        .filter(s => s.stat > 0)
        .sort((a, b) => b.stat - a.stat)
        .slice(0, 10);

    if (state.matchtagListView === 'top10') {
        content += `
        <div class="p-4 rounded-xl border border-gray-700">
            <h2 class="text-lg font-bold mb-4 text-center"> Top 10 Match-Statistik</h2>
            <div class="flex justify-center flex-wrap gap-2 mb-4">
                <button id="filter-matches-btn" class="px-3 py-1 text-sm rounded-full btn ${state.statsFilter === 'matches' ? 'bg-yellow-500 text-white' : 'bg-gray-700'}">Matches</button>
                <button id="filter-minuten-btn" class="px-3 py-1 text-sm rounded-full btn ${state.statsFilter === 'minuten' ? 'bg-yellow-500 text-white' : 'bg-gray-700'}">Minuten</button>
                <button id="filter-tore-btn" class="px-3 py-1 text-sm rounded-full btn ${state.statsFilter === 'tore' ? 'bg-yellow-500 text-white' : 'bg-gray-700'}">Tore</button>
                <button id="filter-vorlagen-btn" class="px-3 py-1 text-sm rounded-full btn ${state.statsFilter === 'vorlagen' ? 'bg-yellow-500 text-white' : 'bg-gray-700'}">Vorlagen</button>
            </div>
            <div class="space-y-2">
                ${topSpieler.length > 0 ? topSpieler.map((spieler, index) => createTop10CardHtml(spieler, index, spieler.stat, 'bg-yellow-900/50')).join('') : `<p class="text-center text-gray-500 dark:text-gray-400">Noch keine Matchdaten vorhanden.</p>`}
            </div>
        </div>
        `;
    } else if (state.matchtagListView === 'all') {
        content += `
        <div class="p-4 rounded-xl border border-gray-700">
            <h2 class="text-lg font-bold mb-4 text-center">Alle Matchtage</h2>
            <div class="space-y-2">
                ${[...state.matchtage].sort((a, b) => a.id.localeCompare(b.id)).map(matchtag => createMatchtagCardHtml(matchtag)).join('')}
                ${state.matchtage.length === 0 ? '<p class="text-center text-gray-500 dark:text-gray-400">Noch keine Matchtage vorhanden.</p>' : ''}
            </div>
        </div>
        `;
    }
    return content;
};

const renderTrainingDetail = (callbacks) => {
    const selectedTraining = state.trainingseinheiten.find(t => t.id === state.currentId) || { teilnehmer: {}, time: '' };
    const statusOrderTraining = { 'Aktiv': 1, 'Urlaub': 2, 'Verletzt': 3, 'Krank': 4, 'Gesperrt': 5, 'Inaktiv': 6 };
    const sortedSpielerTraining = state.spieler
        .filter(s => getAktuellerStatus(s) !== 'Inaktiv')
        .sort((a,b) => (statusOrderTraining[getAktuellerStatus(a)] || 99) - (statusOrderTraining[getAktuellerStatus(b)] || 99));

    const summary = { anwesend: 0, abwesend: 0, unentschuldigt: 0, verletzt: 0, urlaub: 0, krank: 0, gesperrt: 0 };
    sortedSpielerTraining.forEach(spieler => {
        const aktuellerStatus = getAktuellerStatus(spieler);
        const anwesenheit = selectedTraining.teilnehmer?.[spieler.id];
        if (['Verletzt', 'Urlaub', 'Krank', 'Gesperrt'].includes(aktuellerStatus)) {
            summary[aktuellerStatus.toLowerCase()]++;
        } else if (anwesenheit === 'Anwesend') {
            summary.anwesend++;
        } else if (anwesenheit === 'Abwesend') {
            summary.abwesend++;
        } else if (anwesenheit === 'Unentschuldigt') {
            summary.unentschuldigt++;
        }
    });

    const summaryBox = (label, count, color) => `
        <div class="${color} p-2 rounded-lg text-white">
            <p class="font-bold text-lg">${count}</p>
            <p class="text-xs">${label}</p>
        </div>
    `;

    return `
        <div class="p-4 rounded-xl border border-gray-700">
            <h2 class="text-xl font-bold text-center">Anwesenheit am ${formatDateWithWeekday(state.currentId)}</h2>
            <form id="trainingDetailForm" class="space-y-4">
                <input type="hidden" name="id" value="${state.currentId}">
                <div>
                    <label class="font-semibold">Uhrzeit</label>
                    <input type="time" name="time" value="${selectedTraining.time || ''}" class="w-full p-2 mt-1 bg-gray-100 dark:bg-gray-700 dark:text-gray-200 rounded-lg">
                </div>
                <button type="submit" class="w-full py-2 bg-blue-600 text-white rounded-lg btn">Trainingsdetails speichern</button>
            </form>
            
            <div class="grid grid-cols-3 sm:grid-cols-6 gap-2 text-center mb-4 text-xs mt-4 border-t dark:border-gray-700 pt-4">
                ${summaryBox('Anwesend', summary.anwesend, 'bg-green-500')}
                ${summaryBox('Abwesend', summary.abwesend, 'bg-red-500')}
                ${summaryBox('Unentsch.', summary.unentschuldigt, 'bg-gray-500')}
                ${summaryBox('Verletzt', summary.verletzt, 'bg-purple-500')}
                ${summaryBox('Krank', summary.krank, 'bg-orange-500')}
                ${summaryBox('Urlaub', summary.urlaub, 'bg-blue-500')}
            </div>

            <div class="space-y-3 border-t dark:border-gray-700 pt-4">
                ${sortedSpielerTraining.map(spieler => {
                    const aktuellerStatus = getAktuellerStatus(spieler);
                    const isAbwesend = ['Urlaub', 'Verletzt', 'Krank', 'Gesperrt'].includes(aktuellerStatus);
                    return `
                    <div class="flex items-center justify-between p-2 rounded-lg hover:bg-gray-700/50">
                        <button data-id="${spieler.id}" class="font-semibold text-left hover:text-blue-600 dark:hover:text-blue-400 flex items-center cursor-pointer spieler-link">${getStatusIndicator(aktuellerStatus)} <span class="ml-2">${spieler.name}</span></button>
                        ${isAbwesend ? `<div class="text-sm italic text-gray-500 dark:text-gray-400">${aktuellerStatus}</div>` : `
                        <div class="flex space-x-1">
                            <button data-status="Anwesend" data-spieler-id="${spieler.id}" class="w-8 h-8 rounded-full text-sm font-bold anwesenheit-btn ${selectedTraining.teilnehmer?.[spieler.id] === 'Anwesend' ? 'bg-green-500 text-white' : 'bg-gray-600'}" title="Anwesend">A</button>
                            <button data-status="Abwesend" data-spieler-id="${spieler.id}" class="w-8 h-8 rounded-full text-sm font-bold anwesenheit-btn ${selectedTraining.teilnehmer?.[spieler.id] === 'Abwesend' ? 'bg-red-500 text-white' : 'bg-gray-600'}" title="Abwesend">B</button>
                            <button data-status="Unentschuldigt" data-spieler-id="${spieler.id}" class="w-8 h-8 rounded-full text-sm font-bold anwesenheit-btn ${selectedTraining.teilnehmer?.[spieler.id] === 'Unentschuldigt' ? 'bg-gray-500 text-white' : 'bg-gray-600'}" title="Unentschuldigt">U</button>
                        </div>
                        `}
                    </div>
                    `;
                }).join('')}
            </div>
            <div class="flex space-x-2 mt-6">
                <button id="toggle-training-cancellation" class="flex-1 py-2 ${selectedTraining.cancelled ? 'bg-green-500' : 'bg-yellow-500'} text-white rounded-lg btn">${selectedTraining.cancelled ? 'Training Reaktivieren' : 'Training Absagen'}</button>
                <button id="delete-training-btn" class="flex-1 py-2 bg-red-600 text-white rounded-lg btn">Training löschen</button>
            </div>
        </div>
    `;
};

const renderMatchtagDetail = (callbacks) => {
    const matchtag = state.matchtage.find(s => s.id === state.currentId) || { aufstellung: {}, gegner: '', toreHeim: null, toreAuswaerts: null, spielort: 'Heim', time: '' };
    const kader = { startelf: [], ersatzbank: [], nichtImKader: [], nichtVerfuegbar: [] };
    const spielerImKader = state.spieler.filter(s => getAktuellerStatus(s) !== 'Inaktiv');

    spielerImKader.forEach(spieler => {
        const pos = matchtag.aufstellung?.[spieler.id]?.position;
        const status = getAktuellerStatus(spieler);
        if (['Verletzt', 'Urlaub', 'Krank', 'Gesperrt'].includes(status)) {
            kader.nichtVerfuegbar.push(spieler);
        } else if (pos === 'Startelf') {
            kader.startelf.push(spieler);
        } else if (pos === 'Ersatzbank') {
            kader.ersatzbank.push(spieler);
        } else {
            kader.nichtImKader.push(spieler);
        }
    });

    const spielerAufstellungHtml = (spieler) => {
        const aufstellung = matchtag.aufstellung?.[spieler.id] || {};
        const position = aufstellung.position || 'Nicht dabei';
        const showStats = position === 'Startelf' || position === 'Ersatzbank';
        return `
            <div class="p-2 rounded-lg border dark:border-gray-700">
                <div class="flex justify-between items-center">
                    <button data-id="${spieler.id}" class="font-semibold text-left hover:text-blue-600 dark:hover:text-blue-400 flex items-center cursor-pointer spieler-link">${getStatusIndicator(getAktuellerStatus(spieler))} <span class="ml-2">${spieler.name}</span></button>
                    <div class="flex space-x-1">
                        <button data-position="Startelf" data-spieler-id="${spieler.id}" class="px-2 py-1 text-xs rounded btn match-position-btn ${position === 'Startelf' ? 'bg-green-500 text-white' : 'bg-gray-600'}" title="Startelf">S11</button>
                        <button data-position="Ersatzbank" data-spieler-id="${spieler.id}" class="px-2 py-1 text-xs rounded btn match-position-btn ${position === 'Ersatzbank' ? 'bg-yellow-500 text-white' : 'bg-gray-600'}" title="Ersatzbank">Bank</button>
                        <button data-position="Nicht dabei" data-spieler-id="${spieler.id}" class="px-2 py-1 text-xs rounded btn match-position-btn ${position === 'Nicht dabei' || !position ? 'bg-gray-400 text-white' : 'bg-gray-600'}" title="Nicht im Kader">Kader</button>
                    </div>
                </div>
                ${showStats ? `
                <div class="flex flex-wrap items-center gap-2 mt-2 border-t dark:border-gray-700 pt-2">
                    <input type="number" placeholder="Min" data-field="spielminuten" data-spieler-id="${spieler.id}" value="${aufstellung.spielminuten || ''}" class="w-14 p-1 border rounded-md bg-gray-100 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 match-stat-input" title="Minuten">
                    <input type="number" placeholder="T" data-field="tore" data-spieler-id="${spieler.id}" value="${aufstellung.tore || ''}" class="w-12 p-1 border rounded-md bg-gray-100 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 match-stat-input" title="Tore">
                    <input type="number" placeholder="V" data-field="vorlagen" data-spieler-id="${spieler.id}" value="${aufstellung.vorlagen || ''}" class="w-12 p-1 border rounded-md bg-gray-100 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 match-stat-input" title="Vorlagen">
                </div>
                ` : ''}
            </div>
        `;
    };
    
    const kaderKategorieHtml = (titel, spielerListe, isAvailable = true) => `
        <div>
            <h4 class="font-bold text-lg mb-2">${titel} (${spielerListe.length})</h4>
            <div class="space-y-2">
                ${isAvailable
                    ? spielerListe.map(spielerAufstellungHtml).join('')
                    : spielerListe.map(spieler => `
                        <div class="p-2 rounded-lg border bg-gray-700/50 text-gray-400 dark:border-gray-700">
                            <button data-id="${spieler.id}" class="font-semibold text-left hover:text-blue-600 dark:hover:text-blue-400 flex items-center cursor-pointer spieler-link">${getStatusIndicator(getAktuellerStatus(spieler))} <span class="ml-2">${spieler.name}</span> <span class="italic ml-2">(${getAktuellerStatus(spieler)})</span></button>
                        </div>
                    `).join('')
                }
            </div>
        </div>
    `;

    return `
        <div class="p-4 rounded-xl border border-gray-700">
            <h2 class="text-xl font-bold mb-4">Matchdaten für ${formatDateWithWeekday(state.currentId)}</h2>
            <form id="matchtagForm" class="space-y-4">
                <input type="hidden" name="id" value="${state.currentId}">
                <div>
                    <label class="font-semibold">Spielort</label>
                    <div class="flex gap-2 mt-1">
                        <input type="hidden" name="spielort" value="${matchtag.spielort || 'Heim'}">
                        <button type="button" id="heimBtn" class="flex-1 py-2 rounded-lg btn ${matchtag.spielort !== 'Auswärts' ? 'bg-green-600 text-white' : 'bg-gray-700'}">Heim</button>
                        <button type="button" id="auswaertsBtn" class="flex-1 py-2 rounded-lg btn ${matchtag.spielort === 'Auswärts' ? 'bg-green-600 text-white' : 'bg-gray-700'}">Auswärts</button>
                    </div>
                </div>
                <div>
                    <label class="font-semibold">Gegner</label>
                    <input type="text" name="gegner" value="${matchtag.gegner || ''}" class="w-full p-2 mt-1 bg-gray-100 dark:bg-gray-700 dark:text-gray-200 rounded-lg">
                </div>
                <div class="flex items-center gap-4">
                    <div class="flex-1">
                        <label class="font-semibold text-sm">Tore Heim</label>
                        <input type="number" name="toreHeim" value="${matchtag.toreHeim === null || matchtag.toreHeim === undefined ? '' : matchtag.toreHeim}" class="w-full p-2 mt-1 bg-gray-100 dark:bg-gray-700 dark:text-gray-200 rounded-lg text-center">
                    </div>
                    <span class="text-2xl font-bold mt-6">:</span>
                    <div class="flex-1">
                        <label class="font-semibold text-sm">Tore Gast</label>
                        <input type="number" name="toreAuswaerts" value="${matchtag.toreAuswaerts === null || matchtag.toreAuswaerts === undefined ? '' : matchtag.toreAuswaerts}" class="w-full p-2 mt-1 bg-gray-100 dark:bg-gray-700 dark:text-gray-200 rounded-lg text-center">
                    </div>
                </div>
                <div>
                    <label class="font-semibold">Uhrzeit</label>
                    <input type="time" name="time" value="${matchtag.time || ''}" class="w-full p-2 mt-1 bg-gray-100 dark:bg-gray-700 dark:text-gray-200 rounded-lg">
                </div>
                <div>
                    <label class="font-semibold">Matchart</label>
                    <select name="spielArt" class="w-full p-2 mt-1 bg-gray-100 dark:bg-gray-700 dark:text-gray-200 rounded-lg">
                        <option value="Ligamatch" ${matchtag.spielArt === 'Ligamatch' || matchtag.spielArt === 'Ligaspiel' ? 'selected' : ''}>Ligamatch</option>
                        <option value="Freundschaftsmatch" ${matchtag.spielArt === 'Freundschaftsmatch' || matchtag.spielArt === 'Freundschaftsspiel' ? 'selected' : ''}>Freundschaftsmatch</option>
                        <option value="Pokalmatch" ${matchtag.spielArt === 'Pokalmatch' || matchtag.spielArt === 'Pokalspiel' ? 'selected' : ''}>Pokalmatch</option>
                    </select>
                </div>
                <button type="submit" class="w-full py-2 bg-blue-600 text-white rounded-lg btn">Matchdaten speichern</button>
            </form>
        </div>
        <div class="p-4 rounded-xl border border-gray-700">
            <button id="show-formation-modal" class="w-full py-3 font-medium text-white uppercase bg-green-600 rounded-lg shadow-lg hover:bg-green-700 btn flex items-center justify-center gap-2">
                <i class="fas fa-chalkboard-teacher"></i>
                Formation
            </button>
        </div>
        <div class="p-4 rounded-xl border border-gray-700 space-y-4">
            ${kaderKategorieHtml('Startelf', kader.startelf)}
            ${kaderKategorieHtml('Ersatzbank', kader.ersatzbank)}
            ${kaderKategorieHtml('Nicht im Kader', kader.nichtImKader)}
            ${Array.isArray(kader.nichtVerfuegbar) && kader.nichtVerfuegbar.length > 0 ? kaderKategorieHtml('Nicht verfügbar', kader.nichtVerfuegbar, false) : ''}
        </div>
        <div class="flex space-x-2 mt-6">
            <button id="toggle-match-cancellation" class="flex-1 py-2 ${matchtag.cancelled ? 'bg-green-500' : 'bg-yellow-500'} text-white rounded-lg btn">${matchtag.cancelled ? 'Match reaktivieren' : 'Match absagen'}</button>
            <button id="delete-match-btn" class="flex-1 py-2 bg-red-600 text-white rounded-lg btn">Matchtag löschen</button>
        </div>
    `;
};


// =================================================================
// HOME-VIEW LOGIK
// =================================================================
const renderHome = (callbacks) => {
    const month = state.currentDate.getMonth();
    const year = state.currentDate.getFullYear();
    const monthNames = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"];
    const monthStart = new Date(year, month, 1);
    const monthEnd = new Date(year, month + 1, 0);
    const startDay = (monthStart.getDay() + 6) % 7;
    
    let daysHtml = '';
    for (let i = 0; i < startDay; i++) {
        daysHtml += `<div class="border rounded-lg dark:border-gray-700"></div>`;
    }

    for (let day = 1; day <= monthEnd.getDate(); day++) {
        const date = new Date(year, month, day);
        const dateString = formatDate(date);
        const today = new Date();
        today.setHours(0,0,0,0);
        
        let classes = 'kalender-tag border dark:border-gray-700 rounded-lg p-2 flex flex-col justify-start items-center cursor-pointer';
        if (formatDate(today) === dateString) classes += ' heute';
        
        const trainingOnDay = state.trainingseinheiten.find(t => t.id === dateString);
        const isTrainingCancelled = trainingOnDay && trainingOnDay.cancelled;
        const hasTraining = trainingOnDay && !trainingOnDay.cancelled;

        const matchOnDay = state.matchtage.find(s => s.id === dateString);
        const isMatchCancelled = matchOnDay && matchOnDay.cancelled;
        const hasMatch = matchOnDay && !matchOnDay.cancelled;

        const hatGeburtstag = state.spieler.some(p => p.geburtstag && p.geburtstag.slice(5) === dateString.slice(5));
        const isFeiertag = state.feiertage.some(f => f.date === dateString);
        const isPast = date < today;

        if (isPast) {
            classes += ' bg-gray-700/50';
        }

        daysHtml += `<div class="${classes}" onclick="window.app.showEventDetailModal('${dateString}')">
                        <span class="${isFeiertag && !isPast ? 'text-red-500 font-bold' : ''} ${isPast ? 'text-gray-500' : ''}">${day}</span>
                        <div class="event-icons mt-1 flex flex-col items-center space-y-1">
                            ${hatGeburtstag && state.showGeburtstageOnHomeCalendar ? `<i class="fas fa-birthday-cake ${isPast ? 'text-gray-500' : 'text-pink-500'}"></i>` : ''}
                            ${isTrainingCancelled ? `<i class="fas fa-times-circle ${isPast ? 'text-gray-500' : 'text-blue-500'}" title="Training Abgesagt"></i>` : ''}
                            ${isMatchCancelled ? `<i class="fas fa-times-circle ${isPast ? 'text-gray-500' : 'text-yellow-500'}" title="Match Abgesagt"></i>` : ''}
                            ${hasTraining && state.showTrainingsOnHomeCalendar ? `<i class="fas fa-running ${isPast ? 'text-gray-500' : 'text-blue-500'}"></i>` : ''}
                            ${hasMatch && state.showMatchesOnHomeCalendar ? `<i class="fas fa-futbol ${isPast ? 'text-gray-500' : 'text-yellow-500'}"></i>` : ''}
                        </div>
                    </div>`;
    }

    const todayString = formatDate(new Date());
    const allEvents = [];
    state.trainingseinheiten.forEach(t => {
        if (!t.cancelled && t.id >= todayString) allEvents.push({ date: t.id, type: 'Training', title: t.time ? `Training (${t.time})` : 'Training' });
    });
    state.matchtage.forEach(s => {
        if (!s.cancelled && s.id >= todayString) allEvents.push({ date: s.id, type: 'Match', title: `Match gegen ${s.gegner || 'Unbekannt'}` });
    });
    state.spieler.forEach(p => {
        if (p.geburtstag) {
            const geburtstagThisYear = `${new Date().getFullYear()}-${p.geburtstag.slice(5)}`;
            if (geburtstagThisYear >= todayString) {
                allEvents.push({ date: geburtstagThisYear, type: 'Geburtstag', title: p.name });
            }
        }
    });
    const sortedEvents = allEvents.sort((a, b) => a.date.localeCompare(b.date));

    const groupedEvents = {};
    sortedEvents.forEach(event => {
        if ((event.type === 'Training' && !state.showTrainingsOnHomeCalendar) ||
            (event.type === 'Match' && !state.showMatchesOnHomeCalendar) ||
            (event.type === 'Geburtstag' && !state.showGeburtstageOnHomeCalendar)) {
            return;
        }
        if (!groupedEvents[event.date]) {
            groupedEvents[event.date] = [];
        }
        groupedEvents[event.date].push(event);
    });

    const nextEventGroups = Object.entries(groupedEvents).slice(0, 10);
    const isCurrentMonth = new Date().getMonth() === month && new Date().getFullYear() === year;

    return `
        <div class="p-4 rounded-xl border border-gray-700">
            <div class="flex justify-between items-center mb-4">
                <button onclick="window.app.changeMonth(-1)" class="px-4 py-2 bg-gray-700 rounded-lg btn"><i class="fas fa-chevron-left"></i></button>
                <div class="text-center">
                    <h3 class="text-lg font-bold">${monthNames[month]} ${year}</h3>
                    ${!isCurrentMonth ? `<button onclick="window.app.goToToday()" class="text-xs text-blue-500 hover:underline">Heute</button>` : ''}
                </div>
                <button onclick="window.app.changeMonth(1)" class="px-4 py-2 bg-gray-700 rounded-lg btn"><i class="fas fa-chevron-right"></i></button>
            </div>
            <div class="grid grid-cols-7 gap-2 text-center">
                ${['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'].map(tag => `<div class="font-semibold">${tag}</div>`).join('')}
                ${daysHtml}
            </div>
            <div class="flex justify-center flex-wrap gap-x-4 gap-y-2 mt-4 text-sm">
                <label class="flex items-center cursor-pointer">
                    <input type="checkbox" class="form-checkbox h-4 w-4 text-blue-600 rounded" 
                           ${state.showTrainingsOnHomeCalendar ? 'checked' : ''} 
                           onchange="window.app.setHomeCalendarFilter('trainings', this.checked)">
                    <span class="ml-2 text-gray-300">Training</span>
                </label>
                <label class="flex items-center cursor-pointer">
                    <input type="checkbox" class="form-checkbox h-4 w-4 text-yellow-600 rounded" 
                           ${state.showMatchesOnHomeCalendar ? 'checked' : ''} 
                           onchange="window.app.setHomeCalendarFilter('matches', this.checked)">
                    <span class="ml-2 text-gray-300">Matches</span>
                </label>
                <label class="flex items-center cursor-pointer">
                    <input type="checkbox" class="form-checkbox h-4 w-4 text-pink-600 rounded" 
                           ${state.showGeburtstageOnHomeCalendar ? 'checked' : ''} 
                           onchange="window.app.setHomeCalendarFilter('geburtstage', this.checked)">
                    <span class="ml-2 text-gray-300">Geburtstage</span>
                </label>
            </div>
        </div>
        <div class="p-4 rounded-xl border border-gray-700">
            <h2 class="text-lg font-bold mb-2 text-center"><i class="fas fa-calendar-alt mr-2"></i>Nächste Termine</h2>
            <div class="space-y-2">
                ${nextEventGroups.length > 0 ? nextEventGroups.map(([date, events]) => {
                    const eventDate = parseDateString(date);
                    const isToday = formatDate(new Date()) === date;
                    return `
                    <div class="flex items-center py-1 px-2 rounded-lg hover:bg-gray-700/50 cursor-pointer" onclick="window.app.showEventDetailModal('${date}')">
                        <div class="text-center mr-4 flex-shrink-0 w-16">
                            <p class="font-bold ${isToday ? 'text-green-400' : ''}">${eventDate.toLocaleDateString('de-DE', { weekday: 'short' })}</p>
                            <p class="text-2xl font-bold ${isToday ? 'text-green-400' : ''}">${eventDate.getDate()}</p>
                            <p class="text-sm text-gray-400">${eventDate.toLocaleDateString('de-DE', { month: 'short' })}</p>
                        </div>
                        <div class="flex-grow border-l dark:border-gray-600 pl-4">
                            ${events.map(event => {
                                let icon;
                                switch (event.type) {
                                    case 'Training':
                                        icon = '<i class="fas fa-running text-blue-500"></i>';
                                        break;
                                    case 'Match':
                                        icon = '<i class="fas fa-futbol text-yellow-500"></i>';
                                        break;
                                    case 'Geburtstag':
                                        icon = '<i class="fas fa-birthday-cake text-pink-500"></i>';
                                        break;
                                    default:
                                        icon = '<span></span>';
                                }
                                return `
                                <div class="flex items-center gap-3 mb-2">
                                    <span class="text-xl w-6 text-center">${icon}</span>
                                    <p class="font-semibold text-gray-200">${event.title}</p>
                                </div>
                                `;
                            }).join('')}
                        </div>
                    </div>
                    `;
                }).join('<hr class="my-2 dark:border-gray-700">') : '<p class="text-center text-gray-400">Keine anstehenden Termine.</p>'}
            </div>
        </div>
    `;
};


// =================================================================
// SPIELER-VIEW LOGIK
// =================================================================
const createSpielerCardHtml = (spieler, totalTrainings) => {
    const attendedTrainings = getTrainingsAnzahlGesamt(spieler.id, state);
    const percentage = totalTrainings > 0 ? Math.round((attendedTrainings / totalTrainings) * 100) : 0;
    const fotoHtml = spieler.fotoUrl 
        ? `<img src="${spieler.fotoUrl}" class="profile-img rounded-full" onerror="this.src='https://placehold.co/48x48/${placeholderBg()}/${placeholderText()}?text=${spieler.name.charAt(0)}';">`
        : `<div class="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center text-2xl">${spieler.position === 'Torwart' ? '' : ''}</div>`;

    return `
        <div onclick="window.app.navigateTo('spielerDetail', '${spieler.id}')" class="p-4 rounded-xl flex items-center space-x-4 cursor-pointer hover:bg-gray-700/50 card border border-gray-700">
            ${fotoHtml}
            <div class="flex-grow">
                <p class="font-bold">${spieler.name} <span class="text-gray-400 font-normal">#${spieler.nummer || '?'}</span></p>
                <div class="text-sm text-gray-400 mt-1">
                    <p class="flex items-center space-x-2">
                        ${getStatusIndicator(getAktuellerStatus(spieler))}
                        <span>${getAktuellerStatus(spieler)}</span>
                    </p>
                    <p class="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm items-center">
                        <span title="Trainingseinheiten" class="flex items-center gap-1"><i class="fas fa-running text-blue-500"></i> ${attendedTrainings}/${totalTrainings} (${percentage}%)</span>
                        <span title="Matches" class="flex items-center gap-1"><i class="fas fa-futbol text-yellow-500"></i> ${getMatchAnzahlGesamt(spieler.id, state)}</span>
                        <span title="Spielminuten" class="flex items-center gap-1"><i class="fas fa-clock text-gray-500"></i> ${getSpielminutenGesamt(spieler.id, state)} min</span>
                    </p>
                </div>
            </div>
            <i class="fas fa-chevron-right text-gray-400"></i>
        </div>
    `;
};

const renderSpielerUebersicht = (callbacks) => {
    let filteredSpieler = state.spieler.filter(s => s.name.toLowerCase().includes(state.filter.toLowerCase()));
    
    const statusOrder = { 'Aktiv': 1, 'Verletzt': 2, 'Gesperrt': 3, 'Urlaub': 4, 'Krank': 5, 'Inaktiv': 6 };
    filteredSpieler.sort((a, b) => {
        let valA, valB;
        switch(state.sortBy) {
            case 'name':
                valA = a.name.toLowerCase();
                valB = b.name.toLowerCase();
                return state.sortAsc ? valA.localeCompare(valB) : valB.localeCompare(valA);
            case 'status':
                valA = statusOrder[getAktuellerStatus(a)] || 99;
                valB = statusOrder[getAktuellerStatus(b)] || 99;
                break;
            case 'matches':
                valA = getMatchAnzahlGesamt(a.id, state);
                valB = getMatchAnzahlGesamt(b.id, state);
                break;
            case 'training':
                valA = getTrainingsAnzahlGesamt(a.id, state);
                valB = getTrainingsAnzahlGesamt(b.id, state);
                break;
        }
        if (valA === valB) {
            return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
        }
        return state.sortAsc ? valA - valB : valB - valA;
    });

    const sortButton = (key, text) => {
        const isActive = state.sortBy === key;
        const icon = isActive ? (state.sortAsc ? '' : '') : '';
        return `<button onclick="window.app.setSort('${key}')" class="px-3 py-1 text-sm rounded-full btn ${isActive ? 'bg-green-600 text-white' : 'bg-gray-700'}">${text} ${icon}</button>`;
    };

    const todayStringForTotal = formatDate(new Date());
    const pastTrainingsForTotal = state.trainingseinheiten.filter(t => !t.cancelled && t.id <= todayStringForTotal);
    const totalTrainings = pastTrainingsForTotal.length;

    return `
        <div class="p-4 rounded-xl border border-gray-700">
            <button onclick="window.app.navigateTo('spielerForm')" class="w-full py-3 font-medium text-white uppercase bg-green-600 rounded-lg shadow-lg hover:bg-green-700 btn flex items-center justify-center gap-2">
                <i class="fas fa-plus"></i>
                Neuen Spieler hinzufügen
            </button>
        </div>
        <div class="p-4 rounded-xl border border-gray-700">
            <h3 class="text-sm font-bold text-gray-400 mb-2">Sortieren nach:</h3>
            <div class="flex justify-center flex-wrap gap-2">
                ${sortButton('name', 'Name')}
                ${sortButton('status', 'Status')}
                ${sortButton('matches', 'Matches')}
                ${sortButton('training', 'Training')}
            </div>
        </div>
        <div class="space-y-3">
            ${filteredSpieler.length > 0 ? filteredSpieler.map(spieler => createSpielerCardHtml(spieler, totalTrainings)).join('') : `
            <div class="p-6 rounded-xl text-center text-gray-400 border border-gray-700">
                <p>Noch keine Spieler vorhanden.</p>
                <p class="mt-2">Fügen Sie einen neuen Spieler über den <span class="inline-block mx-1 px-2 py-1 bg-green-900 text-green-300 rounded-md font-bold">+</span> Button hinzu oder importieren Sie Daten in den Einstellungen.</p>
            </div>
            `}
        </div>
    `;
};

const renderSpielerDetail = (callbacks) => {
    const spieler = state.spieler.find(s => s.id === state.currentId);
    if (!spieler) {
        return `<div class="p-4 text-center">Spieler nicht gefunden.</div>`;
    }
    const fotoDetailHtml = spieler.fotoUrl 
        ? `<img id="fotoDetail" src="${spieler.fotoUrl}" class="profile-img-detail rounded-full mx-auto" onerror="this.src='https://placehold.co/120x120/${placeholderBg()}/${placeholderText()}?text=${spieler.name.charAt(0)}';">`
        : `<div class="w-32 h-32 rounded-full bg-gray-700 flex items-center justify-center text-6xl mx-auto">${spieler.position === 'Torwart' ? '' : ''}</div>`;
    
    let abwesenheitInfo = '';
    const aktuellerStatus = getAktuellerStatus(spieler);
    if (aktuellerStatus === 'Verletzt' && spieler.verletztBis) {
        const verletztBisDate = parseDateString(spieler.verletztBis);
        if (verletztBisDate) abwesenheitInfo = `<p class="text-red-500 text-sm mt-1">Verletzt bis: ${verletztBisDate.toLocaleDateString('de-DE')}</p>`;
    } else if (aktuellerStatus === 'Urlaub' && spieler.urlaubVon && spieler.urlaubBis) {
        const urlaubVonDate = parseDateString(spieler.urlaubVon);
        const urlaubBisDate = parseDateString(spieler.urlaubBis);
        if (urlaubVonDate && urlaubBisDate) abwesenheitInfo = `<p class="text-blue-500 text-sm mt-1">Im Urlaub: ${urlaubVonDate.toLocaleDateString('de-DE')} - ${urlaubBisDate.toLocaleDateString('de-DE')}</p>`;
    }
    
    const geburtstagDate = parseDateString(spieler.geburtstag);

    return `
        <div class="p-6 rounded-xl text-center border border-gray-700">
            ${fotoDetailHtml}
            <h2 class="text-2xl font-bold mt-4">${spieler.name} #${spieler.nummer || '?'}</h2>
            <p class="text-gray-400">${spieler.position}</p>
            <div class="mt-2 flex justify-center items-center space-x-2">
                ${getStatusIndicator(aktuellerStatus)}
                <span>${aktuellerStatus}</span>
            </div>
            ${abwesenheitInfo}
        </div>
        <div class="p-6 rounded-xl space-y-3 border border-gray-700">
            <h3 class="font-bold text-lg border-b dark:border-gray-700 pb-2">Informationen</h3>
            <p><strong>Alter:</strong> ${berechneAlter(spieler.geburtstag) || 'N/A'}</p>
            <p><strong>Geburtstag:</strong> ${geburtstagDate ? geburtstagDate.toLocaleDateString('de-DE') : 'N/A'}</p>
            <p><strong>Telefon:</strong> ${spieler.telefon || 'N/A'}</p>
            <p><strong>Email:</strong> ${spieler.email || 'N/A'}</p>
            <p><strong>Notizen:</strong></p>
            <p class="bg-gray-700 p-3 rounded-lg">${spieler.notiz || 'Keine Notizen.'}</p>
        </div>
        <div class="p-6 rounded-xl space-y-3 border border-gray-700">
            <h3 class="font-bold text-lg border-b dark:border-gray-700 pb-2">Statistiken</h3>
            <p><strong>Trainings:</strong> ${getTrainingsAnzahlGesamt(spieler.id, state)}</p>
            <p><strong>Matches:</strong> ${getMatchAnzahlGesamt(spieler.id, state)}</p>
            <p><strong>Minuten:</strong> ${getSpielminutenGesamt(spieler.id, state)}</p>
            <p><strong>Tore:</strong> ${getToreGesamt(spieler.id, state)}</p>
            <p><strong>Vorlagen:</strong> ${getVorlagenGesamt(spieler.id, state)}</p>
        </div>
        <div class="flex space-x-4 mt-4">
            <button onclick="window.app.navigateTo('spielerForm', '${spieler.id}')" class="flex-1 py-3 font-medium text-white uppercase bg-blue-600 rounded-lg shadow-lg hover:bg-blue-700 btn">Bearbeiten</button>
            <button onclick="window.app.deleteSpieler('${spieler.id}')" class="flex-1 py-3 font-medium text-white uppercase bg-red-600 rounded-lg shadow-lg hover:bg-red-700 btn">Löschen</button>
        </div>
    `;
};

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

    const header = (title) => {
        const displayTitle = state.teamInfo.name || title;
        const displayTitle2 = state.teamInfo.name2 || '';
        const emblemHtml = state.teamInfo.emblemUrl
            ? `<img src="${state.teamInfo.emblemUrl}" class="w-8 h-8 rounded-full object-cover mr-3 flex-shrink-0" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
               <div class="w-8 h-8 rounded-full bg-gray-500 flex-shrink-0 mr-3 hidden items-center justify-center"></div>`
            : `<div class="w-8 h-8 rounded-full bg-gray-500 flex-shrink-0 mr-3 flex items-center justify-center"></div>`;
        const titleClass = (displayTitle.length > 15) ? 'text-base font-bold' : 'text-lg font-bold';

        return `
        <header class="bg-gray-800 text-gray-200 p-4 sticky top-0 z-50 flex items-center justify-between text-center h-16 border-b-2 border-green-500">
            ${state.isLoggedIn ? `<button onclick="window.app.navigateTo('einstellungen', null, true)" class="flex flex-col items-center justify-center text-gray-400 hover:text-green-400 w-12 h-12 rounded-full hover:bg-gray-700 transition-colors absolute top-2 left-2" title="Einstellungen"><i class="fas fa-cog text-xl"></i></button>` : ''}
            <div class="flex items-center justify-center flex-grow">
                ${emblemHtml}
                <div>
                    <h1 class="${titleClass} whitespace-nowrap">${displayTitle}</h1>
                    ${displayTitle2 ? `<h2 class="text-sm text-gray-400 leading-tight whitespace-nowrap">${displayTitle2}</h2>` : ''}
                </div>
            </div>
            ${state.isLoggedIn ? `<button onclick="window.app.logout()" class="flex flex-col items-center justify-center text-gray-400 hover:text-green-400 w-12 h-12 rounded-full hover:bg-gray-700 transition-colors absolute top-2 right-2" title="Ausloggen"><i class="fas fa-sign-out-alt text-xl"></i></button>` : ''}
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
            const activeClass = 'text-green-400';
            return `<div class="flex-1 flex justify-center items-center">
                        <button onclick="window.app.navigateTo('${page}', null, true)" class="flex flex-col items-center justify-center text-gray-400 hover:text-green-400 ${buttonSizeClass} rounded-full hover:bg-gray-700 transition-colors ${isActive ? activeClass : ''}" title="${title}">
                            <i class="fas ${icon} text-xl"></i>
                            <span class="text-xs mt-1">${title}</span>
                        </button>
                    </div>`;
        };
        let leftButtonHtml = showBack
            ? `<div class="flex-1 flex justify-center items-center"><button onclick="window.app.goBack()" class="flex flex-col items-center justify-center text-gray-400 hover:text-green-400 ${buttonSizeClass} rounded-full hover:bg-gray-700 transition-colors" title="Zurück"><i class="fas fa-arrow-left text-xl"></i><span class="text-xs mt-1">Zurück</span></button></div>`
            : navButton('home', 'fa-home', 'Home');
        return `
            <div class="fixed bottom-0 left-0 right-0 z-40 p-4">
                <div class="bg-gradient-to-b from-gray-700 to-gray-800 border border-gray-600/75 shadow-lg rounded-full px-2 py-2 w-full max-w-sm mx-auto">
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
                                        <span class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                                            <i class="fas fa-envelope"></i>
                                        </span>
                                        <input type="email" id="email" name="email" class="w-full p-3 pl-12 text-gray-300 bg-gray-700 rounded-lg focus:outline-none focus:bg-gray-600 focus:ring-2 focus:ring-green-500 transition-all" value="trainer@demo.com" placeholder="Benutzer (E-Mail)" required>
                                    </div>
                                    <div class="relative">
                                        <span class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                                            <i class="fas fa-lock"></i>
                                        </span>
                                        <input type="password" id="password" name="password" class="w-full p-3 pl-12 text-gray-300 bg-gray-700 rounded-lg focus:outline-none focus:bg-gray-600 focus:ring-2 focus:ring-green-500 transition-all" value="1234" placeholder="Passwort" required>
                                    </div>
                                    <div>
                                        <button type="submit" class="w-full py-3 mt-6 font-medium tracking-widest text-white uppercase bg-gradient-to-r from-green-500 to-green-600 rounded-lg shadow-lg focus:outline-none hover:from-green-600 hover:to-green-700 hover:shadow-xl btn">
                                            Anmelden
                                        </button>
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

