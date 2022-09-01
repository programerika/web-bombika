<template>
  <div class="flexic">
    <NumberOfFlagsComponent :numberOfFlags="numberOfFlags" />
    <ResetComponent @restart="restartGame" />
    <TimerComponent :gameStatus="isFinished" :timer="timer" @time="time" />
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
    restartGame: function () {
      this.$emit("restart");
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
  border-bottom: 2px solid black;
  background-color: cadetblue;
}
</style>
