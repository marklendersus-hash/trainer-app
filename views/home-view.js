import { state } from '../state.js';
import { formatDate, parseDateString } from '../utils.js';

export const renderHome = (callbacks) => {
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
            classes += ' bg-gray-100 dark:bg-gray-700/50';
        }

        // *** ANPASSUNG START: Icons für abgesagte Termine geändert ***
        daysHtml += `<div class="${classes}" onclick="window.app.showEventDetailModal('${dateString}')">
                        <span class="${isFeiertag && !isPast ? 'text-red-500 font-bold' : ''} ${isPast ? 'text-gray-400 dark:text-gray-500' : ''}">${day}</span>
                        <div class="event-icons mt-1 flex flex-col items-center space-y-1">
                            ${hatGeburtstag && state.showGeburtstageOnHomeCalendar ? `<i class="fas fa-birthday-cake ${isPast ? 'text-gray-400 dark:text-gray-500' : 'text-pink-500'}"></i>` : ''}
                            ${isTrainingCancelled ? `<i class="fas fa-times-circle ${isPast ? 'text-gray-400 dark:text-gray-500' : 'text-blue-500'}" title="Training Abgesagt"></i>` : ''}
                            ${isMatchCancelled ? `<i class="fas fa-times-circle ${isPast ? 'text-gray-400 dark:text-gray-500' : 'text-yellow-500'}" title="Match Abgesagt"></i>` : ''}
                            ${hasTraining && state.showTrainingsOnHomeCalendar ? `<i class="fas fa-running ${isPast ? 'text-gray-400 dark:text-gray-500' : 'text-blue-500'}"></i>` : ''}
                            ${hasMatch && state.showMatchesOnHomeCalendar ? `<i class="fas fa-futbol ${isPast ? 'text-gray-400 dark:text-gray-500' : 'text-yellow-500'}"></i>` : ''}
                        </div>
                    </div>`;
        // *** ANPASSUNG ENDE ***
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
        <div class="bg-white p-4 rounded-xl shadow-lg dark:bg-gray-800">
            <div class="flex justify-between items-center mb-4">
                <button onclick="window.app.changeMonth(-1)" class="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg btn"><i class="fas fa-chevron-left"></i></button>
                <div class="text-center">
                    <h3 class="text-lg font-bold">${monthNames[month]} ${year}</h3>
                    ${!isCurrentMonth ? `<button onclick="window.app.goToToday()" class="text-xs text-blue-500 hover:underline">Heute</button>` : ''}
                </div>
                <button onclick="window.app.changeMonth(1)" class="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg btn"><i class="fas fa-chevron-right"></i></button>
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
                    <span class="ml-2 text-gray-700 dark:text-gray-300">Training</span>
                </label>
                <label class="flex items-center cursor-pointer">
                    <input type="checkbox" class="form-checkbox h-4 w-4 text-yellow-600 rounded" 
                           ${state.showMatchesOnHomeCalendar ? 'checked' : ''} 
                           onchange="window.app.setHomeCalendarFilter('matches', this.checked)">
                    <span class="ml-2 text-gray-700 dark:text-gray-300">Matches</span>
                </label>
                <label class="flex items-center cursor-pointer">
                    <input type="checkbox" class="form-checkbox h-4 w-4 text-pink-600 rounded" 
                           ${state.showGeburtstageOnHomeCalendar ? 'checked' : ''} 
                           onchange="window.app.setHomeCalendarFilter('geburtstage', this.checked)">
                    <span class="ml-2 text-gray-700 dark:text-gray-300">Geburtstage</span>
                </label>
            </div>
        </div>
        <div class="bg-white p-4 rounded-xl shadow-lg dark:bg-gray-800">
            <h2 class="text-lg font-bold mb-2 text-center"><i class="fas fa-calendar-alt mr-2"></i>Nächste Termine</h2>
            <div class="space-y-2">
                ${nextEventGroups.length > 0 ? nextEventGroups.map(([date, events]) => {
                    const eventDate = parseDateString(date);
                    const isToday = formatDate(new Date()) === date;
                    return `
                    <div class="flex items-center py-1 px-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer" onclick="window.app.showEventDetailModal('${date}')">
                        <div class="text-center mr-4 flex-shrink-0 w-16">
                            <p class="font-bold ${isToday ? 'text-green-600 dark:text-green-400' : ''}">${eventDate.toLocaleDateString('de-DE', { weekday: 'short' })}</p>
                            <p class="text-2xl font-bold ${isToday ? 'text-green-600 dark:text-green-400' : ''}">${eventDate.getDate()}</p>
                            <p class="text-sm text-gray-600 dark:text-gray-400">${eventDate.toLocaleDateString('de-DE', { month: 'short' })}</p>
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
                                    <p class="font-semibold text-gray-800 dark:text-gray-200">${event.title}</p>
                                </div>
                                `;
                            }).join('')}
                        </div>
                    </div>
                    `;
                }).join('<hr class="my-2 dark:border-gray-700">') : '<p class="text-center text-gray-500 dark:text-gray-400">Keine anstehenden Termine.</p>'}
            </div>
        </div>
    `;
};
