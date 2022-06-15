import Vue from 'vue';
import Vuex from 'vuex';
import auth from './modules/auth';
import ui from './modules/ui';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    globalAlert: null,
    currentOrgId: '',
  },
  getters: {
    globalAlert: (state) => state.globalAlert,
    currentOrgId: (state) => state.currentOrgId,
  },
  mutations: {
    alert(state, alert) {
      state.globalAlert = {
        show: true,
        timeout: 8000,
        ...alert,
      };
    },
    setOrgId: (state, orgId) => {
      state.currentOrgId = orgId;
    },
  },
  actions: {
    SET_ORGANIZATIONID({ commit }, orgId) {
      commit('setOrgId', orgId);
      localStorage.setItem('currentOrgId', orgId);
    },
  },
  modules: {
    auth,
    ui,
  },
});
