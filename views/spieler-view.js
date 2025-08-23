/**
 * @file spieler-view.js
 * @description
 * Dieses Modul enthält Funktionen zum Rendern der HTML-Ansichten, die sich auf Spieler beziehen.
 * Dazu gehören die Spielerübersicht (Liste aller Spieler), die Detailansicht eines einzelnen Spielers
 * und das Formular zum Erstellen oder Bearbeiten eines Spielers.
 * Die Funktionen greifen auf den globalen `state` zu, um die benötigten Daten zu erhalten.
 */

import { state } from '../state.js';
import { getAktuellerStatus, getStatusIndicator, formatDate, getTrainingsAnzahlGesamt, getMatchAnzahlGesamt, getSpielminutenGesamt, getToreGesamt, getVorlagenGesamt, berechneAlter, parseDateString } from '../utils.js';

// Helper-Funktionen für Placeholder-Bilder
const placeholderBg = () => '475569';
const placeholderText = () => 'E2E8F0';

/**
 * Erstellt das HTML für eine einzelne Spieler-Karte in der Übersicht.
 * @param {object} spieler - Das Spielerobjekt aus dem State.
 * @param {number} totalTrainings - Die Gesamtzahl der vergangenen Trainings zur Berechnung der Teilnahmequote.
 * @returns {string} Das gerenderte HTML als String.
 */
