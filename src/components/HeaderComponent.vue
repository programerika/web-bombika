<template>
  <div class="flex">
    <NumberOfFlagsComponent :numberOfFlags="countFlags()" />
    <ResetComponent @reset="resetuj()" />
    <TimerComponent />
  </div>
</template>
<script>
import TestRandomProvider from "@/model/TestRandomProvider";
import { WebBombikaViewModel } from "@/viewModel/webBombikaViewModel";
import NumberOfFlagsComponent from "./NumberOfFlagsComponent.vue";
import ResetComponent from "./ResetComponent.vue";
import TimerComponent from "./TimerComponent.vue";

const webBombikaViewModel = new WebBombikaViewModel(new TestRandomProvider());

export default {
  setup() {
    return {
      webBombikaViewModel: webBombikaViewModel,
    };
  },
  components: { NumberOfFlagsComponent, ResetComponent, TimerComponent },
  methods: {
    resetuj: function () {
      webBombikaViewModel.newGame();
    },
    countFlags: function () {
      return webBombikaViewModel.player.numberOfBombs;
    },
  },
};
</script>

<style>
.flex {
  display: flex;
  border: 2px solid black;
}
</style>
