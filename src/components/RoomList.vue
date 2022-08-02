<template>
  <v-container fluid>
    <v-row no-gutters class="mb-4">
      <v-col cols="6">
        <h3>Rum i huset</h3>
      </v-col>
      <v-col cols="6" class="d-flex flex-row justify-end">
        <v-btn @click="getRooms">Opdater</v-btn>
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-container fluid class="navbar d-flex flex-row">
        <v-col cols="2">
          <v-select v-model="lightShown" class="ma-0 pa-0" :items="lightStates" hide-details label="Vælg hvilke lys der skal vises" />
        </v-col>
        <v-col offset="2" cols="4">
          <v-text-field hide-details v-model="search" label="Søg blandt enheder" class="ma-0 pa-0" />
        </v-col>
      </v-container>
    </v-row>
    <v-data-table :items="groups" :headers="groupListHeaders" :search="search">
      <template #[`item.checkBox`]="{ item }">
        <v-checkbox @click="toggleGroup(item)" />
      </template>
      <!-- <template #[`item.state.on`]="{ item }">
        {{ item.state.on ? 'Tændt' : 'Slukket' }}
      </template> -->
      <template #[`item.actions`]="{ item }">
        <div v-show="!hideDefaultActionButtons">
          <v-btn class="mx-1" min-width="85px" @click="toggleLight(item)"> {{ item.state.on ? 'Sluk' : 'Tænd' }}</v-btn>
          <v-btn class="mx-1" @click="showDetails(item)"> Details</v-btn>
        </div>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import apiService from '../services/apiService';

export default {
  data: () => ({
    fetching: false,
    search: '',

    groups: [],

    groupListHeaders: [
      {
        text: 'Navn',
        value: 'name',
      },
      {
        text: 'Type',
        value: 'class',
      },
      {
        text: 'Antal lys',
        value: 'lights.length',
      },
    ],

    lightShown: 0,

    lightStates: [
      {
        text: 'Alle',
        value: 0,
      },
      {
        text: 'Tændt',
        value: 1,
      },
      {
        text: 'Sluket',
        value: 2,
      },
    ],
  }),
  methods: {
    async getRooms() {
      this.fetching = true;
      let response = await apiService.getGroups();
      console.log('response', response);
      this.groups = Object.keys(response).map((key) => {
        let test = response[key];
        test.id = key;
        return response[key];
      });
      this.groups = this.groups.filter((x) => x.type === 'Room');
      console.log('grupper', this.groups);
      this.fetching = false;
    },
  },
  created() {
    this.getRooms();
  },
};
</script>

<style>
</style>