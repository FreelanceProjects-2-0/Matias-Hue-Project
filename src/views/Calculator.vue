<template>
  <v-container fluid>
    <!-- Use regex to get numbers and expressions from a string.
      Should make it possible to do more advanced calculations than 4*5
    -->
    <h3 class="text-center pb-10">
      You can only do one calculation at a time.
      <br />
      Press "=" to do multiple calculations.
      <br />
      Example: 4 + 3 = (Will give 7, then if u press "*" and lets say "5", the calculator will calculate 7*5)
    </h3>
    <v-card class="mx-auto" color="#efefef" height="50vh" width="300">
      <v-row>
        <v-col cols="8">
          <v-text-field class="pa-2 black--text" v-model="displayText" outlined background-color="grey" color="black" />
        </v-col>
        <v-col cols="4">
          <v-text-field class="pa-2 black--text" v-model="nextExpression" outlined background-color="grey" color="black" />
        </v-col>
      </v-row>
      <v-row no-gutters v-for="(row, index) in rows" :key="index" class="pa-3 py-0 pt-3 ma-0">
        <v-col
          v-for="(btn, index) in row.btns"
          :key="index"
          :cols="btn === 0 ? '4' : btn === '=' ? '4' : btn === 'clear' ? '4' : btn === 'backspace' ? '4' : '2'"
        >
          <div class="px-1 d-flex flex-column" v-if="btn === 'backspace' || btn === 'clear'">
            <v-btn @click="clear()" tile color="#afafaf" class="black--text" block elevation="0" v-if="btn === 'clear'">
              <v-icon>mdi-delete-outline</v-icon>
            </v-btn>
            <v-btn @click="erase()" tile color="#afafaf" class="black--text" block elevation="0" v-if="btn === 'backspace'">
              <v-icon>mdi-arrow-left</v-icon>
            </v-btn>
          </div>
          <div class="px-1 d-flex flex-column" v-else>
            <v-btn @click="clickEvent(btn)" tile color="#afafaf" class="black--text" block elevation="0">
              {{ btn }}
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
export default {
  methods: {
    resetData() {
      this.currentVal = 0;
      this.calcVal = 0;
      this.nextExpression = '';
      this.displayText = '';
    },
    clear() {
      this.resetData();
    },
    erase() {
      if (this.displayText !== '') {
        let subString = this.displayText.substring(this.displayText.length - 1, -1);
        this.displayText = subString;
      }
    },
    clickEvent(item) {
      if (item === '=') {
        this.submitEvent();
      } else if (!isNaN(item)) {
        if (this.nextExpression !== '') {
          this.displayText += item;
        } else {
          this.displayText += item;
        }
      } else {
        this.currentVal = this.displayText;
        this.nextExpression = item;
        this.displayText = '';
      }
    },
    submitEvent() {
      this.calcVal = this.displayText;
      let returnVal = this.calc();
      this.displayText = returnVal;
    },
    calc() {
      console.log('5 > ', this.currentVal, this.nextExpression, this.calcVal);
      let returnVal = 0;
      if (this.nextExpression === '+') {
        returnVal = parseInt(this.currentVal) + parseInt(this.calcVal);
      }
      if (this.nextExpression === '-') {
        returnVal = parseInt(this.currentVal) - parseInt(this.calcVal);
      }
      if (this.nextExpression === '/') {
        returnVal = parseInt(this.currentVal) / parseInt(this.calcVal);
      }
      if (this.nextExpression === '*') {
        returnVal = parseInt(this.currentVal) * parseInt(this.calcVal);
      }
      this.nextExpression = '';
      return returnVal;
    },
  },
  data: () => ({
    currentVal: 0,
    calcVal: 0,
    nextExpression: '',
    displayText: '',
    rows: [
      {
        btns: [7, 8, 9, '/', 'backspace'],
      },
      {
        btns: [4, 5, 6, '*', 'clear'],
      },
      {
        btns: [1, 2, 3, '-', '(', ')'],
      },
      {
        btns: [0, ',', '+', '='],
      },
    ],
  }),
};
</script>