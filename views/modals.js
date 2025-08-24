import { state } from './state.js';
import { formatDateWithWeekday, berechneAlter, parseDateString, getAktuellerStatus, getStatusIndicator, formatDate } from './utils.js';

const modalContainer = document.getElementById('modal-container');

const placeholderBg = () => '475569';
const placeholderText = () => 'E2E8F0';

/**
 * Zeigt ein generisches Modal mit Titel, Nachricht und anpassbaren Buttons an.
 */
export const showModal = (title, message, buttons = [{text: 'Schließen', class: 'bg-blue-600'}]) => {
    state.isModalOpen = true; 
    modalContainer.innerHTML = ''; 
    const modal = document.createElement('div');
    modal.className = 'modal-backdrop';
    
    const closeModalCallback = () => {
        modal.classList.remove('visible');
        setTimeout(() => {
            if (modalContainer.contains(modal)) {
                modalContainer.removeChild(modal);
            }
            state.isModalOpen = false;
        }, 300);
    };

    let buttonsHtml = buttons.map(btn => 
        `<button class="flex-1 py-2 ${btn.class} text-white rounded-lg btn">${btn.text}</button>`
    ).join('');

    modal.innerHTML = `
        <div class="modal-content text-center">
            <h3 class="text-lg font-bold mb-4">${title}</h3>
            <div class="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">${message}</div>
            <div class="flex space-x-2 mt-6">
                ${buttonsHtml}
            </div>
        </div>
    `;

    if (buttons.length > 0) {
        modal.querySelectorAll('button').forEach((button, index) => {
            button.onclick = () => {
                if (buttons[index].onClick) {
                    buttons[index].onClick();
                }
                closeModalCallback();
            };
        });
    }
    
    modalContainer.appendChild(modal);
    setTimeout(() => modal.classList.add('visible'), 10);
};

/**
 * Schließt das aktuell geöffnete Modal.
 */
export const closeModal = () => {
    const modalBackdrop = modalContainer.querySelector('.modal-backdrop');
    if (modalBackdrop) {
        modalBackdrop.classList.remove('visible');
        setTimeout(() => {
            if (modalContainer.contains(modalBackdrop)) {
                modalContainer.removeChild(modalBackdrop);
            }
            state.isModalOpen = false;
        }, 300);
    }
};

/**
 * Zeigt ein Modal zur Auswahl eines Datums für ein neues Event.
 */
export const showAddEventModal = (type, callbacks) => {
    state.isModalOpen = true; 
    modalContainer.innerHTML = ''; 
    const modal = document.createElement('div');
    modal.className = 'modal-backdrop';

    const title = type === 'training' ? 'Neues Training Hinzufügen' : 'Neuen Matchtag Hinzufügen';
    const page = type === 'training' ? 'trainingDetail' : 'matchtagDetail';
    const today = formatDate(new Date());

    modal.innerHTML = `
        <div class="modal-content text-center">
            <h3 class="text-lg font-bold mb-4">${title}</h3>
            <p class="mb-2 text-left">Bitte wählen Sie ein Datum aus:</p>
            <input type="date" id="newEventDateInput" class="w-full p-2 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600" value="${today}">
            <div id="modalError" class="text-red-500 text-sm mt-2 h-4"></div>
            <div class="flex space-x-2 mt-4">
                <button id="modalCancelBtn" class="flex-1 py-2 bg-gray-500 text-white rounded-lg btn">Abbrechen</button>
                <button id="modalConfirmBtn" class="flex-1 py-2 bg-green-600 text-white rounded-lg btn">Weiter</button>
            </div>
        </div>
    `;
    modalContainer.appendChild(modal);
    setTimeout(() => modal.classList.add('visible'), 10);

    document.getElementById('modalCancelBtn').onclick = () => closeModal();
    document.getElementById('modalConfirmBtn').onclick = () => {
        const dateInput = document.getElementById('newEventDateInput');
        const errorDiv = document.getElementById('modalError');
        if (dateInput.value) {
            errorDiv.textContent = '';
            try {
                callbacks.navigateTo(page, dateInput.value);
                closeModal();
            } catch (error) {
                errorDiv.textContent = `Ein Fehler ist aufgetreten: ${error.message}`;
            }
        } else {
            errorDiv.textContent = 'Bitte ein gültiges Datum auswählen.';
        }
    };
};

