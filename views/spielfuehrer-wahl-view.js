import { state } from '../state.js';

export const renderSpielfuehrerWahl = (callbacks) => {
    const spielerOptions = (excludeId, selectedId) => state.spieler
        .filter(s => s.status === 'Aktiv' && s.id !== excludeId)
        .map(s => `<option value="${s.id}" ${s.id === selectedId ? 'selected' : ''}>${s.name}</option>`)
        .join('');

    return `
        <div class="p-4 rounded-xl border border-gray-700">
            <h2 class="text-xl font-bold text-center">Spielführerwahl</h2>
        </div>
        <div class="p-4 mt-4 rounded-xl border border-gray-700">
            ${state.spieler.filter(s => s.status === 'Aktiv').map(spieler => `
                <div class="grid grid-cols-[1fr,1fr,1fr] items-center gap-x-4 mb-2">
                    <a href="#" onclick="window.app.navigateTo('spielerDetail', '${spieler.id}'); return false;" class="font-semibold text-green-400 hover:underline">${spieler.name}</a>
                    <select name="${spieler.id}" class="w-full p-2 bg-gray-700 text-gray-200 rounded-lg" onchange="window.app.updateSpielfuehrerWahl('${spieler.id}', 0, this.value)">
                        <option value="">1. Stimme</option>
                        ${spielerOptions(spieler.id, state.spielfuehrerWahl.votes[spieler.id]?.[0])}
                    </select>
                    <select name="${spieler.id}" class="w-full p-2 bg-gray-700 text-gray-200 rounded-lg" onchange="window.app.updateSpielfuehrerWahl('${spieler.id}', 1, this.value)">
                        <option value="">2. Stimme</option>
                        ${spielerOptions(spieler.id, state.spielfuehrerWahl.votes[spieler.id]?.[1])}
                    </select>
                </div>
            `).join('')}
        </div>
        <div class="p-4 mt-4 rounded-xl border border-gray-700">
            <button onclick="window.app.navigateTo('wahlergebnis')" class="w-full py-3 font-medium text-white uppercase bg-green-600 rounded-lg shadow-lg hover:bg-green-700 btn">
                Ergebnis anzeigen
            </button>
        </div>
    `;
};