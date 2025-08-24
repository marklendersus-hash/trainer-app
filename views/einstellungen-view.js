import { state } from './state.js';

export const renderEinstellungen = () => {
    const emblemVorschauHtml = state.teamInfo.emblemUrl
        ? `<img id="emblemVorschau" src="${state.teamInfo.emblemUrl}" class="w-24 h-24 rounded-full mx-auto object-cover">`
        : `<img id="emblemVorschau" src="#" alt="Vorschau" class="w-24 h-24 rounded-full mx-auto object-cover hidden">`;
    return `
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 space-y-4">
            <h2 class="text-xl font-bold text-center">Darstellung</h2>
            <p class="text-center text-gray-500 dark:text-gray-400">Der Dunkelmodus ist standardmäßig aktiviert.</p>
        </div>
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 space-y-4">
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
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 space-y-4">
            <h2 class="text-xl font-bold text-center">Regelmäßige Trainingseinheiten</h2>
            <form id="trainingsForm" class="space-y-3">
                ${
                    ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag', 'Sonntag'].map(tag => {
                        const schedule = state.teamInfo.trainingSchedule || {};
                        const isChecked = !!schedule[tag];
                        const timeValue = schedule[tag] || '';
                        return `
                            <div class="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
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
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 space-y-4">
            <h2 class="text-xl font-bold text-center">Datenverwaltung</h2>
            <input type="file" id="jsonImportInput" accept=".json" class="hidden">
            <button onclick="window.app.importData()" class="w-full py-3 font-medium text-white uppercase bg-blue-600 rounded-lg shadow-lg hover:bg-blue-700 btn">Daten Importieren (JSON)</button>
            <button onclick="window.app.showExportOptionsModal()" class="w-full py-3 font-medium text-white uppercase bg-gray-600 rounded-lg shadow-lg hover:bg-gray-700 btn">Daten Exportieren (JSON)</button>
            <button onclick="window.app.showDeleteOptionsModal()" class="w-full py-3 font-medium text-white uppercase bg-red-600 rounded-lg shadow-lg hover:bg-red-700 btn mt-4">Daten löschen</button>
        </div>
    `;
};
