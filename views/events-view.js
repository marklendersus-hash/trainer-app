import { state } from '../state.js';
import { getAktuellerStatus, getStatusIndicator, formatDate, formatDateWithWeekday, getMatchAnzahlGesamt, getSpielminutenGesamt, getToreGesamt, getVorlagenGesamt, getTrainingsAnzahlGesamt } from '../utils.js';

const createTrainingCardHtml = (training, aktiveSpielerCount) => {
    const anwesendCount = Object.values(training.teilnehmer || {}).filter(s => s === 'Anwesend').length;
    const percentage = aktiveSpielerCount > 0 ? Math.round((anwesendCount / aktiveSpielerCount) * 100) : 0;
    const isCancelled = training.cancelled;

    let statusText = `${percentage}% Anwesenheit`;
    let statusColor = 'text-blue-400';
    let statusIcon = 'fa-running';

    if (isCancelled) {
        statusText = 'Abgesagt';
        statusColor = 'text-red-500';
        statusIcon = 'fa-times-circle';
    } else if (aktiveSpielerCount === 0) {
        statusText = 'Keine aktiven Spieler';
        statusColor = 'text-gray-400';
    } else if (percentage === 100) {
        statusColor = 'text-green-400';
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
    let resultColor = 'text-gray-400';
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
            resultColor = 'text-green-400';
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
                <span class="font-semibold text-gray-400 w-8 inline-block">${index + 1}.</span>
                <button data-id="${spieler.id}" class="hover:text-blue-400 spieler-link">${spieler.name}</button>
            </div>
            <span class="font-bold px-2 py-1 rounded-full text-sm">${statText}</span>
        </div>
    `;
};

export const renderTrainingUebersicht = (callbacks) => {
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
                ${topTrainers.length > 0 ? topTrainers.map((spieler, index) => createTop10CardHtml(spieler, index, `${spieler.trainingCount}/${totalTrainings} (${totalTrainings > 0 ? Math.round((spieler.trainingCount / totalTrainings) * 100) : 0}%)`, 'bg-green-900/50')).join('') : `<p class="text-center text-gray-400">Noch keine Trainingsdaten vorhanden.</p>`}
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

export const renderMatchtagUebersicht = (callbacks) => {
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
                ${topSpieler.length > 0 ? topSpieler.map((spieler, index) => createTop10CardHtml(spieler, index, spieler.stat, 'bg-yellow-900/50')).join('') : `<p class="text-center text-gray-400">Noch keine Matchdaten vorhanden.</p>`}
            </div>
        </div>
        `;
    } else if (state.matchtagListView === 'all') {
        content += `
        <div class="p-4 rounded-xl border border-gray-700">
            <h2 class="text-lg font-bold mb-4 text-center">Alle Matchtage</h2>
            <div class="space-y-2">
                ${[...state.matchtage].sort((a, b) => a.id.localeCompare(b.id)).map(matchtag => createMatchtagCardHtml(matchtag)).join('')}
                ${state.matchtage.length === 0 ? '<p class="text-center text-gray-400">Noch keine Matchtage vorhanden.</p>' : ''}
            </div>
        </div>
        `;
    }
    return content;
};