/**
 * Zeigt ein Modal mit Optionen zum Löschen von Daten.
 */
export const showDeleteOptionsModal = (callbacks) => {
    state.isModalOpen = true;
    modalContainer.innerHTML = '';
    const modal = document.createElement('div');
    modal.className = 'modal-backdrop visible';

    modal.innerHTML = `
        <div class="modal-content text-center">
            <h3 class="text-lg font-bold mb-4">Welche Daten möchten Sie löschen?</h3>
            <div class="space-y-3">
                <button onclick="window.app.confirmDeletion('all')" class="w-full py-3 font-medium text-white uppercase bg-red-600 rounded-lg shadow-lg hover:bg-red-700 btn">Alle App-Daten</button>
                <button onclick="window.app.confirmDeletion('spieler')" class="w-full py-3 font-medium text-white uppercase bg-yellow-600 rounded-lg shadow-lg hover:bg-yellow-700 btn">Nur Spielerdaten</button>
                <button onclick="window.app.confirmDeletion('training')" class="w-full py-3 font-medium text-white uppercase bg-yellow-600 rounded-lg shadow-lg hover:bg-yellow-700 btn">Nur Trainingsdaten</button>
                <button onclick="window.app.confirmDeletion('matchtage')" class="w-full py-3 font-medium text-white uppercase bg-yellow-600 rounded-lg shadow-lg hover:bg-yellow-700 btn">Nur Matchdaten</button>
                <button onclick="window.app.confirmDeletion('mannschaft')" class="w-full py-3 font-medium text-white uppercase bg-yellow-600 rounded-lg shadow-lg hover:bg-yellow-700 btn">Nur Mannschaftsinfo</button>
            </div>
            <button onclick="window.app.closeModal()" class="w-full py-2 bg-gray-500 text-white rounded-lg btn mt-6">Abbrechen</button>
        </div>
    `;
    modalContainer.appendChild(modal);
    setTimeout(() => modal.classList.add('visible'), 10);
};

/**
 * Zeigt ein Modal mit Optionen zum Exportieren von Daten.
 */
export const showExportOptionsModal = (callbacks) => {
    state.isModalOpen = true;
    modalContainer.innerHTML = '';
    const modal = document.createElement('div');
    modal.className = 'modal-backdrop visible';

    modal.innerHTML = `
        <div class="modal-content text-center">
            <h3 class="text-lg font-bold mb-4">Welche Daten möchten Sie exportieren?</h3>
            <div class="space-y-3">
                <button onclick="window.app.exportData('all')" class="w-full py-3 font-medium text-white uppercase bg-green-600 rounded-lg shadow-lg hover:bg-green-700 btn">Alle Daten</button>
                <button onclick="window.app.exportData('spieler')" class="w-full py-3 font-medium text-white uppercase bg-green-600 rounded-lg shadow-lg hover:bg-green-700 btn">Nur Spielerdaten</button>
                <button onclick="window.app.exportData('training')" class="w-full py-3 font-medium text-white uppercase bg-green-600 rounded-lg shadow-lg hover:bg-green-700 btn">Nur Trainingsdaten</button>
                <button onclick="window.app.exportData('matchtage')" class="w-full py-3 font-medium text-white uppercase bg-green-600 rounded-lg shadow-lg hover:bg-green-700 btn">Nur Matchdaten</button>
                <button onclick="window.app.closeModal()" class="w-full py-2 bg-gray-500 text-white rounded-lg btn mt-6">Abbrechen</button>
            </div>
        </div>
    `;
    modalContainer.appendChild(modal);
    setTimeout(() => modal.classList.add('visible'), 10);
};

/**
 * Zeigt eine Bestätigung zum Löschen an.
 */
