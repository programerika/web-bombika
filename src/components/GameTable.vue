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
            persistent
            :v-if="isFinished"
            v-model="overlay"
            contained
            scroll-strategy="none"
          >
            <slot></slot>
          </v-overlay>
        </v-row>
      </v-card>
    </v-row>
  </div>
</template>

<script>
import GameCell from "./GameCell.vue";

export default {
  data: () => ({
    overlay: false,
  }),
  props: {
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
  },
  components: { GameCell },
  emits: ["openField", "toggleFlag"],
  watch: {
    isFinished() {
      this.isFinished ? (this.overlay = true) : (this.overlay = false);
    },
  },
};
</script>

<style scoped>
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

/* .v-overlay {
  display: table-cell;
} */

@media screen and (max-width: 800px) {
  .minefield {
    margin: 4px;
  }
}
</style>
