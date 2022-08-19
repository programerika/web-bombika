<template>
  <div class="container">
    <HeaderComponent />
    <GameTableComponent />
  </div>
</template>
<script>
import HeaderComponent from "./HeaderComponent.vue";
import GameTableComponent from "./GameTableComponent.vue";
// import { WebBombikaViewModel } from "@/viewModel/webBombikaViewModel";
// import TestRandomProvider from "@/model/TestRandomProvider";
// import CellComponent from "./CellComponent.vue";

export default {
  setup() {
    // let webBombikaViewModel = new WebBombikaViewModel(new TestRandomProvider());
    // let board = webBombikaViewModel.newGame();
    // let tabla = board.minefield;
  },
  props: {
    igra: Object,
  },
  methods: {
    napraviIgru: function () {
      this.igra.newGame();
    },
    openField: function () {},
  },
  components: { HeaderComponent, GameTableComponent },
};
</script>
<style scoped>
.flex {
  display: flex;
}
</style>
