<template>
  <div class="container">
    <div>
      <HeaderComponent
        :numberOfFlags="playerState.numberOfFlags"
        :isFinished="playerState.isFinished"
        :timer="timer"
        @reset="restartuj()"
        @time="timer++"
      />
      <GameTableComponent
        :player="playerState.minefield"
        @toggleFlag="toggleFlag"
        @openField="openField"
      />
    </div>
  </div>
</template>
<script>
import HeaderComponent from "./HeaderComponent.vue";
import GameTableComponent from "./GameTableComponent.vue";
import { WebBombikaViewModel } from "@/viewModel/webBombikaViewModel";
import TestRandomProvider from "@/model/TestRandomProvider";
// import TestRandomProvider from "@/model/TestRandomProvider";
// import RandomProvider from "@/model/RandomProvider";

export default {
  data() {
    return {
      timer: 0,
      wbvm: {},
      playerState: {},
    };
  },
  mounted() {
    this.wbvm = new WebBombikaViewModel(new TestRandomProvider());
    this.playerState = this.wbvm.newGame();
  },
  methods: {
    restartuj() {
      this.playerState = this.wbvm.newGame();
      this.timer = 0;
    },
    toggleFlag(cellCoordinates) {
      this.playerState = this.wbvm.toggleFlag(
        cellCoordinates.r,
        cellCoordinates.c
      );
    },
    openField(cellCoordinates) {
      this.playerState = this.wbvm.openField(
        cellCoordinates.r,
        cellCoordinates.c
      );
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
  width: auto;
  margin-right: ;
}

.gameContainer {
  border: 2px solid black;
  display: grid;
  place-items: center;
}
</style>
