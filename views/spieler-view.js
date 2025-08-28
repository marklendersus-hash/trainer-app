import { state } from '../state.js';
import { getAktuellerStatus, getStatusIndicator, formatDate, getTrainingsAnzahlGesamt, getMatchAnzahlGesamt, getSpielminutenGesamt, getToreGesamt, getVorlagenGesamt, berechneAlter, parseDateString } from '../utils.js';

const placeholderBg = () => '475569';
const placeholderText = () => 'E2E8F0';

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
                <p class="font-bold flex items-center">${getStatusIndicator(getAktuellerStatus(spieler))} <span class="ml-2">${spieler.name}</span><span class="text-gray-400 font-normal ml-2">#${spieler.nummer || '?'}</span></p>
                <div class="text-sm text-gray-400 mt-1">
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

export const renderSpielerUebersicht = (callbacks) => {
    let filteredSpieler = state.spieler.filter(s => s.name.toLowerCase().includes(state.filter.toLowerCase()));
    
    const todayStringForTotal = formatDate(new Date());
    const pastTrainingsForTotal = state.trainingseinheiten.filter(t => !t.cancelled && t.id <= todayStringForTotal);
    const totalTrainings = pastTrainingsForTotal.length;

    return `
        <div class="flex justify-between items-center p-4 rounded-xl border border-gray-700">
            <h2 class="text-xl font-bold">Spielerdatenbank</h2>
            <button onclick="window.app.navigateTo('spielerForm')" class="w-10 h-10 bg-green-600 text-white rounded-full btn flex items-center justify-center">
                <i class="fas fa-plus"></i>
            </button>
        </div>
        <div class="space-y-3 mt-4">
            ${filteredSpieler.length > 0 ? filteredSpieler.map(spieler => createSpielerCardHtml(spieler, totalTrainings)).join('') : `
            <div class="p-6 rounded-xl text-center text-gray-400 border border-gray-700">
                <p>Noch keine Spieler vorhanden.</p>
                <p class="mt-2">Fügen Sie einen neuen Spieler über den <span class="inline-block mx-1 px-2 py-1 bg-green-900 text-green-300 rounded-md font-bold">+</span> Button hinzu oder importieren Sie Daten in den Einstellungen.</p>
            </div>
            `}
        </div>
    `;
};

export const renderSpielerDetail = (callbacks) => {
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

export const renderSpielerForm = (callbacks) => {
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
                <input type="hidden" id="deleteFotoFlag" name="deleteFoto" value="false">
                <div>
                    <label class="font-semibold">Profilfoto</label>
                    <div class="relative w-24 h-24 mx-auto">
                        ${fotoVorschauHtml}
                        ${spielerToEdit.fotoUrl ? `<button type="button" onclick="window.app.markFotoForDeletion()" class="absolute top-0 right-0 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center btn" title="Foto löschen"><i class="fas fa-times"></i></button>` : ''}
                    </div>
                    <input type="file" name="foto" id="fotoUpload" accept="image/*" class="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100 mt-2 dark:text-gray-400 dark:file:bg-gray-700 dark:file:text-gray-300 dark:hover:file:bg-gray-600">
                </div>
                <div class="grid grid-cols-[1fr,auto] items-center gap-x-4">
                    <input type="text" name="name" value="${spielerToEdit.name || ''}" class="w-full p-2 bg-gray-100 dark:bg-gray-700 dark:text-gray-200 rounded-lg" required>
                    <label class="font-semibold">Name</label>
                </div>
                <div class="grid grid-cols-2 gap-4">
                    <div class="grid grid-cols-[1fr,auto] items-center gap-x-4">
                        <input type="number" name="nummer" value="${spielerToEdit.nummer || ''}" class="w-full p-2 bg-gray-100 dark:bg-gray-700 dark:text-gray-200 rounded-lg">
                        <label class="font-semibold">Nummer</label>
                    </div>
                    <div class="grid grid-cols-[1fr,auto] items-center gap-x-4">
                        <input type="date" name="geburtstag" value="${spielerToEdit.geburtstag || ''}" class="w-full p-2 bg-gray-100 dark:bg-gray-700 dark:text-gray-200 rounded-lg">
                        <label class="font-semibold">Geburtstag</label>
                    </div>
                </div>
                <div class="grid grid-cols-[1fr,auto] items-center gap-x-4">
                    <select name="position" class="w-full p-2 bg-gray-100 dark:bg-gray-700 dark:text-gray-200 rounded-lg">
                        <option value="Torwart" ${spielerToEdit.position === 'Torwart' ? 'selected' : ''}>Torwart</option>
                        <option value="Abwehr" ${spielerToEdit.position === 'Abwehr' ? 'selected' : ''}>Abwehr</option>
                        <option value="Mittelfeld" ${spielerToEdit.position === 'Mittelfeld' ? 'selected' : ''}>Mittelfeld</option>
                        <option value="Sturm" ${spielerToEdit.position === 'Sturm' ? 'selected' : ''}>Sturm</option>
                    </select>
                    <label class="font-semibold">Position</label>
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
