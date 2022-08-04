<template>
  <v-app>
    <nav-bar />
    <v-snackbar
      v-if="globalAlert"
      v-model="globalAlert.show"
      class="mt-4 pa-4 mb-6 mr-n4"
      transition="slide-y-reverse-transition"
      bottom
      right
      elevation="0"
      :color="globalAlert.color"
      :timeout="parseInt(globalAlert.timeout)"
    >
      <v-btn icon @click="globalAlert.show = false" title="Dismiss">
        <v-icon>mdi-close-circle-outline</v-icon>
      </v-btn>
      <div :class="globalAlert.textColor ? globalAlert.textColor + '--text' : 'black--text'">
        <div class="font-weight-bold">{{ globalAlert.title }}</div>
        <div class="py-2" v-html="globalAlert.message" />
        <div class="py-2" v-if="globalAlert.details">
          <div class="text-pre">{{ globalAlert.details }}</div>
        </div>
      </div>
    </v-snackbar>
    <v-main class="background">
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex';
import NavBar from './components/NavBar.vue';
export default {
  components: { NavBar },
  name: 'App',

  data: () => ({}),
  computed: {
    ...mapGetters(['globalAlert']),
  },
  watch: {},
  methods: {},
  mounted() {
    this.$vuetify.theme.dark = true;
  },
  created() {},
};
</script>