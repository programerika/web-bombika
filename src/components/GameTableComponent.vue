<template>
  <div class="flex" v-for="r in player" :key="r.x">
    <div class="celija" v-for="c in r" :key="c.y">
      <CellComponent
        @openField="onCellClicked(c.x, c.y)"
        :cell="player[c.x][c.y]"
        @rightClick="onCellRightClicked(c.x, c.y)"
      ></CellComponent>
    </div>
  </div>
</template>
<script>
import CellComponent from "./CellComponent.vue";

export default {
  props: {
    player: Object,
    image: Image,
  },
  methods: {
    onCellClicked(r, c) {
      console.log("Opened field", r, c);
      // this.igra.openField(r, c);
      this.$emit("openField", { r: r, c: c });
    },
    onCellRightClicked(r, c) {
      console.log(r, c);
      this.$emit("toggleFlag", { r: r, c: c });
    },
  },
  components: { CellComponent },
  emits: ["openField", "toggleFlag"],
};
</script>
<style>
.flex {
  display: flex;
}
.celija {
  width: 30px;
  height: 30px;
}
</style>
