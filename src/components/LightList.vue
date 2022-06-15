<template>
  <v-container fluid><h3>list</h3></v-container>
</template>

<script>
import apiService from '../services/apiService';

export default {
  methods: {
    async getLights() {
      let list = await apiService.getLights();
      console.log('list', list);
    },
  },
  created() {
    this.getLights();
  },
};
</script>

<style>
</style>