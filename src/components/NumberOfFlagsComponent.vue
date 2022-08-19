<template>
  <div class="container">
    <h1>{{ player.numberOfBombs }}</h1>
  </div>
</template>
<script>
import TestRandomProvider from "@/model/TestRandomProvider";
import { WebBombikaViewModel } from "@/viewModel/webBombikaViewModel";

const webBombikaViewModel = new WebBombikaViewModel(new TestRandomProvider());
const player = webBombikaViewModel.newGame();

export default {
  setup() {
    return {
      player: player,
      webBombikaViewModel: webBombikaViewModel,
    };
  },
  components: {},
};
</script>
