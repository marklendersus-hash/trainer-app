import { state } from './state.js';
import { getPageThemeColor, renderHeader, renderNavigationBar } from './views/layout-view.js';
import { renderHome } from './views/home-view.js';
import { renderSpielerUebersicht, renderSpielerDetail, renderSpielerForm } from './views/spieler-view.js';
import { renderTrainingUebersicht, renderMatchtagUebersicht, renderTrainingDetail, renderMatchtagDetail } from './views/events-view.js';
import { renderEinstellungen } from './views/einstellungen-view.js';
import { renderSpielfuehrerWahl } from './views/spielfuehrer-wahl-view.js';
import { renderWahlergebnis } from './views/wahlergebnis-view.js';

const appContainer = document.getElementById('app-container');

export const render = (callbacks) => {
    appContainer.innerHTML = '';

    if (state.loading) {
        appContainer.innerHTML = `<div class="flex justify-center items-center h-screen"><div class="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-green-500"></div></div>`;
        return;
    }

    let pageContent = '', pageTitle = '';
    switch (state.currentPage) {
        case 'login':
            pageContent = `
                <div class="min-h-screen flex flex-col justify-center items-center p-4 bg-gray-900">
                    <div class="w-full max-w-md">
                        <div class="bg-gray-800/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg text-center">
                            <div class="flex justify-center mb-6">
                                ${state.teamInfo.emblemUrl
                                    ? `<img src="${state.teamInfo.emblemUrl}" class="w-32 h-32 rounded-full object-cover shadow-md" onerror="this.style.display='none';">`
                                    : `<img src="icons/icon-192x192.png" class="w-32 h-32 rounded-full object-cover shadow-md">`
                                }
                            </div>
                            <h1 class="text-2xl font-bold text-gray-200 mb-2">Willkommen</h1>
                            <p class="text-gray-400 mb-8">${state.teamInfo.name2 || 'Bitte melden Sie sich an'}</p>
                            <form id="loginForm" class="space-y-6">
                                <div class="relative">
                                    <span class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"><i class="fas fa-envelope"></i></span>
                                    <input type="email" id="email" name="email" class="w-full p-3 pl-12 text-gray-300 bg-gray-700 rounded-lg focus:outline-none focus:bg-gray-600 focus:ring-2 focus:ring-green-500 transition-all" value="trainer@demo.com" placeholder="Benutzer (E-Mail)" required>
                                </div>
                                <div class="relative">
                                    <span class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"><i class="fas fa-lock"></i></span>
                                    <input type="password" id="password" name="password" class="w-full p-3 pl-12 text-gray-300 bg-gray-700 rounded-lg focus:outline-none focus:bg-gray-600 focus:ring-2 focus:ring-green-500 transition-all" value="1234" placeholder="Passwort" required>
                                </div>
                                <div>
                                    <button type="submit" class="w-full py-3 mt-6 font-medium tracking-widest text-white uppercase bg-gradient-to-r from-green-500 to-green-600 rounded-lg shadow-lg focus:outline-none hover:from-green-600 hover:to-green-700 hover:shadow-xl btn">Anmelden</button>
                                </div>
                            </form>
                        </div>
                        <p class="text-center text-gray-400 text-xs mt-4">${callbacks.getCurrentVersion()}</p>
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
        case 'spielfuehrerWahl': pageTitle = 'Spielführerwahl'; pageContent = renderSpielfuehrerWahl(callbacks); break;
        case 'wahlergebnis': pageTitle = 'Wahlergebnis'; pageContent = renderWahlergebnis(callbacks); break;
        default: pageTitle = 'Fehler'; pageContent = `<p>Seite nicht gefunden.</p>`;
    }

    const color = getPageThemeColor(state.currentPage);
    if (state.currentPage === 'login') {
        appContainer.innerHTML = pageContent;
    } else {
        appContainer.innerHTML = `${renderHeader(pageTitle)}${renderNavigationBar()}<main class="p-4 space-y-4 pt-20 border-2 border-${color}-500 rounded-lg">${pageContent}</main>`;
    }
    
    callbacks.addEventListeners();
};