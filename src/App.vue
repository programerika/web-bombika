<template>
  <div id="1">
    <button @click="napraviIgru()">NewGame</button>
    <button @click="otvoriPolje()">OpenField</button>
    <button @click="staviZastavu()">StaviZastavu</button>
    <button @click="skloniZastavu()">SkloniZastavu</button>
  </div>
</template>

<script>
// import RandomProvider from "./model/RandomProvider.js";
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
      igra.addFlag(1, 2);
    },
    skloniZastavu: function () {
      igra.removeFlag(1, 2);
    },
    otvoriPolje: function () {
      igra.openField(1, 2);
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
