<template>
  <div>
    <h1 class="timeComponent">⏱️{{ timer.timeCounter }}</h1>
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
<style scoped>
.timeComponent {
  font-size: 32px;
  font-family: sans-serif;
  margin: 0px;
  font-weight: bold;
}
</style>
