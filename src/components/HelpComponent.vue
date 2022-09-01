<template>
  <v-dialog transition="dialog-top-transition">
    <template v-slot:activator="{ props }">
      <v-btn
        size="small"
        v-bind="props"
        class="ma-1"
        color="cyan"
        icon="mdi-help"
      >
      </v-btn>
    </template>
    <template v-slot:default="{ isActive }">
      <v-card class="rounded-xl">
        <v-toolbar color="cyan">
          <v-toolbar-title text="Web-Bombika user guide"></v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <div class="text-p pa-2 text-justify">
            - The button on the top left of the game represents a reset button.
            If you click it, the game will reset to default values.
          </div>
          <div class="text-p pa-2 text-justify">
            - The number next to a flag icon represents a number of flags that
            you have remaining. When you finish the game, the number of flags
            should be zero.
          </div>
          <div class="text-p pa-2 text-justify">
            - The number next to a stopwatch icon represents the game timer. It
            shows the number of seconds that you spent playing the game.
          </div>
          <div class="text-p pa-2 text-justify">
            - The game ends when you open all the cells that are not bombs.
            Based on the number of seconds that you spend in the game, your
            score will be calculated. <br />
            Initial score is 100 and goes down by 5 points every 10 seconds.
            <br />If you finish the game after 180 seconds (3 minutes), you will
            be awarded 1 honorary point.
          </div>
          <div class="text-p pa-2 text-center">
            Controls: <br />-left click or press: open a cell <br />
            -right click on long press: flag a cell
          </div>
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn text @click="isActive.value = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<script>
import help from "@/assets/help.png";
export default {
  data() {
    return {
      help,
      opacity: 0.5,
    };
  },
};
</script>

<style>
.imageStyle {
  display: flex;
}
</style>

<!-- <div class="flex">
    <button>
      
    </button>
  </div> -->
