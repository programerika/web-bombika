<template>
  <div id="1">
    <button @click="napraviIgru()">LOG</button>
    <button @click="otvoriPolje()">Open</button>
  </div>
</template>

<script>
// import { request } from "http";
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
    otvoriPolje: function () {
      igra.openField(1, 0);
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
