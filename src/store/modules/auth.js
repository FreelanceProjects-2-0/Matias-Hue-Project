import apiService from '@/services/apiService';

export default {
  state: {
    user: null,
  },
  getters: {
    user: (state) => state.user,
    authToken: (state) => state.user?.token,
    isAuthenticated: (state) => !!state.user,
    isAdmin: (state) => state.user?.roles.includes('admin'),
    isStaff: (state) => state.user?.roles.includes('staff') || state.user?.roles.includes('admin'),
    hasRole: (state) => (role) => state.user?.roles.includes(role),
  },
  actions: {
    async AUTHENTICATE({ commit }, credentials) {
      const user = await apiService.login(credentials);

      commit('updateUser', user);
      localStorage.setItem('refreshToken', user.refreshToken);

      return user;
    },
    async AUTHENTICATE_REFRESH({ commit }) {
      const cachedToken = localStorage.getItem('refreshToken');

      if (cachedToken) {
        try {
          const user = await apiService.refreshAuth(cachedToken);

          commit('updateUser', user);
          localStorage.setItem('refreshToken', user.refreshToken);

          return true;
        } catch (err) {
          if (err?.response?.status === 401) {
            console.log('stored refresh token not accepted, clearing it');
            localStorage.removeItem('refreshToken');
          } else {
            console.log('unable to utilize stored refresh token');
          }
          return false;
        }
      }

      return false;
    },
    async ENSURE_AUTH({ getters, dispatch }) {
      if (!getters.isAuthenticated) {
        await dispatch('AUTHENTICATE_REFRESH');
      }
      return getters.isAuthenticated;
    },
    async RESET_PASSWORD(store, username) {
      return await apiService.resetPassword(username);
    },
    async LOGOUT({ commit }) {
      localStorage.removeItem('refreshToken');
      commit('updateUser', null);
    },
  },
  mutations: {
    updateUser: (state, user) => {
      state.user = user;
    },
    updateUserSetting: (state, { setting, value }) => {
      state.user.settings[setting] = value;
    },
  },
};
