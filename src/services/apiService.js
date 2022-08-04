import axios from 'axios';
import store from '@/store/index';
import router from '@/router';

const apiService = {
  api: process.env.VUE_APP_API2_URL,
  userId: process.env.VUE_APP_API_USERID,

  async getOptions(inOptions) {
    if (!inOptions?.noAuth) {
      return {
        ...inOptions,
        headers: {
          'hue-application-key': this.userId,
          Authorization: `${this.userId}`,
          'Content-Type': `application/json`,
        },
      };
    } else {
      return inOptions;
    }
  },
  handleResponseError(err) {
    console.log('err', err);
    if (err?.response?.status === 401) {
      // not authenticated, consider user logged out
      store.dispatch('LOGOUT');
      router.push('/');
    } else {
      let message;
      // let details;
      if (err.response?.data.type) {
        if (err.response.data.type === 'https://tools.ietf.org/html/rfc7231#section-6.5.1') {
          // details = '';
          // for (let x in err.response.data.errors) {
          //   details += `${x}: ${err.response.data.errors[x]}\r\n`;
          // }
        }
        message = err.response.data.title;
      } else {
        message = err.message;
        // details = err.response?.data;
      }
      store.commit('alert', {
        show: true,
        title: 'API error',
        color: '#AD2433',
        textColor: 'white',
        message,
        // details,
      });
    }
  },
  async handleResponse(task) {
    try {
      const response = await task;

      if (response.headers['x-pagination']) {
        return {
          paging: JSON.parse(response.headers['x-pagination']),
          data: response.data,
        };
      }

      return response.data;
    } catch (err) {
      this.handleResponseError(err);
      throw err;
    }
  },

  async post(endpoint, payload, options) {
    return this.handleResponse(axios.post(`${this.api}/${endpoint}`, payload, await this.getOptions(options)));
  },
  postJsonString(endpoint, payload, options) {
    return this.post(endpoint, JSON.stringify(payload), {
      headers: {
        'Content-Type': 'application/json',
      },
      ...options,
    });
  },
  async get(endpoint, payload) {
    return this.handleResponse(axios.get(`${this.api}/${endpoint}`, await this.getOptions(payload)));
  },
  async put(endpoint, payload) {
    return this.handleResponse(axios.put(`${this.api}/${endpoint}`, payload, await this.getOptions()));
  },
  async delete(endpoint, payload) {
    return this.handleResponse(axios.delete(`${this.api}/${endpoint}`, await this.getOptions(payload)));
  },

  // Endpoints

  test() {
    return this.get(`resource/light`);
  },

  // #region Getters

  getLight(light_id) {
    return this.get(`lights/${light_id}`);
  },

  getLights() {
    return this.get('lights');
  },

  getGroups() {
    return this.get('groups');
  },

  // #endregion Getters

  // #region Setters

  // https://192.168.0.117/api/spGqyGwqxoNNX72rAjqUxtR6wLXwk1AtJW7kDqPy/lights/2/state
  turnLightOn(light_id) {
    return this.put(`lights/${light_id}/state`, { on: true });
  },

  turnLightOff(light_id) {
    return this.put(`lights/${light_id}/state`, { on: false });
  },

  // #endregion Setters
};

export default apiService;
