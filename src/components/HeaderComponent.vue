<template>
  <div class="flex">
    <NumberOfFlagsComponent />
    <ResetComponent />
    <TimerComponent />
  </div>
</template>
<script>
//import TestRandomProvider from "@/model/TestRandomProvider";
//import { WebBombikaViewModel } from "@/viewModel/webBombikaViewModel";
import NumberOfFlagsComponent from "./NumberOfFlagsComponent.vue";
import ResetComponent from "./ResetComponent.vue";
import TimerComponent from "./TimerComponent.vue";

//const webBombikaViewModel = new WebBombikaViewModel(new TestRandomProvider());

export default {
  setup() {},
  components: { NumberOfFlagsComponent, ResetComponent, TimerComponent },
};
</script>

<style>
.flex {
  display: flex;
  border: 2px solid black;
}
</style>
