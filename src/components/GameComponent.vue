<template>
  <div class="container">
    <div>
      <HeaderComponent>
        <div class="justify"><ResetComponent @restart="restartGame" /></div>
        <div>
          <TimerComponent :gameStatus="isFinished" :startTime="startTime" />
          <NumberOfFlagsComponent :numberOfFlags="numberOfFlags" />
        </div>
        <div><HelpComponent /></div>

        <v-switch
          class="toggle"
          density="compact"
          color="red"
          :flat="true"
          @click="toggleFlagSelectorButton"
          v-model="flagSelector"
        ></v-switch>
        <!-- <v-btn @click="toggleFlagSelectorButton" class="toggle"> </v-btn> -->
      </HeaderComponent>
      <GameTableComponent
        :mineField="mineField"
        @toggleFlag="toggleFlag"
        @openField="openField"
        :flagSelector="flagSelector"
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
      console.log("toggle");
      this.flagSelector = !this.flagSelector;
      console.log(this.flagSelector);
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
.justify {
  justify-content: space-between;
}
.container {
  border: 2px solid black;
  margin: auto;
  display: grid;
  place-items: center;
  width: auto;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
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
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    width: fit-content;
    height: fit-content;
    zoom: 90%;
    justify-content: space-between;
  }
}

@media screen and (min-width: 600px) {
  .toggle {
    display: none;
  }
}
</style>
