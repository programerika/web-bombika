<template>
  <div>
    <img @click="on_Click()" class="field" :src="slika" alt="field" />
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
    let slika = field;
    return {
      field: field,
      fieldOpen: fieldOpen,
      slika,
    };
  },
  props: {
    cell: Object,
  },
  components: {},
  methods: {
    on_Click() {
      this.slika = fieldOpen;
      console.log("click");
      this.$emit("clicked");
    },
  },
};
</script>
