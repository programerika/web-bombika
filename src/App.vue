<template>
  <button @click="logujBoard()">LOG</button>
</template>

<script>
import webBombikaModel from "./model/webBombikaModel.js";
export default {
  name: "App",
  components: {},
  methods: {
    logujBoard: function () {
      return webBombikaModel(4, 4, 7);
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
