<template>
  <div id="1">
    <button @click="napraviIgru()">NewGame</button>
    <button @click="otvoriPolje()">OpenField</button>
    <button @click="staviZastavu()">StaviZastavu</button>
    <button @click="skloniZastavu()">SkloniZastavu</button>
    <button @click="otvoriPoljeSklonjenaZastava()">
      OtvoriPoljeSklonjenaZastava
    </button>
  </div>
</template>

<script>
//import RandomProvider from "./model/RandomProvider.js";
import TestRandomProvider from "./model/TestRandomProvider.js";
import WebBombikaModel from "./model/webBombikaModel.js";
const igra = new WebBombikaModel(new TestRandomProvider());
export default {
  name: "App",
  components: {},
  methods: {
    napraviIgru: function () {
      igra.newGame();
    },
    staviZastavu: function () {
      igra.addFlag(4, 1);
    },
    skloniZastavu: function () {
      igra.removeFlag(4, 1);
    },
    otvoriPolje: function () {
      igra.openField(3, 0);
    },
    otvoriPoljeSklonjenaZastava: function () {
      igra.openField(4, 1);
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
