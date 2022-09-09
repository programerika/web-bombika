<template>
  <div class="container3">
    <h1>Game over</h1>
    <h2 v-show="score == 0">Better luck next time!</h2>
    <h2 v-show="score > 0">You won {{ score }} points!!!</h2>
    <br />
    <form>
      <input
        v-show="score > 0"
        type="text"
        class="username"
        id="username"
        placeholder="username"
        name="username"
        label="username"
        pattern="[a-zA-Z]{6}[0-9]{2}"
      /><br /><br />
    </form>
    <button @click="playAgain" color="#15b3a0">Play again!</button>
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
.v-text-field {
  width: 150px;
  height: 10px;
  margin: auto;
}

.username input {
  text-align: center;
}
button {
  background-color: aquamarine;
}

.container3 {
  text-align: center;
}

.username {
  border-radius: 5px;
  border: 1px solid black;
}
</style>
