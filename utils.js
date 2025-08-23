/**
 * Parses a 'YYYY-MM-DD' string into a local Date object, avoiding timezone issues.
 * @param {string} dateString - The date string to parse.
 * @returns {Date|null} - The parsed Date object or null if input is invalid.
 */
export const parseDateString = (dateString) => {
    if (!dateString || typeof dateString !== 'string') return null;
    const parts = dateString.split('-');
    if (parts.length !== 3) return null;
    // new Date(year, monthIndex, day)
    return new Date(parts[0], parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
};

/**
 * Formats a Date object into a 'YYYY-MM-DD' string.
 * @param {Date} date - The date to format.
 * @returns {string} - The formatted date string.
 */
export const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = `${d.getMonth() + 1}`.padStart(2, '0');
    const day = `${d.getDate()}`.padStart(2, '0');
    return `${year}-${month}-${day}`;
};

/**
 * Formats a date string to include the weekday.
 * @param {string} dateString - The date string to format.
 * @returns {string} - The formatted date string with weekday.
 */
export const formatDateWithWeekday = (dateString) => {
    const dateObj = parseDateString(dateString);
    if (!dateObj) return dateString;
    return dateObj.toLocaleDateString('de-DE', { weekday: 'short', year: 'numeric', month: 'numeric', day: 'numeric' });
};

/**
 * Calculates the age based on a birthdate string.
 * @param {string} geburtstag - The birthdate string in 'YYYY-MM-DD' format.
 * @returns {number|null} - The calculated age or null if input is invalid.
 */
export const berechneAlter = (geburtstag) => {
    if (!geburtstag) return null;
    const heute = new Date();
    const geburtsdatum = parseDateString(geburtstag);
    if (!geburtsdatum) return null;
    let alter = heute.getFullYear() - geburtsdatum.getFullYear();
    const m = heute.getMonth() - geburtsdatum.getMonth();
    if (m < 0 || (m === 0 && heute.getDate() < geburtsdatum.getDate())) {
        alter--;
    }
    return alter;
};

/**
 * Determines the current status of a player based on dates.
 * This function dynamically checks for injuries and vacations before falling back to the manually set status.
 * @param {object} spieler - The player object.
 * @returns {string} - The current status.
 */
export const getAktuellerStatus = (spieler) => {
    const heute = new Date();
    heute.setHours(0, 0, 0, 0); // Set time to midnight to compare dates accurately

    // *** PRIORITÄT 1: Überprüfe, ob der Spieler verletzt ist ***
    // Wenn ein 'verletztBis'-Datum existiert und das heutige Datum davor oder am selben Tag liegt.
    if (spieler.verletztBis) {
        const verletztBisDate = parseDateString(spieler.verletztBis);
        if (verletztBisDate && heute <= verletztBisDate) {
            return "Verletzt"; // Der Spieler ist aktuell verletzt.
        }
    }

    // *** PRIORITÄT 2: Überprüfe, ob der Spieler im Urlaub ist ***
    // Wenn ein 'urlaubVon' und 'urlaubBis' Datum existiert und heute in diesem Zeitraum liegt.
    if (spieler.urlaubVon && spieler.urlaubBis) {
        const urlaubVonDate = parseDateString(spieler.urlaubVon);
        const urlaubBisDate = parseDateString(spieler.urlaubBis);
        if (urlaubVonDate && urlaubBisDate && heute >= urlaubVonDate && heute <= urlaubBisDate) {
            return "Urlaub"; // Der Spieler ist aktuell im Urlaub.
        }
    }
    
    // *** FALLBACK: Manueller Status ***
    // Wenn keine der obigen Bedingungen zutrifft, wird der manuell gesetzte Status verwendet.
    // Wenn kein Status manuell gesetzt wurde, gilt der Spieler als 'Aktiv'.
    return spieler.status || 'Aktiv';
};


/**
 * Returns the HTML for a status indicator.
 * @param {string} status - The status of the player.
 * @returns {string} - HTML span with color class.
 */