export const confirmDeletion = (type, callbacks) => {
    let title = "Bestätigung";
    let message = "";
    let action = null;

    switch(type) {
        case 'all':
            title = "Alle Daten löschen?";
            message = "Möchten Sie wirklich ALLE Daten (Spieler, Trainings, Matchtage, Team-Info) unwiderruflich löschen? Dies kann nicht rückgängig gemacht werden!";
            action = async () => {
                showModal("Löschen...", '<div class="animate-pulse">Alle Daten werden gelöscht...</div>', []);
                try {
                    await callbacks.deleteAllData();
                    showModal("Gelöscht", "Alle Daten wurden gelöscht.", [{text: 'OK', class: 'bg-blue-500'}]);
                } catch (error) {
                    showModal("Fehler", `Fehler beim Löschen aller Daten: ${error.message || 'Unbekannter Fehler'}.`, [{text: 'OK', class: 'bg-red-500'}]);
                }
            };
            break;
        case 'spieler':
            title = "Spielerdaten löschen?";
            message = "Möchten Sie wirklich alle Spielerdaten löschen?";
            action = () => callbacks.deleteCollectionData(window.spielerCollection, 'Spielerdaten');
            break;
        case 'training':
            title = "Trainingsdaten löschen?";
            message = "Möchten Sie wirklich alle Trainingsdaten löschen?";
            action = () => callbacks.deleteCollectionData(window.trainingCollection, 'Trainingsdaten');
            break;
        case 'matchtage':
            title = "Matchdaten löschen?";
            message = "Möchten Sie wirklich alle Matchdaten löschen?";
            action = () => callbacks.deleteCollectionData(window.matchtageCollection, 'Matchdaten');
            break;
        case 'mannschaft':
            title = "Mannschaftsinfo löschen?";
            message = "Möchten Sie wirklich die Mannschaftsinfo löschen?";
            action = () => callbacks.deleteMannschaftInfo();
            break;
    }

    if (action) {
        showModal(
            title,
            message,
            [
                { text: 'Abbrechen', class: 'bg-gray-500', onClick: () => closeModal() },
                { text: 'Ja, löschen', class: 'bg-red-600', onClick: action }
            ]
        );
    }
};

/**
 * Zeigt das Formations-Modal an.
 */
