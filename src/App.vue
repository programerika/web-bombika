<template>
  <div id="1">
    <button @click="napraviIgru()">NewGame</button>
    <button @click="otvoriPolje1()">OpenField1</button>
    <button @click="otvoriPolje2()">OpenField2</button>
    <button @click="otvoriPolje3()">OpenField3</button>
    <button @click="otvoriPolje4()">OpenField4</button>
    <button @click="otvoriPolje5()">OpenField5</button>
    <button @click="otvoriPolje6()">OtvoriPolje6</button>
    <button @click="staviZastavu()">StaviZastavu</button>
    <button @click="skloniZastavu()">SkloniZastavu</button>
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
    otvoriPolje1: function () {
      igra.openField(3, 0);
    },
    otvoriPolje2: function () {
      igra.openField(0, 3);
    },
    otvoriPolje3: function () {
      igra.openField(1, 0);
    },
    otvoriPolje4: function () {
      igra.openField(0, 1);
    },
    otvoriPolje5: function () {
      igra.openField(9, 8);
    },
    otvoriPolje6: function () {
      igra.openField(8, 9);
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
