import { state } from './state.js';
import { renderHeader, renderNavigationBar } from './views/layout-view.js';
import { renderHome } from './views/home-view.js';
import { renderSpielerUebersicht, renderSpielerDetail, renderSpielerForm } from './views/spieler-view.js';
import { renderTrainingUebersicht, renderMatchtagUebersicht, renderTrainingDetail, renderMatchtagDetail } from './views/events-view.js';
import { renderEinstellungen } from './views/einstellungen-view.js';
import { renderSpielfuehrerWahl } from './views/spielfuehrer-wahl-view.js';
import { renderWahlergebnis } from './views/wahlergebnis-view.js';
import { renderTrikotsWaschen } from './views/trikots-waschen-view.js';

const appContainer = document.getElementById('app-container');

export const render = (callbacks) => {
    appContainer.innerHTML = '';

    if (state.showWelcomeScreen) {
        appContainer.innerHTML = `
            <div class="min-h-screen h-screen overflow-hidden flex flex-col justify-center items-center p-4 bg-gradient-to-br from-gray-900 to-gray-800">
                <h1 class="text-4xl font-bold text-white animate-welcome-text">Willkommen, Trainer!</h1>
            </div>
        `;
        return;
    }

    if (state.loading) {
        appContainer.innerHTML = `<div class="flex justify-center items-center h-screen"><div class="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-green-500"></div></div>`;
        return;
    }

    let pageContent = '', pageTitle = '';
    switch (state.currentPage) {
        case 'login':
            pageContent = `
                <div class="min-h-screen h-screen overflow-hidden flex flex-col justify-center items-center p-4 bg-gradient-to-br from-gray-900 to-gray-800">
                    <div class="w-full max-w-md">
                        <div class="bg-gray-800/80 backdrop-blur-sm p-8 rounded-2xl shadow-2xl text-center animate-fade-in-up">
                            <div class="flex justify-center mb-6 animate-fade-in-up animation-delay-100">
                                ${state.teamInfo.emblemUrl
                                    ? `<img src="${state.teamInfo.emblemUrl}" class="w-32 h-32 rounded-full object-cover shadow-md" onerror="this.style.display='none';">`
                                    : `<img src="icons/icon-192x192.png" class="w-32 h-32 rounded-full object-cover shadow-md">`
                                }
                            </div>
                            <h1 class="text-2xl font-bold text-gray-200 mb-2 animate-fade-in-up animation-delay-200">Willkommen</h1>
                            <p class="text-gray-400 mb-8 animate-fade-in-up animation-delay-300">${state.teamInfo.name2 || 'Bitte melden Sie sich an'}</p>
                            <form id="loginForm" class="space-y-6 animate-fade-in-up animation-delay-400">
                                <div class="relative">
                                    <span class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"><i class="fas fa-envelope"></i></span>
                                    <input type="email" id="email" name="email" class="w-full p-3 pl-12 text-gray-300 bg-gray-700 rounded-lg focus:outline-none focus:bg-gray-600 focus:ring-2 focus:ring-green-500 transition-all placeholder-gray-400" value="trainer@demo.com" placeholder="Benutzer (E-Mail)" required>
                                </div>
                                <div class="relative">
                                    <span class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"><i class="fas fa-lock"></i></span>
                                    <input type="password" id="password" name="password" class="w-full p-3 pl-12 text-gray-300 bg-gray-700 rounded-lg focus:outline-none focus:bg-gray-600 focus:ring-2 focus:ring-green-500 transition-all placeholder-gray-400" value="1234" placeholder="Passwort" required>
                                    <span class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer" id="togglePassword"><i class="fas fa-eye"></i></span>
                                </div>
                                <div class="text-right">
                                    <a href="#" class="text-xs text-green-400 hover:text-green-300 transition">Passwort vergessen?</a>
                                </div>
                                <div>
                                    <button type="submit" id="loginButton" class="w-full py-3 mt-4 font-medium tracking-widest text-white uppercase bg-gradient-to-r from-green-500 to-green-600 rounded-lg shadow-lg focus:outline-none hover:from-green-600 hover:to-green-700 hover:shadow-xl btn flex justify-center items-center">
                                        <span id="loginButtonText">Anmelden</span>
                                        <div id="loginSpinner" class="hidden rounded-full border-4 border-t-4 border-white btn-spinner ml-2"></div>
                                    </button>
                                </div>
                            </form>
                        </div>
                        <div class="text-center text-gray-500 text-xs mt-8 animate-fade-in-up animation-delay-500">
                            <p>${callbacks.getCurrentVersion()}</p>
                            <p>Made in Blackforest</p>
                        </div>
                    </div>
                `;
            break;
        case 'home': pageTitle = 'Home Übersicht'; pageContent = renderHome(callbacks); break;
        case 'spielerUebersicht': pageTitle = 'Spielerübersicht'; pageContent = renderSpielerUebersicht(callbacks); break;
        case 'spielerDetail': pageTitle = 'Spieler Detail'; pageContent = renderSpielerDetail(callbacks); break;
        case 'spielerForm': pageTitle = 'Spieler bearbeiten'; pageContent = renderSpielerForm(callbacks); break;
        case 'trainingUebersicht': pageTitle = 'Übersicht Trainingseinheiten'; pageContent = renderTrainingUebersicht(callbacks); break;
        case 'trainingDetail': pageTitle = 'Training Details'; pageContent = renderTrainingDetail(callbacks); break;
        case 'matchtagUebersicht': pageTitle = 'Übersicht Matches'; pageContent = renderMatchtagUebersicht(callbacks); break;
        case 'matchtagDetail': pageTitle = 'Matchtag Details'; pageContent = renderMatchtagDetail(callbacks); break;
        case 'einstellungen': pageTitle = 'Einstellungen'; pageContent = renderEinstellungen(callbacks); break;
        case 'spielfuehrerWahl': pageTitle = 'Spielführerwahl'; pageContent = renderSpielfuehrerWahl(callbacks); break;
        case 'wahlergebnis': pageTitle = 'Wahlergebnis'; pageContent = renderWahlergebnis(callbacks); break;
        case 'trikotsWaschen': pageTitle = 'Trikots waschen'; pageContent = renderTrikotsWaschen(callbacks); break;
        default: pageTitle = 'Fehler'; pageContent = `<p>Seite nicht gefunden.</p>`;
    }

    if (state.currentPage === 'login') {
        appContainer.innerHTML = pageContent;
    } else {
        appContainer.innerHTML = `${renderHeader(pageTitle)}${renderNavigationBar()}<main class="p-4 space-y-4 pt-20">${pageContent}</main>`;
    }
    
    callbacks.addEventListeners();
};