<template>
  <v-container fluid>
    <h1>test</h1>
    <v-text-field v-model="r" label="R" />
    <v-text-field v-model="g" label="G" />
    <v-text-field v-model="b" label="B" />
    <v-text-field v-model="modelId" label="Model Id" />
    <v-btn @click="convertRgbToXyBri()">click me</v-btn>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  components: {},
  name: 'App',

  // x: 0.1560940031374074
  // y: 0.018458402891242676

  data: () => ({
    r: 0,
    g: 0,
    b: 104,
    modelId: 'LCT007',
  }),
  computed: {
    ...mapGetters([]),
  },
  watch: {},
  methods: {
    convertRgbToXyBri() {
      let test = this.$util.RgbToXy(this.r, this.g, this.b, this.modelId);
      console.log('test', test);
    },
  },
  mounted() {},
  created() {},
};
</script>

<style>
</style>