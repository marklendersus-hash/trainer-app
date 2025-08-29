import { state } from '../state.js';
import { formatDateWithWeekday } from '../utils.js';

export const renderTrikotsWaschen = (callbacks) => {
    const waschCount = state.matchtage.reduce((acc, match) => {
        if (match.trikotwaescher) {
            acc[match.trikotwaescher] = (acc[match.trikotwaescher] || 0) + 1;
        }
        return acc;
    }, {});

    const matchRows = state.matchtage.map(match => `
        <div class="flex justify-between items-center p-3 rounded-lg border border-gray-700">
            <div>
                <p class="font-semibold">${formatDateWithWeekday(match.id)}</p>
                <p class="text-sm text-gray-400">${match.gegner}</p>
            </div>
            <div>
                <select data-match-id="${match.id}" class="w-full p-2 bg-gray-700 text-gray-200 rounded-lg trikot-select">
                    <option value="">Wähle Spieler</option>
                    ${state.spieler.map(s => {
                        const count = waschCount[s.id] || 0;
                        return `<option value="${s.id}" ${match.trikotwaescher === s.id ? 'selected' : ''}>${s.name} (${count}x)</option>`;
                    }).join('')}
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