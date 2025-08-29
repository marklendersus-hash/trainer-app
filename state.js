export let state = {
    isLoggedIn: false,
    spieler: [],
    trainingseinheiten: [],
    matchtage: [],
    feiertage: [],
    holidaysFetched: {},
    teamInfo: { name: 'Mein Team', name2: '', emblemUrl: null, trainingSchedule: {} },
    currentPage: 'login',
    currentId: null,
    currentDate: new Date(),
    loading: true,
    filter: '',
    sortBy: 'name',
    sortAsc: true,
    statsFilter: 'matches',
    navigationStack: [],
    initialFormData: '',
    formationPlayers: {}, 
    showTrainingsOnHomeCalendar: true,
    showMatchesOnHomeCalendar: true,
    showGeburtstageOnHomeCalendar: true,
    isModalOpen: false, 
    trainingListView: 'all', 
    matchtagListView: 'all',
    spielerFilter: 'Alle',
    spielfuehrerWahl: { votes: {} },
    wahlergebnis: null
};

export let userId;

export const setupDbRefs = (db, appId, firestoreModule) => {
    const { collection, doc } = firestoreModule;
    window.spielerCollection = collection(db, `artifacts/${appId}/public/data/spieler`);
    window.trainingCollection = collection(db, `artifacts/${appId}/public/data/trainingseinheiten`);
    window.matchtageCollection = collection(db, `artifacts/${appId}/public/data/spieltage`);
    window.configDoc = doc(db, `artifacts/${appId}/public/data/config/team`);
}

export const setFilter = (value) => {
    state.filter = value;
};

export const setStatsFilter = (filter) => {
    state.statsFilter = filter;
};

export const setSort = (sortBy) => {
    if (state.sortBy === sortBy) {
        state.sortAsc = !state.sortAsc;
    } else {
        state.sortBy = sortBy;
        if (sortBy === 'matches' || sortBy === 'training') {
            state.sortAsc = false;
        } else {
            state.sortAsc = true;
        }
    }
};

export const setHomeCalendarFilter = (type, isChecked) => {
    if (type === 'trainings') {
        state.showTrainingsOnHomeCalendar = isChecked;
    } else if (type === 'matches') {
        state.showMatchesOnHomeCalendar = isChecked;
    } else if (type === 'geburtstage') {
        state.showGeburtstageOnHomeCalendar = isChecked;
    }
};

export const setTrainingListView = (view) => {
    state.trainingListView = view;
};

export const setMatchtagListView = (view) => {
    state.matchtagListView = view;
};

export const setSpielerFilter = (filter) => {
    state.spielerFilter = filter;
};


