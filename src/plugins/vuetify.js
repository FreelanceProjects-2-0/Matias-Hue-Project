import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    dark: false,
    themes: {
      light: {
        primary: '#000',
        secondary: '#fff',
        background: '#ddd',
        navbar: '#bbb',
        activeButton: '#217AF3',
        button: '#606060',
      },
      dark: {
        primary: '#fff',
        secondary: '#000',
        background: '#333',
        navbar: '#141414',
        activeButton: '#217AF3',
        button: '#bbb',
        anchor: '#5FAAFF',
        drawerBackground: '#1E1E1E',
      },
    },
  },
});
