<template>
  <div class="container">
    <div>
      <HeaderComponent
        :numberOfFlags="playerState.numberOfBombs"
        @reset="restartuj()"
      />
      <GameTableComponent
        :player="playerState"
        @rightClick="toggleFlag"
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

export default {
  data() {
    return {
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
    },
    toggleFlag(cellCoordinates) {
      this.playerState = {
        ...this.playerState,
        ...this.wbvm.toggleFlag(cellCoordinates.r, cellCoordinates.c),
      };
    },
    openField(cellCoordinates) {
      this.playerState = {
        ...this.playerState,
        ...this.wbvm.openField(cellCoordinates.r, cellCoordinates.c),
      };
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
