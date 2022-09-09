<template>
  <div class="minefield">
    <v-row align="center" justify="center" class="ma-0">
      <v-card height="320" width="320" color="transparent">
        <div class="tabla" v-for="r in mineField" :key="r.x">
          <div class="celija" v-for="c in r" :key="c.y">
            <GameCell
              @openField="onCellClicked(c.x, c.y)"
              :cell="mineField[c.x][c.y].image"
              @toggleFlag="onCellRightClicked(c.x, c.y)"
              :flagSelector="flagSelector"
            ></GameCell>
          </div>
        </div>
        <v-row justify="center">
          <!-- <v-btn color="success" class="mt-12" @click="overlay = !overlay">
            Show Overlay
          </v-btn> -->
          <v-overlay
            :v-if="isFinished ? (overlay = true) : (overlay = false)"
            v-model="overlay"
            contained
            class="align-center justify-center"
          >
            <v-card
              elevation="12"
              class="scoreCard"
              width="300px"
              height="150px"
            >
              <GameScore :score="score" />
            </v-card>
          </v-overlay>
        </v-row>
      </v-card>
    </v-row>
  </div>
</template>

<script>
import GameCell from "./GameCell.vue";
import GameScore from "./GameScore.vue";

export default {
  data: () => ({
    overlay: false,
  }),
  props: {
    score: Number,
    mineField: Object,
    flagSelector: Boolean,
    isFinished: Boolean,
  },
  methods: {
    onCellClicked(r, c) {
      console.log("Opened field", r, c);
      this.$emit("openField", { r: r, c: c });
    },
    onCellRightClicked(r, c) {
      console.log("Flagged field", r, c);
      this.$emit("toggleFlag", { r: r, c: c });
    },
  },
  components: { GameCell, GameScore },
  emits: ["openField", "toggleFlag"],
};
</script>

<style>
.tabla {
  display: flex;
}

.minefield {
  border: 2px solid #0c5e54;
  border-radius: 5px;
  background-color: #0c5e54;
}

.scoreCard {
  background-color: rgb(21, 179, 160, 0.95);
}
.celija {
  width: 30px;
  height: 30px;
  margin: 1px;
}
</style>

<!-- #0c5e54 -->
