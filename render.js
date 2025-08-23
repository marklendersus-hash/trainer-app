import { state } from './state.js';
import { renderHome } from './views/home-view.js';
import { renderSpielerUebersicht, renderSpielerDetail, renderSpielerForm } from './views/spieler-view.js';
import { renderTrainingUebersicht, renderMatchtagUebersicht, renderTrainingDetail, renderMatchtagDetail } from './views/events-view.js';
import { renderEinstellungen } from './views/einstellungen-view.js';

// Remove the incorrect import:
// import { addModalListeners } from './views/modals.js';

const appContainer = document.getElementById('app-container');

export const render = (callbacks) => {
    appContainer.innerHTML = '';
    


    const header = (title) => {
        const displayTitle = state.teamInfo.name || title;
        const displayTitle2 = state.teamInfo.name2 || '';
        const emblemHtml = state.teamInfo.emblemUrl
            ? `<img src="${state.teamInfo.emblemUrl}" class="w-8 h-8 rounded-full object-cover mr-3 flex-shrink-0" onerror="this.style.display='none'; this.nextSibling.style.display='flex';">`
            : `<div class="w-8 h-8 rounded-full bg-gray-500 flex-shrink-0"></div>`;
        const titleClass = (displayTitle.length > 15) ? 'text-base font-bold' : 'text-lg font-bold';

        return `
        <header class="bg-white text-gray-800 p-4 sticky top-0 z-50 flex items-center justify-between text-center h-16 border-b-2 border-green-600 dark:bg-gray-800 dark:text-gray-200 dark:border-green-500">
            ${state.isLoggedIn ? `
            <button onclick="window.app.navigateTo('einstellungen', null, true)" class="flex flex-col items-center justify-center text-gray-600 hover:text-green-600 w-12 h-12 rounded-full hover:bg-gray-100 transition-colors dark:text-gray-400 dark:hover:text-green-400 dark:hover:bg-gray-700 absolute top-2 left-2" title="Einstellungen">
                <i class="fas fa-cog text-xl"></i>
            </button>
            ` : ''}
            <div class="flex items-center justify-center flex-grow">
                ${emblemHtml}
                <div>
                    <h1 class="${titleClass} whitespace-nowrap">${displayTitle}</h1>
                    ${displayTitle2 ? `<h2 class="text-sm text-gray-500 dark:text-gray-400 leading-tight whitespace-nowrap">${displayTitle2}</h2>` : ''}
                </div>
            </div>
            ${state.isLoggedIn ? `
            <button onclick="window.app.logout()" class="flex flex-col items-center justify-center text-gray-600 hover:text-green-600 w-12 h-12 rounded-full hover:bg-gray-100 transition-colors dark:text-gray-400 dark:hover:text-green-400 dark:hover:bg-gray-700 absolute top-2 right-2" title="Ausloggen">
                <i class="fas fa-sign-out-alt text-xl"></i>
            </button>
            ` : ''}
        </header>
        `};

    const navigationBarHtml = () => {
        if (state.currentPage === 'login' || !state.isLoggedIn) return '';
        const showBack = state.navigationStack.length > 0 && state.currentPage !== 'home';
        const buttonSizeClass = 'w-16 h-16';
        const navPaddingClass = 'py-2';
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
                <div class="bg-gradient-to-b from-gray-50 to-white border border-gray-200/75 shadow-lg rounded-full px-2 ${navPaddingClass} w-full max-w-sm mx-auto dark:from-gray-700 dark:to-gray-800 dark:border-gray-600/75">
                    <div class="flex justify-around items-center">
                        ${leftButtonHtml}
                        ${navButton('trainingUebersicht', 'fa-running', 'Training')}
                        ${navButton('matchtagUebersicht', 'fa-futbol', 'Matches')}
                        ${navButton('spielerUebersicht', 'fa-users', 'Spieler')}
                    </div>
                </div>
            </div>
        `;
    };
    
    if (state.loading) {
        appContainer.innerHTML = `<div class="flex justify-center items-center h-screen">
            <div class="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-green-500"></div>
        </div>`;
    } else {
        let pageContent = '';
        let pageTitle = '';
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
                                        <input type="email" id="email" class="w-full p-3 pl-12 text-gray-300 bg-gray-700 rounded-lg focus:outline-none focus:bg-gray-600 focus:ring-2 focus:ring-green-500 transition-all" value="trainer@demo.com" placeholder="Benutzer (E-Mail)" required>
                                    </div>
                                    <div class="relative">
                                        <span class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                                            <i class="fas fa-lock"></i>
                                        </span>
                                        <input type="password" id="password" class="w-full p-3 pl-12 text-gray-300 bg-gray-700 rounded-lg focus:outline-none focus:bg-gray-600 focus:ring-2 focus:ring-green-500 transition-all" value="1234" placeholder="Passwort" required>
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
            case 'home':
                pageTitle = 'Home Übersicht';
                pageContent = renderHome(callbacks);
                break;
            case 'spielerUebersicht':
                pageTitle = 'Spielerübersicht';
                pageContent = renderSpielerUebersicht(callbacks);
                break;
            case 'spielerDetail':
                pageTitle = 'Spieler Detail';
                pageContent = renderSpielerDetail(callbacks);
                break;
            case 'spielerForm':
                pageTitle = 'Spieler bearbeiten';
                pageContent = renderSpielerForm(callbacks);
                break;
            case 'trainingUebersicht':
                pageTitle = 'Training';
                pageContent = renderTrainingUebersicht(callbacks);
                break;
            case 'trainingDetail':
                pageTitle = 'Training Details';
                pageContent = renderTrainingDetail(callbacks);
                break;
            case 'matchtagUebersicht':
                pageTitle = 'Matchtage';
                pageContent = renderMatchtagUebersicht(callbacks);
                break;
            case 'matchtagDetail':
                pageTitle = 'Matchtag Details';
                pageContent = renderMatchtagDetail(callbacks);
                break;
            case 'einstellungen':
                pageTitle = 'Einstellungen';
                pageContent = renderEinstellungen(callbacks);
                break;
            default:
                pageTitle = 'Fehler';
                pageContent = `
                    <main class="p-4 pb-24">
                        <p>Seite nicht gefunden.</p>
                        <button onclick="window.app.navigateTo('home', null, true)">Zurück zur Home-Seite</button>
                    </main>
                `;
        }
        appContainer.innerHTML = state.currentPage === 'login' ? pageContent : `${header(pageTitle)}${navigationBarHtml()}<main class="p-4 space-y-4 pb-24">${pageContent}</main>`;
        callbacks.addEventListeners();
    }
};