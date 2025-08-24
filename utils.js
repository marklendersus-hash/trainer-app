export const parseDateString = (dateString) => {
    if (!dateString || typeof dateString !== 'string') return null;
    const parts = dateString.split('-');
    if (parts.length !== 3) return null;
    return new Date(parts[0], parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
};

export const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = `${d.getMonth() + 1}`.padStart(2, '0');
    const day = `${d.getDate()}`.padStart(2, '0');
    return `${year}-${month}-${day}`;
};

export const formatDateWithWeekday = (dateString) => {
    const dateObj = parseDateString(dateString);
    if (!dateObj) return dateString;
    return dateObj.toLocaleDateString('de-DE', { weekday: 'short', year: 'numeric', month: 'numeric', day: 'numeric' });
};

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

export const getAktuellerStatus = (spieler) => {
    const heute = new Date();
    heute.setHours(0, 0, 0, 0); 

    if (spieler.verletztBis) {
        const verletztBisDate = parseDateString(spieler.verletztBis);
        if (verletztBisDate && heute <= verletztBisDate) {
            return "Verletzt";
        }
    }

    if (spieler.urlaubVon && spieler.urlaubBis) {
        const urlaubVonDate = parseDateString(spieler.urlaubVon);
        const urlaubBisDate = parseDateString(spieler.urlaubBis);
        if (urlaubVonDate && urlaubBisDate && heute >= urlaubVonDate && heute <= urlaubBisDate) {
            return "Urlaub";
        }
    }
    
    return spieler.status || 'Aktiv';
};

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

export const getTrainingsAnzahlGesamt = (spielerId, state) => {
    const todayString = formatDate(new Date());
    return state.trainingseinheiten.filter(t => !t.cancelled && t.id <= todayString && t.teilnehmer?.[spielerId] === 'Anwesend').length;
};

export const getMatchAnzahlGesamt = (spielerId, state) => {
    const todayString = formatDate(new Date());
    return state.matchtage.filter(s => !s.cancelled && s.id <= todayString && (s.aufstellung?.[spielerId]?.position === 'Startelf' || s.aufstellung?.[spielerId]?.position === 'Ersatzbank')).length;
};

export const getSpielminutenGesamt = (spielerId, state) => {
    const todayString = formatDate(new Date());
    return state.matchtage
        .filter(matchtag => !matchtag.cancelled && matchtag.id <= todayString)
        .reduce((total, matchtag) => {
            const minuten = matchtag.aufstellung?.[spielerId]?.spielminuten;
            return total + (minuten ? parseInt(minuten, 10) : 0);
        }, 0);
};

export const getToreGesamt = (spielerId, state) => {
    const todayString = formatDate(new Date());
    return state.matchtage
        .filter(matchtag => !matchtag.cancelled && matchtag.id <= todayString)
        .reduce((total, matchtag) => {
            const tore = matchtag.aufstellung?.[spielerId]?.tore;
            return total + (tore ? parseInt(tore, 10) : 0);
        }, 0);
};

export const getVorlagenGesamt = (spielerId, state) => {
    const todayString = formatDate(new Date());
    return state.matchtage
        .filter(matchtag => !matchtag.cancelled && matchtag.id <= todayString)
        .reduce((total, matchtag) => {
            const vorlagen = matchtag.aufstellung?.[spielerId]?.vorlagen;
            return total + (vorlagen ? parseInt(vorlagen, 10) : 0);
        }, 0);
};

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
