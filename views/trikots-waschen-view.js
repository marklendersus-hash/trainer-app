import { state } from '../state.js';
import { formatDateWithWeekday } from '../utils.js';

export const renderTrikotsWaschen = (callbacks) => {
    const spielerOptions = state.spieler.map(s => `<option value="${s.id}">${s.name}</option>`).join('');

    const matchRows = state.matchtage.map(match => `
        <div class="flex justify-between items-center p-3 rounded-lg border border-gray-700">
            <div>
                <p class="font-semibold">${formatDateWithWeekday(match.id)} vs ${match.gegner}</p>
            </div>
            <div>
                <select data-match-id="${match.id}" class="w-full p-2 bg-gray-700 text-gray-200 rounded-lg trikot-select">
                    <option value="">Wähle Spieler</option>
                    ${state.spieler.map(s => `<option value="${s.id}" ${match.trikotwaescher === s.id ? 'selected' : ''}>${s.name}</option>`).join('')}
                </select>
            </div>
        </div>
    `).join('');

    return `
        <div class="p-4 rounded-xl border border-gray-700">
            <h2 class="text-xl font-bold text-center mb-4">Trikots waschen</h2>
            <div class="space-y-2">
                ${matchRows}
            </div>
        </div>
    `;
};