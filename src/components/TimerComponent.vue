<template>
  <div class="flex">
    <h1>⏱️{{ timer }}</h1>
  </div>
</template>
<script>
export default {
  setup() {
    function increment() {
      setInterval(() => {
        if (!this.gameStatus) {
          this.$emit("time");
        }
      }, 1000);
    }
    return {
      increment,
    };
  },
  props: {
    gameStatus: Boolean,
    timer: Number,
  },
  components: {},
  mounted() {
    this.increment();
  },
};
</script>
<style>
.flex {
  margin: auto;
}
</style>
