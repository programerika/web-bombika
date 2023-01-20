<template>
  <v-dialog transition="dialog-top-transition" class="helpDialog">
    <template v-slot:activator="{ props }">
      <v-btn
        size="large"
        v-bind="props"
        class="ma-1"
        color="#1df5db"
        icon="mdi-help"
      >
      </v-btn>
    </template>
    <template v-slot:default="{ isActive }">
      <v-card class="rounded-xl">
        <v-toolbar color="#15b3a0">
          <v-toolbar-title text="Web-Bombika user guide"></v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <div class="text-p pa-2 text-justify">
            Web-Bombika is a single-player game where mines are hidden and if
            you click the mine cell you lose the game. There are cells with
            numbers indicating the number of mines surrounding the cell. You are
            safe to click on them. Put a flag on every cell you assume to be a
            cell with mine.
          </div>
          <div class="text-p pa-2 text-justify">
            When you open a cell that doesn't touch any cells with mines, it
            will be empty and all the other empty cells that are in touch with
            it will automatically open in all directions until reaching cells
            that have numbers.
          </div>
          <div class="text-p pa-2 text-justify">
            The game ends when you open all the cells that are not mines. Based
            on the number of seconds that you spend in the game, your score will
            be calculated. Initial score is 100 and goes down by 5 points every
            10 seconds. If you finish the game after 180 seconds (3 minutes),
            you will be awarded 1 honorary point.
          </div>
          <div class="text-p pa-2 text-center">
            Controls: <br />* left click or press: opens a cell <br />
            * right click or long press: flag a cell
          </div>
          <div class="text-p pa-2 text-justify">
            The button on the top left of the game represents a reset button. If
            you click it, the game will reset to default values.
          </div>
          <div class="text-p pa-2 text-justify">
            The number next to a flag icon represents a number of flags that you
            have remaining. When you finish the game, the number of flags should
            be zero.
          </div>
          <div class="text-p pa-2 text-justify">
            The number next to a stopwatch icon represents the game timer. It
            shows the number of seconds that you spent playing the game.
          </div>
        </v-card-text>
        <v-card-actions class="justify-center">
          <v-btn class="closeButton" text @click="isActive.value = false"
            >Close</v-btn
          >
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>

<style scoped>
.helpDialog {
  display: flex;
}

.closeButton {
  padding: 5px 20px;
  font: 0.7em sans-serif;
  border-radius: 10px;
  border: 1px solid rgb(44, 44, 44);
  text-align: center;
  transition-duration: 0.4s;
  font-size: large;
  min-width: 140px;
}

.closeButton:hover:enabled {
  background-color: #1d011b;
  color: white;
  cursor: pointer;
}
</style>
