<template>
  <v-container fluid>
    <v-main fluid :class="$vuetify.breakpoint.mobile ? 'pa-1' : 'pl-2 pt-4'">
      <router-view />
    </v-main>
  </v-container>
</template>

<script>
export default {};
</script>

<style>
</style>