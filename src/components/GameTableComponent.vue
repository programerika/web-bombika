<template>
  <div class="flex" v-for="r in igra.board" :key="r.x">
    <div v-for="c in r" :key="c.y">
      <CellComponent
        @clicked="onCellClicked(c.x, c.y)"
        :cell="igra.board[c.x][c.y]"
      ></CellComponent>
    </div>
  </div>
</template>
<script>
// import TestRandomProvider from "@/model/TestRandomProvider";
// import { WebBombikaViewModel } from "@/viewModel/webBombikaViewModel";
import CellComponent from "./CellComponent.vue";

//let vm = new WebBombikaViewModel(new TestRandomProvider());
//vm.newGame();

export default {
  setup() {
    return {};
  },
  props: {
    board: Object,
    igra: Object,
  },
  methods: {
    onCellClicked: function (r, c) {
      console.log("Opened field", r, c);
      this.igra.openField(r, c);
    },
  },
  components: { CellComponent },
};
</script>
<style>
.flex {
  display: flex;
}
</style>
