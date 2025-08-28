import { state } from '../state.js';

export const renderWahlergebnis = (callbacks) => {
    const results = state.wahlergebnis;
    if (!results) {
        return `<p>Keine Wahlergebnisse vorhanden.</p>`;
    }

    let resultHtml = '<div class="space-y-2">';
    results.forEach(([playerId, count]) => {
        const player = state.spieler.find(p => p.id === playerId);
        if (player) {
            resultHtml += `<div class="flex justify-between items-center"><p>${player.name}</p><p>${count} Stimme(n)</p></div>`;
        }
    });
    resultHtml += '</div>';

    return `
        <div class="p-4 rounded-xl border border-gray-700">
            <h2 class="text-xl font-bold text-center">Wahlergebnis</h2>
        </div>
        <div class="p-4 mt-4 rounded-xl border border-gray-700">
            ${resultHtml}
        </div>
        <div class="p-4 mt-4 rounded-xl border border-gray-700">
            <button id="saveWahl" class="w-full py-3 font-medium text-white uppercase bg-green-600 rounded-lg shadow-lg hover:bg-green-700 btn">
                Wahl speichern
            </button>
        </div>
    `;
};