const createSpielerCardHtml = (spieler, totalTrainings) => {
    const attendedTrainings = getTrainingsAnzahlGesamt(spieler.id, state);
    const percentage = totalTrainings > 0 ? Math.round((attendedTrainings / totalTrainings) * 100) : 0;
    const fotoHtml = spieler.fotoUrl 
        ? `<img src="${spieler.fotoUrl}" class="profile-img rounded-full" onerror="this.src='https://placehold.co/48x48/${placeholderBg()}/${placeholderText()}?text=${spieler.name.charAt(0)}';">`
        : `<div class="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-2xl">${spieler.position === 'Torwart' ? '' : ''}</div>`;

    return `
        <div onclick="window.app.navigateTo('spielerDetail', '${spieler.id}')" class="bg-white p-4 rounded-xl shadow-lg flex items-center space-x-4 cursor-pointer hover:bg-gray-50 card dark:bg-gray-800 dark:hover:bg-gray-700">
            ${fotoHtml}
            <div class="flex-grow">
                <p class="font-bold">${spieler.name} <span class="text-gray-500 dark:text-gray-400 font-normal">#${spieler.nummer || '?'}</span></p>
                <div class="text-sm text-gray-600 dark:text-gray-400 mt-1">
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

/**
 * Erstellt das HTML für einen Eintrag in einer Top-10-Liste.
 * @param {object} spieler - Das Spielerobjekt.
 * @param {number} index - Der Index des Spielers in der Liste (für die Platzierung).
 * @param {string} statText - Der anzuzeigende Statistik-Text.
 * @param {string} baseClass - Eine CSS-Klasse für das Styling.
 * @returns {string} Das gerenderte HTML als String.
 */
const createTop10CardHtml = (spieler, index, statText, baseClass) => {
    return `
        <div class="flex justify-between items-center p-2 rounded-lg ${index < 3 ? baseClass : ''}">
            <div>
                <span class="font-semibold text-gray-500 dark:text-gray-400 w-8 inline-block">${index + 1}.</span>
                <button onclick="window.app.navigateTo('spielerDetail', '${spieler.id}')" class="hover:text-blue-600 dark:hover:text-blue-400">${spieler.name}</button>
            </div>
            <span class="font-bold px-2 py-1 rounded-full text-sm">${statText}</span>
        </div>
    `;
};

/**
 * Rendert die komplette Ansicht für die Spielerübersicht.
 * Beinhaltet den Button zum Hinzufügen, Filter- und Sortieroptionen und die Liste der Spieler.
 * @param {object} callbacks - Das `appCallbacks`-Objekt.
 * @returns {string} Das gerenderte HTML als String.
 */
export const renderSpielerUebersicht = (callbacks) => {
    // Spieler filtern basierend auf dem Suchfeld im State
    let filteredSpieler = state.spieler.filter(s => s.name.toLowerCase().includes(state.filter.toLowerCase()));
    
    // Spieler sortieren basierend auf den Sortiereinstellungen im State
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

    // Helper-Funktion zum Erstellen eines Sortier-Buttons
    const sortButton = (key, text) => {
        const isActive = state.sortBy === key;
        const icon = isActive ? (state.sortAsc ? '' : '') : '';
        return `<button onclick="window.app.setSort('${key}')" class="px-3 py-1 text-sm rounded-full btn ${isActive ? 'bg-green-600 text-white' : 'bg-gray-200 dark:bg-gray-700'}">${text} ${icon}</button>`;
    };

    // Gesamtzahl der relevanten Trainings für die Statistik ermitteln
    const todayStringForTotal = formatDate(new Date());
    const pastTrainingsForTotal = state.trainingseinheiten.filter(t => !t.cancelled && t.id <= todayStringForTotal);
    const totalTrainings = pastTrainingsForTotal.length;

    return `
        <div class="bg-white p-4 rounded-xl shadow-lg dark:bg-gray-800">
            <button onclick="window.app.navigateTo('spielerForm')" class="w-full py-3 font-medium text-white uppercase bg-green-600 rounded-lg shadow-lg hover:bg-green-700 btn flex items-center justify-center gap-2">
                <i class="fas fa-plus"></i>
                Neuen Spieler hinzufügen
            </button>
        </div>
        <div class="bg-white p-4 rounded-xl shadow-lg dark:bg-gray-800">
            <h3 class="text-sm font-bold text-gray-600 dark:text-gray-400 mb-2">Sortieren nach:</h3>
            <div class="flex justify-center flex-wrap gap-2">
                ${sortButton('name', 'Name')}
                ${sortButton('status', 'Status')}
                ${sortButton('matches', 'Matches')}
                ${sortButton('training', 'Training')}
            </div>
        </div>
        <div class="space-y-3">
            ${filteredSpieler.length > 0 ? filteredSpieler.map(spieler => createSpielerCardHtml(spieler, totalTrainings)).join('') : `
            <div class="bg-white p-6 rounded-xl shadow-lg text-center text-gray-500 dark:bg-gray-800 dark:text-gray-400">
                <p>Noch keine Spieler vorhanden.</p>
                <p class="mt-2">Fügen Sie einen neuen Spieler über den <span class="inline-block mx-1 px-2 py-1 bg-green-100 text-green-700 rounded-md font-bold">+</span> Button hinzu oder importieren Sie Daten in den Einstellungen.</p>
            </div>
            `}
        </div>
    `;
};

/**
 * Rendert die Detailansicht für einen einzelnen Spieler.
 * @param {object} callbacks - Das `appCallbacks`-Objekt.
 * @returns {string} Das gerenderte HTML als String oder eine Fehlermeldung, wenn der Spieler nicht gefunden wurde.
 */
export const renderSpielerDetail = (callbacks) => {
    const spieler = state.spieler.find(s => s.id === state.currentId);
    if (!spieler) {
        return `<div class="p-4 text-center">Spieler nicht gefunden.</div>`;
    }
    const fotoDetailHtml = spieler.fotoUrl 
        ? `<img id="fotoDetail" src="${spieler.fotoUrl}" class="profile-img-detail rounded-full mx-auto" onerror="this.src='https://placehold.co/120x120/${placeholderBg()}/${placeholderText()}?text=${spieler.name.charAt(0)}';">`
        : `<div class="w-32 h-32 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-6xl mx-auto">${spieler.position === 'Torwart' ? '' : ''}</div>`;
    
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
        <div class="bg-white p-6 rounded-xl shadow-lg text-center dark:bg-gray-800">
            ${fotoDetailHtml}
            <h2 class="text-2xl font-bold mt-4">${spieler.name} #${spieler.nummer || '?'}</h2>
            <p class="text-gray-600 dark:text-gray-400">${spieler.position}</p>
            <div class="mt-2 flex justify-center items-center space-x-2">
                ${getStatusIndicator(aktuellerStatus)}
                <span>${aktuellerStatus}</span>
            </div>
            ${abwesenheitInfo}
        </div>
        <div class="bg-white p-6 rounded-xl shadow-lg space-y-3 dark:bg-gray-800">
            <h3 class="font-bold text-lg border-b dark:border-gray-700 pb-2">Informationen</h3>
            <p><strong>Alter:</strong> ${berechneAlter(spieler.geburtstag) || 'N/A'}</p>
            <p><strong>Geburtstag:</strong> ${geburtstagDate ? geburtstagDate.toLocaleDateString('de-DE') : 'N/A'}</p>
            <p><strong>Telefon:</strong> ${spieler.telefon || 'N/A'}</p>
            <p><strong>Email:</strong> ${spieler.email || 'N/A'}</p>
            <p><strong>Notizen:</strong></p>
            <p class="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">${spieler.notiz || 'Keine Notizen.'}</p>
        </div>
        <div class="bg-white p-6 rounded-xl shadow-lg space-y-3 dark:bg-gray-800">
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

/**
 * Rendert das Formular zum Erstellen eines neuen oder Bearbeiten eines vorhandenen Spielers.
 * @param {object} callbacks - Das `appCallbacks`-Objekt.
 * @returns {string} Das gerenderte HTML als String.
 */
export const renderSpielerForm = (callbacks) => {
    const isEditing = !!state.currentId;
    const spielerToEdit = isEditing ? state.spieler.find(s => s.id === state.currentId) : {};
    const fotoVorschauHtml = spielerToEdit.fotoUrl
        ? `<img id="fotoVorschau" src="${spielerToEdit.fotoUrl}" class="w-24 h-24 rounded-full mx-auto object-cover">`
        : `<img id="fotoVorschau" src="#" alt="Vorschau" class="w-24 h-24 rounded-full mx-auto object-cover hidden">`;

    const html = `
        <form id="spielerForm">
            <div class="bg-white p-6 rounded-xl shadow-lg space-y-3 dark:bg-gray-800">
                <h2 class="text-xl font-bold text-center">Stammdaten</h2>
                <input type="hidden" name="id" value="${spielerToEdit.id || ''}">
                <div>
                    <label class="font-semibold">Profilfoto</label>
                    ${fotoVorschauHtml}
                    <input type="file" name="foto" id="fotoUpload" accept="image/*" class="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100 mt-2 dark:text-gray-400 dark:file:bg-gray-700 dark:file:text-gray-300 dark:hover:file:bg-gray-600">
                </div>
                <div>
                    <label class="font-semibold">Name</label>
                    <input type="text" name="name" value="${spielerToEdit.name || ''}" class="w-full p-2 mt-1 bg-gray-100 dark:bg-gray-700 rounded-lg" required>
                </div>
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <label class="font-semibold">Nummer</label>
                        <input type="number" name="nummer" value="${spielerToEdit.nummer || ''}" class="w-full p-2 mt-1 bg-gray-100 dark:bg-gray-700 rounded-lg">
                    </div>
                    <div>
                        <label class="font-semibold">Geburtstag</label>
                        <input type="date" name="geburtstag" value="${spielerToEdit.geburtstag || ''}" class="w-full p-2 mt-1 bg-gray-100 dark:bg-gray-700 rounded-lg">
                    </div>
                </div>
                <div>
                    <label class="font-semibold">Position</label>
                    <select name="position" class="w-full p-2 mt-1 bg-gray-100 dark:bg-gray-700 rounded-lg">
                        <option value="Torwart" ${spielerToEdit.position === 'Torwart' ? 'selected' : ''}>Torwart</option>
                        <option value="Abwehr" ${spielerToEdit.position === 'Abwehr' ? 'selected' : ''}>Abwehr</option>
                        <option value="Mittelfeld" ${spielerToEdit.position === 'Mittelfeld' ? 'selected' : ''}>Mittelfeld</option>
                        <option value="Sturm" ${spielerToEdit.position === 'Sturm' ? 'selected' : ''}>Sturm</option>
                    </select>
                </div>
            </div>

            <div class="bg-white p-6 rounded-xl shadow-lg space-y-3 dark:bg-gray-800">
                <h2 class="text-xl font-bold text-center">Status & Abwesenheiten</h2>
                <div>
                    <label class="font-semibold">Manueller Status</label>
                    <select name="status" class="w-full p-2 mt-1 bg-gray-100 dark:bg-gray-700 rounded-lg">
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
                            <input type="date" name="urlaubVon" id="urlaubVonInput" value="${spielerToEdit.urlaubVon || ''}" class="flex-grow p-2 mt-1 bg-gray-100 dark:bg-gray-700 rounded-lg">
                            <button type="button" onclick="window.app.clearDateField('urlaubVonInput')" class="p-2 mt-1 bg-red-100 text-red-600 rounded-lg btn" title="Datum löschen"><i class="fas fa-times"></i></button>
                        </div>
                    </div>
                    <div>
                        <label class="text-sm">Urlaub bis</label>
                        <div class="flex items-center gap-2">
                            <input type="date" name="urlaubBis" id="urlaubBisInput" value="${spielerToEdit.urlaubBis || ''}" class="flex-grow p-2 mt-1 bg-gray-100 dark:bg-gray-700 rounded-lg">
                            <button type="button" onclick="window.app.clearDateField('urlaubBisInput')" class="p-2 mt-1 bg-red-100 text-red-600 rounded-lg btn" title="Datum löschen"><i class="fas fa-times"></i></button>
                        </div>
                    </div>
                </div>
                <div class="mt-2">
                    <label class="font-semibold">Verletzt bis</label>
                    <div class="flex items-center gap-2">
                        <input type="date" name="verletztBis" id="verletztBisInput" value="${spielerToEdit.verletztBis || ''}" class="flex-grow p-2 mt-1 bg-gray-100 dark:bg-gray-700 rounded-lg">
                        <button type="button" onclick="window.app.clearDateField('verletztBisInput')" class="p-2 mt-1 bg-red-100 text-red-600 rounded-lg btn" title="Datum löschen"><i class="fas fa-times"></i></button>
                        </div>
                </div>
            </div>

            <div class="bg-white p-6 rounded-xl shadow-lg space-y-3 dark:bg-gray-800">
                <h2 class="text-xl font-bold text-center">Notizen</h2>
                <div>
                    <textarea name="notiz" rows="3" class="w-full p-2 mt-1 bg-gray-100 dark:bg-gray-700 rounded-lg">${spielerToEdit.notiz || ''}</textarea>
                </div>
            </div>
            <button type="submit" class="w-full py-3 mt-4 font-medium text-white uppercase bg-green-600 rounded-lg shadow-lg hover:bg-green-700 btn">Speichern</button>
        </form>
    `;
    return html;
};