export const showFormationModal = (matchtagId, callbacks) => {
    state.isModalOpen = true; 
    const matchtag = state.matchtage.find(s => s.id === matchtagId) || { aufstellung: {} };
    state.formationPlayers = JSON.parse(JSON.stringify(matchtag.aufstellung || {}));

    modalContainer.innerHTML = `
        <div id="formation-modal-backdrop" class="modal-backdrop visible">
            <div class="modal-content-formation">
                <div class="flex flex-col md:flex-row gap-4 flex-grow min-h-0">
                    <div class="flex flex-col flex-grow w-full md:w-2/3">
                        <h3 class="text-lg font-bold mb-2 text-center">Formation für ${formatDateWithWeekday(matchtagId)}</h3>
                        <div id="footballPitch" class="football-pitch flex-grow relative border-2 border-white rounded-lg overflow-hidden">
                            <div class="pitch-line center-line"></div>
                            <div class="pitch-line center-circle"></div>
                            <div class="penalty-box top"></div>
                            <div class="penalty-box bottom"></div>
                            <div class="pitch-line top-arc"></div> 
                            <div class="pitch-line bottom-arc"></div> 
                        </div>
                    </div>
                    <div id="formationPlayerListContainer" class="player-list-container w-full md:w-1/3 bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg overflow-y-auto">
                        <div class="mb-4">
                            <label for="formation-select" class="block font-bold mb-2">Formation wählen:</label>
                            <select id="formation-select" class="w-full p-2 rounded-lg bg-white dark:bg-gray-800 dark:text-gray-200">
                                <option value="">Manuell</option>
                                <option value="4-4-2">4-4-2</option>
                                <option value="4-3-3">4-3-3</option>
                                <option value="3-5-2">3-5-2</option>
                                <option value="4-2-3-1">4-2-3-1</option>
                            </select>
                        </div>
                        <h4 class="font-bold mb-2">Verfügbare Spieler</h4>
                        <div id="formation-player-list" class="space-y-2">
                        </div>
                    </div>
                </div>
                <div class="flex space-x-2 mt-4 flex-shrink-0">
                    <button id="saveFormationBtn" class="flex-1 py-2 bg-green-600 text-white rounded-lg btn">Formation speichern</button>
                    <button id="closeFormationModalBtn" class="flex-1 py-2 bg-gray-500 text-white rounded-lg btn">Schließen</button>
                </div>
            </div>
        </div>
    `;

    const footballPitch = document.getElementById('footballPitch');
    const formationPlayerList = document.getElementById('formation-player-list');
    const formationSelect = document.getElementById('formation-select');
    let activePlayerElement = null; 
    let activePlayerId = null; 
    let initialX = 0;
    let initialY = 0;
    
    const renderPlayers = () => {
        footballPitch.querySelectorAll('.player-marker').forEach(el => el.remove());
        formationPlayerList.innerHTML = '';

        state.spieler.forEach(player => {
            const formationData = state.formationPlayers[player.id];
            const isAvailable = getAktuellerStatus(player) === 'Aktiv';
            const isOnPitch = formationData && formationData.posX !== undefined && formationData.posX !== null && formationData.posY !== undefined && formationData.posY !== null;

            if (isOnPitch) {
                const marker = document.createElement('div');
                marker.className = 'player-marker';
                marker.dataset.playerId = player.id;
                marker.style.left = `${formationData.posX * 100}%`;
                marker.style.top = `${formationData.posY * 100}%`;
                marker.innerHTML = `<span class="player-number">${player.nummer || ''}</span><span class="player-name">${player.name}</span>`;
                footballPitch.appendChild(marker);
                marker.addEventListener('mousedown', startDrag);
                marker.addEventListener('touchstart', startDrag, { passive: false });
            } else if (isAvailable) {
                const playerDiv = document.createElement('div');
                playerDiv.className = 'flex items-center space-x-2 p-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm cursor-grab';
                playerDiv.dataset.playerId = player.id;
                playerDiv.innerHTML = `
                    ${player.fotoUrl ? `<img src="${player.fotoUrl}" class="w-8 h-8 rounded-full object-cover" onerror="this.src='https://placehold.co/32x32/${placeholderBg()}/${placeholderText()}?text=${player.name.charAt(0)}';">` : `<div class="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-lg">${player.position === 'Torwart' ? '' : ''}</div>`}
                    <span class="font-semibold">${player.name}</span>
                    <span class="text-gray-500 dark:text-gray-400 text-sm">#${player.nummer || '?'}</span>
                `;
                formationPlayerList.appendChild(playerDiv);
                playerDiv.addEventListener('mousedown', startDrag);
                playerDiv.addEventListener('touchstart', startDrag, { passive: false });
            }
        });
    };

    const startDrag = (e) => {
        e.preventDefault();
        const targetElement = e.target.closest('[data-player-id]');
        if (!targetElement) return;
        activePlayerId = targetElement.dataset.playerId;
        if (targetElement.parentElement.id === 'formation-player-list') {
            activePlayerElement = document.createElement('div');
            activePlayerElement.className = 'player-marker placeholder'; 
            activePlayerElement.dataset.playerId = activePlayerId;
            const player = state.spieler.find(p => p.id === activePlayerId);
            if(player) {
               activePlayerElement.innerHTML = `<span class="player-number">${player.nummer || ''}</span><span class="player-name">${player.name}</span>`;
            }
            document.body.appendChild(activePlayerElement);
        } else {
            activePlayerElement = targetElement;
        }
        activePlayerElement.style.position = 'absolute';
        activePlayerElement.style.zIndex = 1000;
        activePlayerElement.style.cursor = 'grabbing';
        const rect = activePlayerElement.getBoundingClientRect();
        if (e.type === "touchstart") {
            initialX = e.touches[0].clientX - rect.left;
            initialY = e.touches[0].clientY - rect.top;
        } else {
            initialX = e.clientX - rect.left;
            initialY = e.clientY - rect.top;
        }
        document.addEventListener('mousemove', doDrag);
        document.addEventListener('mouseup', stopDrag);
        document.addEventListener('touchmove', doDrag, { passive: false });
        document.addEventListener('touchend', stopDrag);
    };

    const doDrag = (e) => {
        if (!activePlayerElement) return;
        e.preventDefault();
        let clientX, clientY;
        if (e.type === "touchmove") {
            clientX = e.touches[0].clientX;
            clientY = e.touches[0].clientY;
        } else {
            clientX = e.clientX;
            clientY = e.clientY;
        }
        activePlayerElement.style.left = (clientX - initialX) + 'px';
        activePlayerElement.style.top = (clientY - initialY) + 'px';
    };

    const stopDrag = (e) => {
        if (!activePlayerElement) return;
        document.removeEventListener('mousemove', doDrag);
        document.removeEventListener('mouseup', stopDrag);
        document.removeEventListener('touchmove', doDrag);
        document.removeEventListener('touchend', stopDrag);
        const pitchRect = footballPitch.getBoundingClientRect();
        const playerRect = activePlayerElement.getBoundingClientRect();
        if (playerRect.left + playerRect.width / 2 >= pitchRect.left &&
            playerRect.right - playerRect.width / 2 <= pitchRect.right &&
            playerRect.top + playerRect.height / 2 >= pitchRect.top &&
            playerRect.bottom - playerRect.height / 2 <= pitchRect.bottom) {
            const posX = (playerRect.left + playerRect.width / 2 - pitchRect.left) / pitchRect.width;
            const posY = (playerRect.top + playerRect.height / 2 - pitchRect.top) / pitchRect.height;
            state.formationPlayers[activePlayerId] = { posX, posY };
        } else {
            delete state.formationPlayers[activePlayerId];
        }
        if (activePlayerElement.classList.contains('placeholder') || !state.formationPlayers[activePlayerId]) {
            activePlayerElement.remove();
        } else {
            activePlayerElement.style.position = '';
            activePlayerElement.style.zIndex = '';
            activePlayerElement.style.cursor = '';
        }
        activePlayerElement = null;
        activePlayerId = null;
        renderPlayers();
    };
    
    const applyFormation = (formation) => {
        const positions = {
            '4-4-2': { Abwehr: 4, Mittelfeld: 4, Sturm: 2 },
            '4-3-3': { Abwehr: 4, Mittelfeld: 3, Sturm: 3 },
            '3-5-2': { Abwehr: 3, Mittelfeld: 5, Sturm: 2 },
            '4-2-3-1': { Abwehr: 4, Mittelfeld: 5, Sturm: 1 }
        };
        const layout = {
            Torwart: [{ x: 0.5, y: 0.9 }],
            Abwehr: [{ x: 0.2, y: 0.7 }, { x: 0.4, y: 0.75 }, { x: 0.6, y: 0.75 }, { x: 0.8, y: 0.7 }],
            Mittelfeld: [{ x: 0.2, y: 0.5 }, { x: 0.4, y: 0.45 }, { x: 0.6, y: 0.45 }, { x: 0.8, y: 0.5 }, { x: 0.5, y: 0.35 }],
            Sturm: [{ x: 0.35, y: 0.2 }, { x: 0.65, y: 0.2 }, { x: 0.5, y: 0.15 }]
        };

        const structure = positions[formation];
        if (!structure) return;

        state.formationPlayers = {};
        const availablePlayers = state.spieler.filter(p => getAktuellerStatus(p) === 'Aktiv');
        
        const placePlayers = (positionType, count) => {
            const players = availablePlayers.filter(p => p.position === positionType && !state.formationPlayers[p.id]).slice(0, count);
            players.forEach((player, index) => {
                const pos = layout[positionType][index] || { x: Math.random() * 0.8 + 0.1, y: Math.random() * 0.8 + 0.1 };
                state.formationPlayers[player.id] = { posX: pos.x, posY: pos.y };
            });
        };
        
        placePlayers('Torwart', 1);
        placePlayers('Abwehr', structure.Abwehr);
        placePlayers('Mittelfeld', structure.Mittelfeld);
        placePlayers('Sturm', structure.Sturm);

        renderPlayers();
    };

    formationSelect.addEventListener('change', (e) => {
        if (e.target.value) {
            applyFormation(e.target.value);
        }
    });

    renderPlayers();

    document.getElementById('saveFormationBtn').onclick = async () => {
        showModal("Speichern...", '<div class="animate-pulse">Formation wird gespeichert...</div>', []);
        try {
            await callbacks.saveFormation(matchtagId, state.formationPlayers);
            showModal("Erfolg", "Formation erfolgreich gespeichert!", [{text: 'OK', class: 'bg-green-500'}]);
            closeModal();
        } catch (error) {
            showModal("Fehler", `Fehler beim Speichern der Formation: ${error.message || 'Unbekannter Fehler'}.`, [{text: 'OK', class: 'bg-red-500'}]);
        }
    };

    document.getElementById('closeFormationModalBtn').onclick = () => closeModal();
};

