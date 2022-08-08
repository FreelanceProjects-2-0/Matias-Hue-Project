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
          <v-select v-model="lightShown" class="ma-0 pa-0" :items="lightStates" hide-details label="Vælg hvilke lys der skal vises" />
        </v-col>
        <v-col offset="2" cols="4">
          <v-text-field hide-details v-model="search" label="Søg blandt enheder" class="ma-0 pa-0" />
        </v-col>
        <v-col v-if="hideDefaultActionButtons" cols="4" class="d-flex align-center justify-end ma-0 pa-0">
          <v-btn @click="toggleGroupState(false)" class="mx-1">Sluk gruppe</v-btn>
          <v-btn @click="toggleGroupState(true)" class="mx-1">Tænd gruppe</v-btn>
        </v-col>
      </v-container>
    </v-row>
    <v-data-table :items="filterLights" :headers="lightListHeaders" :search="search">
      <template #[`item.checkBox`]="{ item }">
        <v-checkbox @click="toggleGroup(item)" />
      </template>
      <template #[`item.state.on`]="{ item }">
        {{ item.state.on ? 'Tændt' : 'Slukket' }}
      </template>
      <template #[`item.state.color`]="{ item }">
        {{ item.state.xy ? 'XY : ' + item.state.xy : 'Hvid' }}
      </template>
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
    lights: [],
    lightShown: 0,
    fetching: false,
    lightGroup: [],
    search: '',

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
        text: '',
        value: 'checkBox',
      },
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
    hideDefaultActionButtons() {
      if (this.lightGroup.length > 0) return true;
      return false;
    },
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
    // on = the state,
    // if on = true; turn all lights on
    // if on = false; turn all lights off
    async toggleGroupState(on) {
      if (on) {
        for (let light of this.lightGroup) {
          // console.log(`Turn on >> ${light.name} : ${light.id} : ${light.state.on}`);
          if (light.state.on == false) {
            // console.log(`Tænder ${light.name}`);
            let response = await apiService.turnLightOn(light.id);
            // console.log('Response >> ', response[0].success, response[0].success[Object.keys(response[0].success)[0]]);
            light.state.on = response[0].success[Object.keys(response[0].success)[0]];
            // console.log(light);
          }
        }
      } else {
        for (let light of this.lightGroup) {
          // console.log(`Turn off >> ${light.name} : ${light.id} : ${light.state.on}`);
          if (light.state.on == true) {
            // console.log(`Slukker ${light.name}`);
            let response = await apiService.turnLightOff(light.id);
            // console.log('Response >> ', response[0].success, response[0].success[Object.keys(response[0].success)[0]]);
            light.state.on = response[0].success[Object.keys(response[0].success)[0]];
            // console.log(light);
          }
        }
      }
      this.getLights();
    },
    toggleGroup(light) {
      if (this.lightGroup.some((l) => l.id === light.id)) {
        this.lightGroup = this.lightGroup.filter((x) => x.id != light.id);
      } else {
        this.lightGroup.push(light);
      }
    },
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