export const renderTrainingDetail = (callbacks) => {
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
            <div class="text-center mb-4">
                <h2 class="text-xl font-bold">Anwesenheit</h2>
            </div>

            <form id="trainingDetailForm">
                <input type="hidden" name="id" value="${state.currentId}">
                <div class="grid grid-cols-[auto,1fr] items-center gap-x-4 gap-y-2 p-3 rounded-lg bg-gray-800/50">
                    <label for="trainingDate" class="font-semibold text-right">Datum</label>
                    <input id="trainingDate" type="date" value="${state.currentId}" onchange="window.app.navigateTo('trainingDetail', this.value)" class="w-full p-2 bg-gray-700 text-gray-200 rounded-lg">
                    
                    <label for="trainingTime" class="font-semibold text-right">Uhrzeit</label>
                    <input id="trainingTime" type="time" name="time" value="${selectedTraining.time || ''}" class="w-full p-2 bg-gray-700 text-gray-200 rounded-lg">
                </div>
            </form>
            
            <div class="grid grid-cols-3 sm:grid-cols-6 gap-2 text-center mb-4 text-xs mt-4 border-t border-gray-700 pt-4">
                ${summaryBox('Anwesend', summary.anwesend, 'bg-green-500')}
                ${summaryBox('Abwesend', summary.abwesend, 'bg-red-500')}
                ${summaryBox('Unentsch.', summary.unentschuldigt, 'bg-gray-500')}
                ${summaryBox('Verletzt', summary.verletzt, 'bg-purple-500')}
                ${summaryBox('Krank', summary.krank, 'bg-orange-500')}
                ${summaryBox('Urlaub', summary.urlaub, 'bg-blue-500')}
            </div>

            <div class="space-y-3 border-t border-gray-700 pt-4">
                ${sortedSpielerTraining.map(spieler => {
                    const aktuellerStatus = getAktuellerStatus(spieler);
                    const isAbwesend = ['Urlaub', 'Verletzt', 'Krank', 'Gesperrt'].includes(aktuellerStatus);
                    return `
                    <div class="flex items-center justify-between p-2 rounded-lg hover:bg-gray-700/50">
                        <button data-id="${spieler.id}" class="font-semibold text-left hover:text-blue-400 flex items-center cursor-pointer spieler-link">${getStatusIndicator(aktuellerStatus)} <span class="ml-2">${spieler.name}</span></button>
                        ${isAbwesend ? `<div class="text-sm italic text-gray-400">${aktuellerStatus}</div>` : `
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
            <div class="space-y-2 mt-6">
                <button type="submit" form="trainingDetailForm" class="w-full py-2 bg-blue-600 text-white rounded-lg btn">Training speichern</button>
                <div class="flex space-x-2">
                    <button id="toggle-training-cancellation" class="flex-1 py-2 ${selectedTraining.cancelled ? 'bg-green-500' : 'bg-yellow-500'} text-white rounded-lg btn">${selectedTraining.cancelled ? 'Training Reaktivieren' : 'Training Absagen'}</button>
                    <button id="delete-training-btn" class="flex-1 py-2 bg-red-600 text-white rounded-lg btn">Training löschen</button>
                </div>
            </div>
        </div>
    `;
};

export const renderMatchtagDetail = (callbacks) => {
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
            <div class="p-2 rounded-lg border border-gray-700">
                <div class="flex justify-between items-center">
                    <button data-id="${spieler.id}" class="font-semibold text-left hover:text-blue-400 flex items-center cursor-pointer spieler-link">${getStatusIndicator(getAktuellerStatus(spieler))} <span class="ml-2">${spieler.name}</span></button>
                    <div class="flex space-x-1">
                        <button data-position="Startelf" data-spieler-id="${spieler.id}" class="px-2 py-1 text-xs rounded btn match-position-btn ${position === 'Startelf' ? 'bg-green-500 text-white' : 'bg-gray-600'}" title="Startelf">S11</button>
                        <button data-position="Ersatzbank" data-spieler-id="${spieler.id}" class="px-2 py-1 text-xs rounded btn match-position-btn ${position === 'Ersatzbank' ? 'bg-yellow-500 text-white' : 'bg-gray-600'}" title="Ersatzbank">Bank</button>
                        <button data-position="Nicht dabei" data-spieler-id="${spieler.id}" class="px-2 py-1 text-xs rounded btn match-position-btn ${position === 'Nicht dabei' || !position ? 'bg-gray-400 text-white' : 'bg-gray-600'}" title="Nicht im Kader">Kader</button>
                    </div>
                </div>
                ${showStats ? `
                <div class="flex flex-wrap items-center gap-2 mt-2 border-t border-gray-700 pt-2">
                    <input type="number" placeholder="Min" data-field="spielminuten" data-spieler-id="${spieler.id}" value="${aufstellung.spielminuten || ''}" class="w-14 p-1 border rounded-md bg-gray-700 text-gray-200 border-gray-600 match-stat-input" title="Minuten">
                    <input type="number" placeholder="T" data-field="tore" data-spieler-id="${spieler.id}" value="${aufstellung.tore || ''}" class="w-12 p-1 border rounded-md bg-gray-700 text-gray-200 border-gray-600 match-stat-input" title="Tore">
                    <input type="number" placeholder="V" data-field="vorlagen" data-spieler-id="${spieler.id}" value="${aufstellung.vorlagen || ''}" class="w-12 p-1 border rounded-md bg-gray-700 text-gray-200 border-gray-600 match-stat-input" title="Vorlagen">
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
                        <div class="p-2 rounded-lg border bg-gray-700/50 text-gray-400 border-gray-700">
                            <button data-id="${spieler.id}" class="font-semibold text-left hover:text-blue-400 flex items-center cursor-pointer spieler-link">${getStatusIndicator(getAktuellerStatus(spieler))} <span class="ml-2">${spieler.name}</span> <span class="italic ml-2">(${getAktuellerStatus(spieler)})</span></button>
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
                    <input type="text" name="gegner" value="${matchtag.gegner || ''}" class="w-full p-2 mt-1 bg-gray-700 text-gray-200 rounded-lg">
                </div>
                <div class="flex items-center gap-4">
                    <div class="flex-1">
                        <label class="font-semibold text-sm">Tore Heim</label>
                        <input type="number" name="toreHeim" value="${matchtag.toreHeim === null || matchtag.toreHeim === undefined ? '' : matchtag.toreHeim}" class="w-full p-2 mt-1 bg-gray-700 text-gray-200 rounded-lg text-center">
                    </div>
                    <span class="text-2xl font-bold mt-6">:</span>
                    <div class="flex-1">
                        <label class="font-semibold text-sm">Tore Gast</label>
                        <input type="number" name="toreAuswaerts" value="${matchtag.toreAuswaerts === null || matchtag.toreAuswaerts === undefined ? '' : matchtag.toreAuswaerts}" class="w-full p-2 mt-1 bg-gray-700 text-gray-200 rounded-lg text-center">
                    </div>
                </div>
                <div>
                    <label class="font-semibold">Uhrzeit</label>
                    <input type="time" name="time" value="${matchtag.time || ''}" class="w-full p-2 mt-1 bg-gray-700 text-gray-200 rounded-lg">
                </div>
                <div>
                    <label class="font-semibold">Matchart</label>
                    <select name="spielArt" class="w-full p-2 mt-1 bg-gray-700 text-gray-200 rounded-lg">
                        <option value="Ligamatch" ${matchtag.spielArt === 'Ligamatch' || matchtag.spielArt === 'Ligaspiel' ? 'selected' : ''}>Ligamatch</option>
                        <option value="Freundschaftsmatch" ${matchtag.spielArt === 'Freundschaftsmatch' || matchtag.spielArt === 'Freundschaftsspiel' ? 'selected' : ''}>Freundschaftsmatch</option>
                        <option value="Pokalmatch" ${matchtag.spielArt === 'Pokalmatch' || matchtag.spielArt === 'Pokalspiel' ? 'selected' : ''}>Pokalmatch</option>
                    </select>
                </div>
                <button type="submit" class="w-full py-2 bg-blue-600 text-white rounded-lg btn">Matchdaten speichern</button>
            </form>
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
