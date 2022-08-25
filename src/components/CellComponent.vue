<template>
  <div class="flex">
    <img
      @click="onClick()"
      @contextmenu.prevent="onRightClick()"
      class="flex"
      :src="changeImage()"
      alt="field"
    />
  </div>
</template>
<script>
import field from "@/assets/closedCell.png";
import flag from "@/assets/flag.png";
import bomb from "@/assets/bomba.jpg";
import triggeredBomb from "@/assets/triggeredbomba.jpg";
import openCell from "@/assets/openCell.png";
import cell1 from "@/assets/cell1.png";
import cell2 from "@/assets/cell2.png";
import cell3 from "@/assets/cell3.png";
import cell4 from "@/assets/cell4.png";
import cell5 from "@/assets/cell5.png";
import cell6 from "@/assets/cell6.png";
import cell7 from "@/assets/cell7.png";
import cell8 from "@/assets/cell8.png";
// import TestRandomProvider from "@/model/TestRandomProvider";
// import { WebBombikaViewModel } from "@/viewModel/webBombikaViewModel";
// let CellVievModel = new WebBombikaViewModel(new TestRandomProvider());
export default {
  data() {
    return {
      field: field,
      image: Image,
    };
  },
  props: {
    cell: Object,
  },
  components: {},
  methods: {
    changeImage() {
      if (this.cell.closed == true && this.cell.flag == false) {
        this.image = field;
      } else if (this.cell.flag && this.cell.closed) {
        this.image = flag;
      } else if (this.cell.closed == false) {
        if (!this.cell.bomb && this.cell.bombsAroundCount == 0) {
          this.image = openCell;
        } else if (!this.cell.bomb && this.cell.bombsAroundCount == 1) {
          this.image = cell1;
        } else if (!this.cell.bomb && this.cell.bombsAroundCount == 2) {
          this.image = cell2;
        } else if (!this.cell.bomb && this.cell.bombsAroundCount == 3) {
          this.image = cell3;
        } else if (!this.cell.bomb && this.cell.bombsAroundCount == 4) {
          this.image = cell4;
        } else if (!this.cell.bomb && this.cell.bombsAroundCount == 5) {
          this.image = cell5;
        } else if (!this.cell.bomb && this.cell.bombsAroundCount == 6) {
          this.image = cell6;
        } else if (!this.cell.bomb && this.cell.bombsAroundCount == 7) {
          this.image = cell7;
        } else if (!this.cell.bomb && this.cell.bombsAroundCount == 8) {
          this.image = cell8;
        } else if (this.cell.triggeredBomb) {
          this.image = triggeredBomb;
        } else if (this.cell.bomb == true && this.cell.triggeredBomb == false) {
          this.image = bomb;
        }
      }
      return this.image;
    },

    onClick() {
      console.log("click");
      this.$emit("openField");
      this.changeImage();
    },
    onRightClick() {
      this.$emit("rightClick");
      this.changeImage();
    },
  },
  emits: ["openField", "rightClick"],
  // watch: {
  //   "cell.closed": {},
  // },
};
</script>

<style>
.flex {
  display: flex;
}
</style>
