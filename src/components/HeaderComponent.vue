<template>
  <div class="flex">
    <NumberOfFlagsComponent :numberOfFlags="numberOfFlags" />
    <ResetComponent @reset="resetuj()" />
    <TimerComponent />
  </div>
</template>
<script>
import NumberOfFlagsComponent from "./NumberOfFlagsComponent.vue";
import ResetComponent from "./ResetComponent.vue";
import TimerComponent from "./TimerComponent.vue";

export default {
  setup() {},
  props: {
    numberOfFlags: Number,
  },
  components: { NumberOfFlagsComponent, ResetComponent, TimerComponent },
  methods: {
    resetuj: function () {
      //webBombikaViewModel.newGame();
      this.$emit("reset");
    },
  },
};
</script>

<style>
.flex {
  display: flex;
  border: 2px solid black;
}
</style>
