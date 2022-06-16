<template>
  <v-container fluid>
    <v-row no-gutters class="mb-4">
      <v-col cols="6">
        <h3>Lys i huset</h3>
      </v-col>
      <v-col cols="6" class="d-flex flex-row justify-end">
        <v-btn @click="getLights">Opdater</v-btn>
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-container fluid class="navbar d-flex flex-row">
        <v-col cols="2">
          <v-select v-model="lightShown" class="ma-0 pa-0" :items="lightStates" hide-details label="Vælg hvilke lys der skal vises"></v-select>
        </v-col>
      </v-container>
    </v-row>
    <v-data-table :items="filterLights" :headers="lightListHeaders">
      <template #[`item.state.on`]="{ item }">
        {{ item.state.on ? 'Tændt' : 'Slukket' }}
      </template>
      <template #[`item.state.color`]="{ item }">
        {{ item.state.xy ? 'XY : ' + item.state.xy : 'Hvid' }}
      </template>
      <template #[`item.actions`]="{ item }">
        <v-btn class="mx-1" min-width="85px" @click="toggleLight(item)"> {{ item.state.on ? 'Sluk' : 'Tænd' }}</v-btn>
        <v-btn class="mx-1" @click="showDetails(item)"> Details</v-btn>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import apiService from '../services/apiService';

export default {
  data: () => ({
    lights: [],
    lightShown: 0,
    fetching: false,

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

    lightListHeaders: [
      {
        text: 'Id',
        value: 'id',
        width: '5vw',
      },
      {
        text: 'Navn',
        value: 'name',
        width: '15vw',
      },
      {
        text: 'Produkt type',
        value: 'productname',
        width: '15vw',
      },
      {
        text: 'Farve',
        value: 'state.color',
        width: '15vw',
      },
      {
        text: 'Lysstyrke',
        value: 'state.bri',
        width: '15vw',
      },
      {
        text: 'Tilstand',
        value: 'state.on',
        width: '5vw',
      },
      {
        text: '',
        value: 'actions',
      },
    ],
  }),
  computed: {
    filterLights() {
      if (this.lightShown == 1) {
        return this.lights.filter((x) => x.state.on == true);
      } else if (this.lightShown == 2) {
        return this.lights.filter((x) => x.state.on == false);
      }
      return this.lights;
    },
  },
  methods: {
    showDetails() {
      console.log('Details will be shown here.');
    },
    async getLights() {
      this.fetching = true;
      let response = await apiService.getLights();
      console.log('response', response);
      this.lights = Object.keys(response).map((key) => {
        let test = response[key];
        test.id = key;
        return response[key];
      });
      this.fetching = false;
      // console.log('Lights', this.lights);
    },
    async toggleLight(light) {
      this.getLights();
      let _light = await apiService.getLight(light.id);
      if (_light.state.on) {
        let response = await apiService.turnLightOff(light.id);
        if (!response[0].success[Object.keys(response[0].success)[0]]) console.log('Slukket');
      } else {
        let response = await apiService.turnLightOn(light.id);
        if (response[0].success[Object.keys(response[0].success)[0]]) console.log('Tændt');
      }
      this.getLights();
    },
  },
  created() {
    this.getLights();
  },
};
</script>

<style>
</style>