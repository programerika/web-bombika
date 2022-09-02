<template>
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
</template>
<script>
import GameCell from "./GameCell.vue";

export default {
  props: {
    mineField: Object,
    flagSelector: Boolean,
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
  components: { GameCell },
  emits: ["openField", "toggleFlag"],
};
</script>
<style>
.tabla {
  display: flex;
}
.celija {
  width: 30px;
  height: 30px;
  margin: 1px;
}
</style>
