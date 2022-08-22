<template>
  <div class="flex" v-for="r in igra.board" :key="r.x">
    <div class="celija" v-for="c in r" :key="c.y">
      <CellComponent
        @clicked="onCellClicked(c.x, c.y)"
        :cell="igra.board[c.x][c.y]"
        @rightClick="onCellRightClicked(c.x, c.y)"
      ></CellComponent>
    </div>
  </div>
</template>
<script>
import CellComponent from "./CellComponent.vue";

export default {
  setup() {
    return {};
  },
  props: {
    igra: Object,
  },
  methods: {
    onCellClicked: function (r, c) {
      console.log("Opened field", r, c);
      this.igra.openField(r, c);
    },
    onCellRightClicked: function (r, c) {
      this.igra.toggleFlag(r, c);
    },
  },
  components: { CellComponent },
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
