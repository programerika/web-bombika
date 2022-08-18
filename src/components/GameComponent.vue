<template>
  <div class="container">
    <HeaderComponent />
    <GameTableComponent />
    <button @click="napraviIgru()">NewGame</button>
  </div>
</template>
<script>
import HeaderComponent from "./HeaderComponent.vue";
import GameTableComponent from "./GameTableComponent.vue";
import { WebBombikaViewModel } from "@/viewModel/webBombikaViewModel";
import TestRandomProvider from "@/model/TestRandomProvider";

const webBombikaViewModel = new WebBombikaViewModel(new TestRandomProvider());

export default {
  setup() {},
  components: { HeaderComponent, GameTableComponent },
  methods: {
    napraviIgru: function () {
      webBombikaViewModel.newGame();
    },
  },
};
</script>