/**
 * Zeigt ein Modal mit den Details zu einem bestimmten Tag an.
 */
export const showEventDetailModal = (dateString, callbacks) => {
    state.isModalOpen = true; 
    modalContainer.innerHTML = '';
    const modal = document.createElement('div');
    modal.className = 'modal-backdrop';

    const dateObj = parseDateString(dateString);
    const trainingToday = state.trainingseinheiten.find(t => t.id === dateString);
    const matchtagToday = state.matchtage.find(s => s.id === dateString);
    const geburtstageToday = state.spieler.filter(p => p.geburtstag && p.geburtstag.slice(5) === dateString.slice(5));
    const feiertagToday = state.feiertage.find(f => f.date === dateString);

    const trainingButtonHtml = trainingToday
        ? `<button onclick="window.app.navigateTo('trainingDetail', '${dateString}'); window.app.closeModal();" class="flex-1 py-2 bg-blue-500 text-white rounded-lg btn">Training ansehen</button>`
        : `<button onclick="window.app.navigateTo('trainingDetail', '${dateString}'); window.app.closeModal();" class="flex-1 py-2 bg-blue-600 text-white rounded-lg btn">Training hinzufügen</button>`;

    const matchtagButtonHtml = matchtagToday
        ? `<button onclick="window.app.navigateTo('matchtagDetail', '${dateString}'); window.app.closeModal();" class="flex-1 py-2 bg-yellow-500 text-white rounded-lg btn">Match ansehen</button>`
        : `<button onclick="window.app.navigateTo('matchtagDetail', '${dateString}'); window.app.closeModal();" class="flex-1 py-2 bg-yellow-600 text-white rounded-lg btn">Match hinzufügen</button>`;

    modal.innerHTML = `
        <div class="modal-content text-center">
            <h3 class="text-xl font-bold mb-4">Termine am ${formatDateWithWeekday(dateString)}</h3>
            <div class="space-y-4 text-left">
                ${feiertagToday ? `
                <div class="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                    <h4 class="font-bold text-lg mb-1">Feiertag</h4>
                    <p>${feiertagToday.name}</p>
                </div>` : ''}

                ${geburtstageToday.length > 0 ? `
                <div class="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                    <h4 class="font-bold text-lg mb-1 flex items-center"><i class="fas fa-birthday-cake text-pink-500 mr-2"></i> Geburtstage</h4>
                    ${geburtstageToday.map(p => `<p>${p.name} (${berechneAlter(p.geburtstag)})</p>`).join('')}
                </div>` : ''}

                ${trainingToday ? `
                <div class="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                    <h4 class="font-bold text-lg mb-1 flex items-center"><i class="fas fa-running text-blue-500 mr-2"></i> Training</h4>
                    <p>Ein Training ist für heute angesetzt${trainingToday.time ? ` um ${trainingToday.time} Uhr` : ''}.</p>
                    ${trainingToday.cancelled ? '<p class="text-red-500 font-bold mt-1">Dieses Training wurde abgesagt.</p>' : ''}
                </div>` : ''}

                ${matchtagToday ? `
                <div class="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                    <h4 class="font-bold text-lg mb-1 flex items-center"><i class="fas fa-futbol text-yellow-500 mr-2"></i> Matchtag</h4>
                    <p>Gegner: ${matchtagToday.gegner || 'Unbekannt'}${matchtagToday.time ? ` um ${matchtagToday.time} Uhr` : ''}.</p>
                    ${matchtagToday.cancelled ? '<p class="text-red-500 font-bold mt-1">Dieses Match wurde abgesagt.</p>' : ''}
                </div>` : ''}

                ${!trainingToday && !matchtagToday && geburtstageToday.length === 0 && !feiertagToday ? `
                <div class="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg text-center text-gray-500 dark:text-gray-400">
                    <p>Keine Termine für diesen Tag.</p>
                </div>` : ''}
            </div>

            <div class="flex space-x-2 mt-6">
                ${trainingButtonHtml}
                ${matchtagButtonHtml}
            </div>
            <button onclick="window.app.closeModal();" class="w-full py-2 bg-gray-500 text-white rounded-lg btn mt-4">Schließen</button>
        </div>
    `;
    modalContainer.appendChild(modal);
    setTimeout(() => modal.classList.add('visible'), 10);
};

