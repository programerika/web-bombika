<template>
  <div class="container3">
    <h1>Game over</h1>
    <br v-show="score === 0" />
    <h2 v-show="score == 0">Better luck next time!</h2>
    <h2 v-show="score > 0">You won {{ score }} points!!!</h2>
    <br />
    <form>
      <input
        v-show="score > 0"
        type="text"
        class="username input"
        id="username"
        placeholder="Username - eg. MyName12"
        name="username"
        label="username"
        pattern="[a-zA-Z]{6}[0-9]{2}"
      />
      <p v-show="score > 0">Please enter a username</p>
      <br />
    </form>
    <!-- <button @click="playAgain" color="#15b3a0">Play again!</button> -->
    <v-row align="center" justify="space-around">
      <v-btn @click="playAgain" color="#BEBEBE">Play again!</v-btn>
      <v-btn v-show="score > 0" @click="saveScore" color="#BEBEBE"
        >Save score</v-btn
      >
    </v-row>
    <br />
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
    saveScore() {
      //TODO
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
