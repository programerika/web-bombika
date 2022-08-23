<template>
  <div class="flexic">
    <NumberOfFlagsComponent :numberOfFlags="igra.player.numberOfBombs" />
    <ResetComponent @reset="resetuj()" />
    <TimerComponent />
    <HelpComponent />
  </div>
</template>
<script>
import NumberOfFlagsComponent from "./NumberOfFlagsComponent.vue";
import ResetComponent from "./ResetComponent.vue";
import TimerComponent from "./TimerComponent.vue";
import HelpComponent from "./HelpComponent.vue";

export default {
  setup() {},
  props: {
    igra: Object,
  },
  components: {
    NumberOfFlagsComponent,
    ResetComponent,
    TimerComponent,
    HelpComponent,
  },
  methods: {
    resetuj: function () {
      this.$emit("reset");
    },
  },
};
</script>

<style>
.flexic {
  display: flex;
  border-bottom: 2px solid black;
  background-color: burlywood;
}
</style>
