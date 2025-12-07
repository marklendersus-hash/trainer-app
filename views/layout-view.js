import { state } from '../state.js';

export const getPageThemeColor = (page) => {
    const trainingPages = ['trainingUebersicht', 'trainingDetail'];
    const matchPages = ['matchtagUebersicht', 'matchtagDetail'];
    const spielerPages = ['spielerUebersicht', 'spielerDetail', 'spielerForm'];

    if (trainingPages.includes(page)) {
        return 'blue';
    }
    if (matchPages.includes(page)) {
        return 'yellow';
    }
    if (spielerPages.includes(page)) {
        return 'orange';
    }
    return 'green';
};

export const renderHeader = (title) => {
    const displayTitle = state.teamInfo.name || title;
    const displayTitle2 = state.teamInfo.name2 || '';
    const emblemHtml = state.teamInfo.emblemUrl
        ? `<img src="${state.teamInfo.emblemUrl}" class="w-8 h-8 rounded-full object-cover mr-3 flex-shrink-0" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
           <div class="w-12 h-12 flex-shrink-0 mr-3 hidden items-center justify-center"></div>`
        : `<div class="w-12 h-12 flex-shrink-0 mr-3 flex items-center justify-center"></div>`;
    const titleClass = (displayTitle.length > 15) ? 'text-base font-bold' : 'text-lg font-bold';
    const color = getPageThemeColor(state.currentPage);

    return `
    <header class="bg-gray-800 text-gray-200 p-3 flex items-center justify-between fixed top-0 left-0 right-0 z-50 border-b-2 border-${color}-500">
        <div class="w-12 h-12">
        ${state.isLoggedIn ? `<button onclick="window.app.navigateTo('einstellungen', null, true)" class="flex flex-col items-center justify-center text-gray-400 hover:text-${color}-400 w-12 h-12 rounded-full hover:bg-transparent transition-colors" title="Einstellungen"><i class="fas fa-cog text-xl"></i></button>` : ''}
        </div>
        <div class="flex items-center justify-center flex-grow">
            ${emblemHtml}
            <div>
                <h1 class="${titleClass} whitespace-nowrap">${displayTitle}</h1>
                ${displayTitle2 ? `<h2 class="text-sm text-gray-400 leading-tight whitespace-nowrap">${displayTitle2}</h2>` : ''}
            </div>
        </div>
        <div class="w-12 h-12">
        ${state.isLoggedIn ? `<button onclick="window.app.logout()" class="flex flex-col items-center justify-center text-gray-400 hover:text-${color}-400 w-12 h-12 rounded-full hover:bg-transparent transition-colors" title="Ausloggen"><i class="fas fa-sign-out-alt text-xl"></i></button>` : ''}
        </div>
    </header>`;
};

export const renderNavigationBar = () => {
    if (state.currentPage === 'login' || !state.isLoggedIn) return '';
    const showBack = state.navigationStack.length > 0 && state.currentPage !== 'home';
    const buttonSizeClass = 'w-16 h-16';
    const color = getPageThemeColor(state.currentPage);

    const navButton = (page, icon, title) => {
        const activePages = {
            'home': ['home', 'eventDetail'],
            'spielerUebersicht': ['spielerUebersicht', 'spielerDetail', 'spielerForm'],
            'trainingUebersicht': ['trainingUebersicht', 'trainingDetail'],
            'matchtagUebersicht': ['matchtagUebersicht', 'matchtagDetail'],
            'einstellungen': ['einstellungen']
        };
        const buttonColor = getPageThemeColor(page);
        const isActive = activePages[page]?.includes(state.currentPage);
        const activeClass = `text-${buttonColor}-400`;
        const hoverClass = `hover:text-${buttonColor}-400`;

        return `<div class="flex-1 flex justify-center items-center">
                    <button onclick="window.app.navigateTo('${page}', null, true)" class="flex flex-col items-center justify-center text-gray-400 ${hoverClass} ${buttonSizeClass} rounded-full hover:bg-transparent transition-colors ${isActive ? activeClass : ''}" title="${title}">
                        <i class="fas ${icon} text-xl"></i>
                        <span class="text-xs mt-1">${title}</span>
                    </button>
                </div>`;
    };

    let leftButtonHtml = showBack
        ? `<div class="flex-1 flex justify-center items-center"><button onclick="window.app.goBack()" class="flex flex-col items-center justify-center text-gray-400 hover:text-gray-400 w-16 h-16 rounded-full hover:bg-transparent transition-colors" title="Zurück"><i class="fas fa-arrow-left text-xl"></i><span class="text-xs mt-1">Zurück</span></button></div>`
        : navButton('home', 'fa-home', 'Home');

    return `
        <div class="fixed left-0 right-0 z-40 px-4" style="bottom: 20px; padding-bottom: env(safe-area-inset-bottom);">
            <div class="bg-gray-800 border-2 border-${color}-500 shadow-lg rounded-full px-2 py-2 w-full max-w-sm mx-auto">
                <div class="flex justify-around items-center">
                    ${leftButtonHtml}
                    ${navButton('trainingUebersicht', 'fa-running', 'Training')}
                    ${navButton('matchtagUebersicht', 'fa-futbol', 'Matches')}
                    ${navButton('spielerUebersicht', 'fa-users', 'Spieler')}
                </div>
            </div>
        </div>`;
};