<template>
  <div class="flexic">
    <ResetComponent @reset="resetuj()" />
    <NumberOfFlagsComponent :numberOfFlags="numberOfFlags" />

    <TimerComponent :gameStatus="isFinished" :timer="timer" @time="time()" />
    <HelpComponent />
  </div>
</template>
<script>
import NumberOfFlagsComponent from "./NumberOfFlagsComponent.vue";
import ResetComponent from "./ResetComponent.vue";
import TimerComponent from "./TimerComponent.vue";
import HelpComponent from "./HelpComponent.vue";

export default {
  props: {
    numberOfFlags: Number,
    isFinished: Boolean,
    timer: Number,
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
    time: function () {
      this.$emit("time");
    },
  },
};
</script>

<style>
.flexic {
  display: flex;
  align-items: left;
  border-bottom: 2px solid black;
  background-color: rgb(0, 181, 187);
}
</style>
