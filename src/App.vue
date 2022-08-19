<template>
  <div id="1">
    <GameComponent />
  </div>
</template>

<script>
import TestRandomProvider from "./model/TestRandomProvider.js";
import { WebBombikaViewModel } from "./viewModel/webBombikaViewModel";
//import ResetComponent from "./components/ResetComponent.vue";
import GameComponent from "./components/GameComponent.vue";
const igrica = new WebBombikaViewModel(new TestRandomProvider());
// const player = igrica.newGame();
// const board = player.minefield;
export default {
  setup() {
    return {
      igrica: igrica,
    };
  },
  name: "App",
  components: { GameComponent },
  methods: {},
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
