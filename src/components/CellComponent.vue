<template>
  <div class="flex">
    <img
      @click="on_Click()"
      @contextmenu.prevent="on_right_click()"
      class="flex"
      :src="field"
      alt="field"
    />
  </div>
</template>
<script>
import field from "@/assets/grey-icon-0.png";
import fieldOpen from "@/assets/orangeHelp.png";
// import TestRandomProvider from "@/model/TestRandomProvider";
// import { WebBombikaViewModel } from "@/viewModel/webBombikaViewModel";
// let CellVievModel = new WebBombikaViewModel(new TestRandomProvider());
export default {
  setup() {
    return {
      field: field,
      fieldOpen: fieldOpen,
    };
  },
  props: {
    cell: Object,
  },
  components: {},
  methods: {
    on_Click() {
      console.log("click");
      this.$emit("clicked");
    },
    on_right_click() {
      this.$emit("rightClick");
      this.$forceUpdate;
    },
  },
};
</script>

<style>
.flex {
  display: flex;
}
</style>