export const getStatusIndicator = (status) => {
    const statusConfig = {
        'Aktiv': { color: 'bg-green-500' },
        'Verletzt': { color: 'bg-red-500' },
        'Gesperrt': { color: 'bg-yellow-500' },
        'Urlaub': { color: 'bg-blue-500' },
        'Krank': { color: 'bg-orange-500' },
        'Inaktiv': { color: 'bg-gray-400' },
    };
    const config = statusConfig[status] || statusConfig['Inaktiv'];
    return `<span class="inline-block w-3 h-3 ${config.color} rounded-full" title="${status}"></span>`;
};

/**
 * Calculates the total number of attended trainings for a player.
 * @param {string} spielerId - The player's ID.
 * @param {object} state - The global state object.
 * @returns {number} - The total number of attended trainings.
 */
export const getTrainingsAnzahlGesamt = (spielerId, state) => {
    const todayString = formatDate(new Date());
    return state.trainingseinheiten.filter(t => !t.cancelled && t.id <= todayString && t.teilnehmer?.[spielerId] === 'Anwesend').length;
};

/**
 * Calculates the total number of matches for a player.
 * @param {string} spielerId - The player's ID.
 * @param {object} state - The global state object.
 * @returns {number} - The total number of matches.
 */
export const getMatchAnzahlGesamt = (spielerId, state) => {
    const todayString = formatDate(new Date());
    return state.matchtage.filter(s => !s.cancelled && s.id <= todayString && (s.aufstellung?.[spielerId]?.position === 'Startelf' || s.aufstellung?.[spielerId]?.position === 'Ersatzbank')).length;
};

/**
 * Calculates the total playing minutes for a player.
 * @param {string} spielerId - The player's ID.
 * @param {object} state - The global state object.
 * @returns {number} - The total playing minutes.
 */
export const getSpielminutenGesamt = (spielerId, state) => {
    const todayString = formatDate(new Date());
    return state.matchtage
        .filter(matchtag => !matchtag.cancelled && matchtag.id <= todayString)
        .reduce((total, matchtag) => {
            const minuten = matchtag.aufstellung?.[spielerId]?.spielminuten;
            return total + (minuten ? parseInt(minuten, 10) : 0);
        }, 0);
};

/**
 * Calculates the total goals scored by a player.
 * @param {string} spielerId - The player's ID.
 * @param {object} state - The global state object.
 * @returns {number} - The total number of goals.
 */
export const getToreGesamt = (spielerId, state) => {
    const todayString = formatDate(new Date());
    return state.matchtage
        .filter(matchtag => !matchtag.cancelled && matchtag.id <= todayString)
        .reduce((total, matchtag) => {
            const tore = matchtag.aufstellung?.[spielerId]?.tore;
            return total + (tore ? parseInt(tore, 10) : 0);
        }, 0);
};

/**
 * Calculates the total assists made by a player.
 * @param {string} spielerId - The player's ID.
 * @param {object} state - The global state object.
 * @returns {number} - The total number of assists.
 */
export const getVorlagenGesamt = (spielerId, state) => {
    const todayString = formatDate(new Date());
    return state.matchtage
        .filter(matchtag => !matchtag.cancelled && matchtag.id <= todayString)
        .reduce((total, matchtag) => {
            const vorlagen = matchtag.aufstellung?.[spielerId]?.vorlagen;
            return total + (vorlagen ? parseInt(vorlagen, 10) : 0);
        }, 0);
};

/**
 * Fetches public holidays for a given year and updates the state.
 * @param {number} year - The year to fetch holidays for.
 * @param {object} state - The global state object.
 */
export const fetchHolidaysForYear = async (year, state) => {
    if (state.holidaysFetched[year]) {
        return;
    }
    try {
        const response = await fetch(`https://date.nager.at/api/v3/PublicHolidays/${year}/DE`);
        if (!response.ok) {
            console.error("Fehler beim Abrufen der Feiertage:", response.status, response.statusText);
            return;
        }
        const holidays = await response.json();
        const bwHolidays = holidays.filter(h => h.counties === null || h.counties.includes('DE-BW'));
        const formattedHolidays = bwHolidays.map(h => ({ date: h.date, name: h.localName }));
        state.feiertage = [...state.feiertage, ...formattedHolidays];
        state.holidaysFetched[year] = true;
    } catch (error) {
        console.error("Fehler bei der Feiertags-API:", error);
    }
};
