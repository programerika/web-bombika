<template>
  <div class="minefield">
    <v-row align="center" justify="center" class="ma-0">
      <v-card height="320" width="320" color="transparent">
        <div class="table" v-for="r in mineField" :key="r.x">
          <div class="field" v-for="c in r" :key="c.y">
            <GameCell
              @openField="onCellClicked(c.x, c.y)"
              :cell="mineField[c.x][c.y].image"
              @toggleFlag="onCellRightClicked(c.x, c.y)"
              :flagSelector="flagSelector"
            ></GameCell>
          </div>
        </div>
        <v-row justify="center">
          <v-overlay
            :v-if="isFinished"
            v-model="overlay"
            contained
            class="align-center justify-center"
            scroll-strategy="close"
          >
            <GameScore
              :isFinished="isFinished"
              :score="score"
              @playAgain="playAgain"
            />
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
      this.$emit("openField", { r: r, c: c });
    },
    onCellRightClicked(r, c) {
      this.$emit("toggleFlag", { r: r, c: c });
    },
    playAgain() {
      this.$emit("playAgain");
    },
  },
  components: { GameCell, GameScore },
  emits: ["openField", "toggleFlag", "playAgain"],
  watch: {
    isFinished() {
      this.isFinished ? (this.overlay = true) : (this.overlay = false);
    },
  },
};
</script>

<style>
.table {
  display: flex;
}

.minefield {
  border: 2px solid #0c5e54;
  border-radius: 5px;
  background-color: #0c5e54;
}

.field {
  width: 30px;
  height: 30px;
  margin: 1px;
}

@media screen and (max-width: 600px) {
  .minefield {
    margin: 4px;
  }
}
</style>
