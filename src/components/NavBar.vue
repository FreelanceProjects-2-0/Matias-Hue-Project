<template>
  <v-app-bar class="navbar" app>
    <v-row no-gutters>
      <v-col cols="2" class="d-flex flex-row align-center">
        <v-toolbar-title class="mx-auto">Matias Hue</v-toolbar-title>
      </v-col>
      <v-col cols="9">
        <v-tabs fixed-tabs center-active color="activeButton" background-color="navbar">
          <v-tab :to="{ name: 'Home' }">Home</v-tab>
          <v-tab :to="{ name: 'About' }">About</v-tab>
        </v-tabs>
      </v-col>
    </v-row>
  </v-app-bar>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'NavBar',
  components: {},
  data: () => ({}),
  watch: {},
  computed: {
    ...mapGetters(['darkMode']),
  },
  methods: {},
  created() {},
};
</script>

