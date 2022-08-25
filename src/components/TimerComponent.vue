<template>
  <div class="flex">
    <h1 @mounted="setTime()">{{ state.count }}</h1>
  </div>
</template>
<script>
import { reactive } from "@vue/reactivity";
export default {
  data() {
    const state = reactive({ count: 0 });
    function increment() {
      state.count++;
    }

    function setTime() {
      while (this.gameStatus === false) {
        setInterval(() => {
          increment(), 1000;
        });
      }
    }
    return {
      state,
      increment,
      setTime,
    };
  },
  props: {
    gameStatus: Boolean,
  },
  components: {},
};
</script>
<style>
.flex {
  margin: auto;
}
</style>
