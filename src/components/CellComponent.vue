<template>
  <div class="flex">
    <img @click="on_Click()" class="flex" :src="field" alt="field" />
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
  },
};
</script>

<style>
.flex {
  display: flex;
}
</style>
