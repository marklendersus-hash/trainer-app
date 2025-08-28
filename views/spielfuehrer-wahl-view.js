import { state } from '../state.js';

export const renderSpielfuehrerWahl = (callbacks) => {
    const spielerOptions = (excludeId) => state.spieler
        .filter(s => s.status === 'Aktiv' && s.id !== excludeId)
        .map(s => `<option value="${s.id}">${s.name}</option>`)
        .join('');

    return `
        <div class="p-4 rounded-xl border border-gray-700">
            <h2 class="text-xl font-bold text-center">Spielführerwahl</h2>
        </div>
        <form id="spielfuehrerWahlForm">
            <div class="p-4 mt-4 rounded-xl border border-gray-700">
                ${state.spieler.filter(s => s.status === 'Aktiv').map(spieler => `
                    <div class="grid grid-cols-[1fr,1fr,1fr] items-center gap-x-4 mb-2">
                        <span class="font-semibold">${spieler.name}</span>
                        <select name="${spieler.id}" class="w-full p-2 bg-gray-700 text-gray-200 rounded-lg">
                            <option value="">1. Stimme</option>
                            ${spielerOptions(spieler.id)}
                        </select>
                        <select name="${spieler.id}" class="w-full p-2 bg-gray-700 text-gray-200 rounded-lg">
                            <option value="">2. Stimme</option>
                            ${spielerOptions(spieler.id)}
                        </select>
                    </div>
                `).join('')}
            </div>
            <div class="p-4 mt-4 rounded-xl border border-gray-700">
                <button type="submit" class="w-full py-3 font-medium text-white uppercase bg-green-600 rounded-lg shadow-lg hover:bg-green-700 btn">
                    Wahl auswerten
                </button>
            </div>
        </form>
    `;
};