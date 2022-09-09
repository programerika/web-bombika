<template>
  <div class="container3">
    <h1>Game over</h1>
    <h2>You have won {{ score }} points</h2>
    <button @click="playAgain">Play again!</button>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },

  props: {
    score: Number,
  },

  components: {},
  emits: ["playAgain"],

  methods: {
    playAgain() {
      this.$emit("playAgain");
    },
  },
};
</script>

<style scoped>
button {
  background-color: aquamarine;
}

.container3 {
  text-align: center;
}
</style>
