<template>
  <div class="container">
    <div>
      <HeaderComponent
        :igra="wbvm"
        @reset="restartuj()"
        @changed="vratiBrojZastava()"
      />
      <GameTableComponent :igra="wbvm" />
    </div>
  </div>
</template>
<script>
import HeaderComponent from "./HeaderComponent.vue";
import GameTableComponent from "./GameTableComponent.vue";
import { WebBombikaViewModel } from "@/viewModel/webBombikaViewModel";
import TestRandomProvider from "@/model/TestRandomProvider";
let wbvm = new WebBombikaViewModel(new TestRandomProvider());

export default {
  setup() {
    return {
      wbvm: wbvm,
    };
  },
  props: {
    igra: wbvm,
  },
  methods: {
    napraviIgru: function () {
      this.igra.newGame();
    },
    vratiBrojZastava: function () {
      return wbvm.player.numberOfBombs;
    },
    restartuj: function () {
      wbvm.newGame();
    },
  },
  components: { HeaderComponent, GameTableComponent },
};
</script>
<style scoped>
.container {
  border: 2px solid black;
  margin: auto;
  display: grid;
  place-items: center;
}

.gameContainer {
  border: 2px solid black;
  margin: auto;
  display: grid;
  place-items: center;
}
</style>
