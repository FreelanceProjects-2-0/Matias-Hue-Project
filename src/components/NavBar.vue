<template>
  <v-app-bar app dense>
    <v-tabs fixed-tabs center-active color="activeButton" background-color="navbar">
      <v-tab :to="{ name: 'Home' }" exact>Home</v-tab>
      <v-tab :to="{ name: 'Lights' }">Lys</v-tab>
      <v-tab :to="{ name: 'Rooms' }">Rum</v-tab>
    </v-tabs>
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

