import { state } from './state.js';
import { formatDate, parseDateString, getAktuellerStatus, getStatusIndicator, getTrainingsAnzahlGesamt, getMatchAnzahlGesamt, getSpielminutenGesamt, getToreGesamt, getVorlagenGesamt, berechneAlter, formatDateWithWeekday } from './utils.js';

const appContainer = document.getElementById('app-container');
const placeholderBg = () => '475569';
const placeholderText = () => 'E2E8F0';

// =================================================================
// EINSTELLUNGEN-VIEW LOGIK
// =================================================================
const renderEinstellungen = () => {
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


// =================================================================
// EVENTS-VIEW LOGIK
// =================================================================
const renderTrainingUebersicht = (callbacks) => { /* ... content from events-view.js ... */ };
const renderMatchtagUebersicht = (callbacks) => { /* ... content from events-view.js ... */ };
const renderTrainingDetail = (callbacks) => { /* ... content from events-view.js ... */ };
const renderMatchtagDetail = (callbacks) => { /* ... content from events-view.js ... */ };


// =================================================================
// HOME-VIEW LOGIK
// =================================================================
const renderHome = (callbacks) => {
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


// =================================================================
// SPIELER-VIEW LOGIK
// =================================================================
const renderSpielerUebersicht = (callbacks) => { /* ... content from spieler-view.js ... */ };
const renderSpielerDetail = (callbacks) => { /* ... content from spieler-view.js ... */ };
const renderSpielerForm = (callbacks) => { /* ... content from spieler-view.js ... */ };


// =================================================================
// HAUPT-RENDER FUNKTION
// =================================================================
export const render = (callbacks) => {
    appContainer.innerHTML = '';

    const header = (title) => {
        const displayTitle = state.teamInfo.name || title;
        const displayTitle2 = state.teamInfo.name2 || '';
        const emblemHtml = state.teamInfo.emblemUrl
            ? `<img src="${state.teamInfo.emblemUrl}" class="w-8 h-8 rounded-full object-cover mr-3 flex-shrink-0" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
               <div class="w-8 h-8 rounded-full bg-gray-500 flex-shrink-0 mr-3 hidden items-center justify-center"></div>`
            : `<div class="w-8 h-8 rounded-full bg-gray-500 flex-shrink-0 mr-3 flex items-center justify-center"></div>`;
        const titleClass = (displayTitle.length > 15) ? 'text-base font-bold' : 'text-lg font-bold';

        return `
        <header class="bg-white text-gray-800 p-4 sticky top-0 z-50 flex items-center justify-between text-center h-16 border-b-2 border-green-600 dark:bg-gray-800 dark:text-gray-200 dark:border-green-500">
            ${state.isLoggedIn ? `<button onclick="window.app.navigateTo('einstellungen', null, true)" class="flex flex-col items-center justify-center text-gray-600 hover:text-green-600 w-12 h-12 rounded-full hover:bg-gray-100 transition-colors dark:text-gray-400 dark:hover:text-green-400 dark:hover:bg-gray-700 absolute top-2 left-2" title="Einstellungen"><i class="fas fa-cog text-xl"></i></button>` : ''}
            <div class="flex items-center justify-center flex-grow">
                ${emblemHtml}
                <div>
                    <h1 class="${titleClass} whitespace-nowrap">${displayTitle}</h1>
                    ${displayTitle2 ? `<h2 class="text-sm text-gray-500 dark:text-gray-400 leading-tight whitespace-nowrap">${displayTitle2}</h2>` : ''}
                </div>
            </div>
            ${state.isLoggedIn ? `<button onclick="window.app.logout()" class="flex flex-col items-center justify-center text-gray-600 hover:text-green-600 w-12 h-12 rounded-full hover:bg-gray-100 transition-colors dark:text-gray-400 dark:hover:text-green-400 dark:hover:bg-gray-700 absolute top-2 right-2" title="Ausloggen"><i class="fas fa-sign-out-alt text-xl"></i></button>` : ''}
        </header>`;
    };

    const navigationBarHtml = () => {
        if (state.currentPage === 'login' || !state.isLoggedIn) return '';
        const showBack = state.navigationStack.length > 0 && state.currentPage !== 'home';
        const buttonSizeClass = 'w-16 h-16';
        const navButton = (page, icon, title) => {
            const activePages = {
                'home': ['home', 'eventDetail'],
                'spielerUebersicht': ['spielerUebersicht', 'spielerDetail', 'spielerForm'],
                'trainingUebersicht': ['trainingUebersicht', 'trainingDetail'],
                'matchtagUebersicht': ['matchtagUebersicht', 'matchtagDetail'],
                'einstellungen': ['einstellungen']
            };
            const isActive = activePages[page]?.includes(state.currentPage);
            const activeClass = 'text-green-600 dark:text-green-400';
            return `<div class="flex-1 flex justify-center items-center">
                        <button onclick="window.app.navigateTo('${page}', null, true)" class="flex flex-col items-center justify-center text-gray-600 hover:text-green-600 ${buttonSizeClass} rounded-full hover:bg-gray-100 transition-colors ${isActive ? activeClass : ''} dark:text-gray-400 dark:hover:text-green-400 dark:hover:bg-gray-700" title="${title}">
                            <i class="fas ${icon} text-xl"></i>
                            <span class="text-xs mt-1">${title}</span>
                        </button>
                    </div>`;
        };
        let leftButtonHtml = showBack
            ? `<div class="flex-1 flex justify-center items-center"><button onclick="window.app.goBack()" class="flex flex-col items-center justify-center text-gray-600 hover:text-green-600 ${buttonSizeClass} rounded-full hover:bg-gray-100 transition-colors dark:text-gray-400 dark:hover:text-green-400 dark:hover:bg-gray-700" title="Zurück"><i class="fas fa-arrow-left text-xl"></i><span class="text-xs mt-1">Zurück</span></button></div>`
            : navButton('home', 'fa-home', 'Home');
        return `
            <div class="fixed bottom-0 left-0 right-0 z-40 p-4">
                <div class="bg-gradient-to-b from-gray-50 to-white border border-gray-200/75 shadow-lg rounded-full px-2 py-2 w-full max-w-sm mx-auto dark:from-gray-700 dark:to-gray-800 dark:border-gray-600/75">
                    <div class="flex justify-around items-center">
                        ${leftButtonHtml}
                        ${navButton('trainingUebersicht', 'fa-running', 'Training')}
                        ${navButton('matchtagUebersicht', 'fa-futbol', 'Matches')}
                        ${navButton('spielerUebersicht', 'fa-users', 'Spieler')}
                    </div>
                </div>
            </div>`;
    };

    if (state.loading) {
        appContainer.innerHTML = `<div class="flex justify-center items-center h-screen"><div class="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-green-500"></div></div>`;
    } else {
        let pageContent = '', pageTitle = '';
        switch (state.currentPage) {
            case 'login':
                pageContent = `
                    <div class="min-h-screen flex flex-col justify-center items-center p-4 dark:bg-gray-900">
                        <div class="w-full max-w-md">
                            <div class="bg-gray-800/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg text-center dark:bg-gray-800/80">
                                <div class="flex justify-center mb-6">
                                    ${state.teamInfo.emblemUrl
                                        ? `<img src="${state.teamInfo.emblemUrl}" class="w-20 h-20 rounded-full object-cover shadow-md" onerror="this.style.display='none';">`
                                        : `<div class="w-20 h-20 rounded-full bg-gray-600 flex items-center justify-center text-4xl text-gray-500 shadow-md"></div>`
                                    }
                                </div>
                                <h1 class="text-2xl font-bold text-gray-200 mb-2">Willkommen</h1>
                                <p class="text-gray-400 mb-8">${state.teamInfo.name2 || 'Bitte melden Sie sich an'}</p>
                                <form id="loginForm" class="space-y-6">
                                    <div class="relative">
                                        <span class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                                            <i class="fas fa-envelope"></i>
                                        </span>
                                        <input type="email" id="email" name="email" class="w-full p-3 pl-12 text-gray-300 bg-gray-700 rounded-lg focus:outline-none focus:bg-gray-600 focus:ring-2 focus:ring-green-500 transition-all" value="trainer@demo.com" placeholder="Benutzer (E-Mail)" required>
                                    </div>
                                    <div class="relative">
                                        <span class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                                            <i class="fas fa-lock"></i>
                                        </span>
                                        <input type="password" id="password" name="password" class="w-full p-3 pl-12 text-gray-300 bg-gray-700 rounded-lg focus:outline-none focus:bg-gray-600 focus:ring-2 focus:ring-green-500 transition-all" value="1234" placeholder="Passwort" required>
                                    </div>
                                    <div>
                                        <button type="submit" class="w-full py-3 mt-6 font-medium tracking-widest text-white uppercase bg-gradient-to-r from-green-500 to-green-600 rounded-lg shadow-lg focus:outline-none hover:from-green-600 hover:to-green-700 hover:shadow-xl btn">
                                            Anmelden
                                        </button>
                                    </div>
                                </form>
                            </div>
                            <p class="text-center text-gray-400 text-xs mt-4">${callbacks.getCurrentVersion()}</p>
                        </div>
                    </div>
                `;
                break;
            case 'home': pageTitle = 'Home Übersicht'; pageContent = renderHome(callbacks); break;
            case 'spielerUebersicht': pageTitle = 'Spielerübersicht'; pageContent = renderSpielerUebersicht(callbacks); break;
            case 'spielerDetail': pageTitle = 'Spieler Detail'; pageContent = renderSpielerDetail(callbacks); break;
            case 'spielerForm': pageTitle = 'Spieler bearbeiten'; pageContent = renderSpielerForm(callbacks); break;
            case 'trainingUebersicht': pageTitle = 'Training'; pageContent = renderTrainingUebersicht(callbacks); break;
            case 'trainingDetail': pageTitle = 'Training Details'; pageContent = renderTrainingDetail(callbacks); break;
            case 'matchtagUebersicht': pageTitle = 'Matchtage'; pageContent = renderMatchtagUebersicht(callbacks); break;
            case 'matchtagDetail': pageTitle = 'Matchtag Details'; pageContent = renderMatchtagDetail(callbacks); break;
            case 'einstellungen': pageTitle = 'Einstellungen'; pageContent = renderEinstellungen(callbacks); break;
            default: pageTitle = 'Fehler'; pageContent = `<p>Seite nicht gefunden.</p>`;
        }
        appContainer.innerHTML = state.currentPage === 'login' ? pageContent : `${header(pageTitle)}${navigationBarHtml()}<main class="p-4 space-y-4 pb-24">${pageContent}</main>`;
        callbacks.addEventListeners();
    }
};
