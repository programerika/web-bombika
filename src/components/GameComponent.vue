<template>
  <div class="container">
    <div>
      <HeaderComponent>
        <ResetComponent @restart="restartGame" />
        <NumberOfFlagsComponent :numberOfFlags="numberOfFlags" />

        <TimerComponent
          :gameStatus="isFinished"
          :timer="timer"
          @time="timer++"
        />
        <HelpComponent />
      </HeaderComponent>
      <GameTableComponent
        :mineField="playerState.minefield"
        @toggleFlag="toggleFlag"
        @openField="openField"
      />
    </div>
  </div>
</template>
<script>
//slot za header, timer
import HeaderComponent from "./HeaderComponent.vue";
import GameTableComponent from "./GameTableComponent.vue";
import { WebBombikaViewModel } from "@/viewModel/webBombikaViewModel";
import ResetComponent from "./ResetComponent.vue";
import NumberOfFlagsComponent from "./NumberOfFlagsComponent.vue";
import TimerComponent from "./TimerComponent.vue";
import HelpComponent from "./HelpComponent.vue";

export default {
  data() {
    return {
      timer: 0,
      wbvm: {},
      playerState: {},
    };
  },
  mounted() {
    this.wbvm = new WebBombikaViewModel();
    this.playerState = this.wbvm.newGame();
  },
  methods: {
    restartGame() {
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
  computed: {
    numberOfFlags() {
      return this.playerState.numberOfFlags;
    },
    isFinished() {
      return this.playerState.isFinished;
    },
  },
  components: {
    HeaderComponent,
    GameTableComponent,
    ResetComponent,
    NumberOfFlagsComponent,
    TimerComponent,
    HelpComponent,
  },
};
</script>
<style scoped>
.container {
  border: 2px solid black;
  margin: auto;
  display: grid;
  place-items: center;
  width: auto;
  border-radius: 10pt;
  width: fit-content;
  height: fit-content;
  zoom: 125%;
}

.gameContainer {
  border: 2px solid black;
  display: grid;
}

@media screen and (max-width: 600px) {
  .container {
    border: 2px solid black;
    margin: auto;
    display: grid;
    place-items: center;
    width: auto;
    border-radius: 10pt;
    width: fit-content;
    height: fit-content;
    zoom: 90%;
    justify-content: space-between;
  }
}
</style>
