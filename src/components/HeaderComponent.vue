<template>
  <div class="flex">
    <NumberOfFlagsComponent :numberOfFlags="igra.player.numberOfBombs" />
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
    igra: Object,
  },
  components: { NumberOfFlagsComponent, ResetComponent, TimerComponent },
  methods: {
    resetuj: function () {
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
