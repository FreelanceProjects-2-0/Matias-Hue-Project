<template>
  <v-container fluid><h1>test</h1></v-container>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  components: {},
  name: 'App',

  data: () => ({}),
  computed: {
    ...mapGetters([]),
  },
  watch: {},
  methods: {},
  mounted() {
    this.showLoginDialog(true);
  },
  created() {},
};
</script>

<style>
</style>