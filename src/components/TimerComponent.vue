<template>
  <div class="flex">
    <h1>⏱️ {{ timer.timeCounter }}</h1>
  </div>
</template>
<script>
import { reactive } from "@vue/reactivity";
export default {
  setup() {
    let timer = reactive({ timeCounter: 0 });
    function increment() {
      setInterval(() => {
        if (!this.gameStatus) {
          timer.timeCounter++;
        }
      }, 1000);
    }
    return {
      increment,
      timer,
    };
  },
  props: {
    gameStatus: Boolean,
    startTime: Number,
  },
  components: {},
  mounted() {
    this.increment();
  },
  watch: {
    startTime() {
      this.timer.timeCounter = 0;
    },
  },
};
</script>
