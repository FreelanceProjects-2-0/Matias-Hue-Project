export default {
  state: {
    settings: {
      darkMode: true,
    },
  },
  getters: {
    darkMode: (state) => state.settings.darkMode,
  },
  actions: {
    SET_DARKMODE({ commit }, mode) {
      commit('setDarkMode', mode);
      commit('persistUiSettings');
    },
    LOAD_UI_SETTINGS({ commit }) {
      const settings = localStorage.getItem('uiSettings');
      if (settings) {
        commit('setUiSettings', JSON.parse(settings));
      }
    },
  },
  mutations: {
    setDarkMode: (state, mode) => {
      state.settings.darkMode = mode;
    },
    setUiSettings: (state, settings) => {
      state.settings = {
        ...state.settings,
        ...settings,
      };
    },
    persistUiSettings: (state) => {
      localStorage.setItem('uiSettings', JSON.stringify(state.settings));
    },
  },
};
