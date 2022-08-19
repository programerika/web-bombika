<template>
  <div class="container">
    <HeaderComponent />
    <GameTableComponent />
  </div>
</template>
<script>
import HeaderComponent from "./HeaderComponent.vue";
import GameTableComponent from "./GameTableComponent.vue";
// import { WebBombikaViewModel } from "@/viewModel/webBombikaViewModel";
// import TestRandomProvider from "@/model/TestRandomProvider";
// const wbvm = new WebBombikaViewModel(new TestRandomProvider());

export default {
  setup() {
    return {
      // wbvm: wbvm,
    };
  },
  props: {
    igra: Object,
  },
  methods: {
    napraviIgru: function () {
      this.igra.newGame();
    },
  },
  components: { HeaderComponent, GameTableComponent },
};
</script>
<style scoped>
.flex {
  display: flex;
}
</style>
