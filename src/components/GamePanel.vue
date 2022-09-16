<template>
  <div class="container">
    <div>
      <GameHeader>
        <div class="justify"><ResetButton @restart="restartGame" /></div>
        <div>
          <GameTimer :gameStatus="isFinished" :startTime="startTime" />
          <NumberOfFlags :numberOfFlags="numberOfFlags" />
        </div>
        <div><HelpButton /></div>
      </GameHeader>
      <div class="flagSelector">
        <v-switch
          label="open/flag field"
          class="toggle"
          density="compact"
          color="red"
          :flat="true"
          @click="toggleFlagSelectorButton"
          v-model="flagSelector"
          hide-details
        ></v-switch>
      </div>
      <GameTable
        :mineField="mineField"
        :isFinished="isFinished"
        @toggleFlag="toggleFlag"
        @openField="openField"
        :flagSelector="flagSelector"
        :score="score"
        @playAgain="restartGame"
      />
    </div>
  </div>
</template>
<script>
import GameHeader from "./GameHeader.vue";
import GameTable from "./GameTable.vue";
import { WebBombikaViewModel } from "@/viewModel/webBombikaViewModel";
import ResetButton from "./ResetButton.vue";
import NumberOfFlags from "./NumberOfFlags.vue";
import GameTimer from "./GameTimer.vue";
import HelpButton from "./HelpButton.vue";

export default {
  data() {
    return {
      wbvm: {},
      playerState: {},
      flagSelector: false,
    };
  },
  mounted() {
    this.wbvm = new WebBombikaViewModel();
    this.playerState = this.wbvm.newGame();
  },
  methods: {
    restartGame() {
      this.playerState = this.wbvm.newGame();
    },
    toggleFlag(cellCoordinates) {
      this.playerState = this.wbvm.toggleFlag(
        cellCoordinates.r,
        cellCoordinates.c,
        this.playerState
      );
    },
    openField(cellCoordinates) {
      this.playerState = this.wbvm.openField(
        cellCoordinates.r,
        cellCoordinates.c,
        this.playerState
      );
    },
    toggleFlagSelectorButton() {
      this.flagSelector = !this.flagSelector;
    },
  },
  computed: {
    numberOfFlags() {
      return this.playerState.numberOfFlags;
    },
    isFinished() {
      return this.playerState.isFinished;
    },
    mineField() {
      return this.playerState.minefield;
    },
    startTime() {
      return this.playerState.startTime;
    },
    score() {
      return this.playerState.score;
    },
  },
  components: {
    GameHeader,
    GameTable,
    ResetButton,
    NumberOfFlags,
    GameTimer,
    HelpButton,
  },
};
</script>
<style scoped>
.justify {
  justify-content: space-between;
}
.container {
  border: 4px solid #15b3a0;
  margin: auto;
  display: grid;
  place-items: center;
  width: auto;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  width: fit-content;
  height: fit-content;
  background-color: #15b3a0;
}

.flagSelector {
  display: grid;
  place-items: center;
}

@media screen and (max-width: 600px) {
  .container {
    border: 2px solid black;
    margin: auto;
    display: grid;
    place-items: center;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    width: fit-content;
    height: fit-content;
    justify-content: space-between;
    background-color: #15b3a0;
  }
}

@media screen and (min-width: 600px) {
  .toggle {
    display: none;
  }
}
</style>
