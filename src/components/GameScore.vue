<template>
  <div class="container">
    <v-card elevation="12" class="scoreCard" width="320px" height="230px">
      <h1>Game over</h1>
      <br v-show="score === 0" />
      <h2 v-show="score == 0">Better luck next time!</h2>
      <h2 v-show="score > 0">You won {{ score }} points!!!</h2>
      <p v-show="allscore > 0">Total score {{ allscore }}</p>
      <br v-show="allscore == null" />
      <form>
        <input
          v-model="username"
          v-show="score > 0"
          type="text"
          class="username"
          id="username"
          placeholder="Username - eg. MyName12"
          name="username"
          label="username"
          pattern="^[^-s][a-zA-Z0-9]{4,6}[0-9]{2}$"
        />
        <p class="enterUserName" v-show="score > 0">Please enter a username</p>
        <br />
      </form>
      <v-row align="center" justify="space-around">
        <v-btn @click="playAgain" color="#BEBEBE">Play again!</v-btn>
        <v-btn
          v-show="score > 0 && allscore == null"
          :disabled="saveButtonDisabled"
          @click="saveScore"
          color="#BEBEBE"
          >Save score</v-btn
        >
      </v-row>
      <br />
    </v-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      username: "",
      allscore: localStorage.getItem("allscore"),
      saveButtonDisabled: false,
    };
  },
  props: {
    score: Number,
    isFinished: Boolean,
  },
  mounted() {
    if (localStorage.username) {
      this.username = localStorage.username;
      if (this.isFinished) {
        this.saveScore();
      }
    }
    if (localStorage.allscore) {
      this.allscore = localStorage.allscore;
    }
  },
  components: {},
  emits: ["playAgain"],
  methods: {
    playAgain() {
      this.$emit("playAgain");
    },
    saveScore() {
      //TODO refactor na malo bolji nacin
      console.log("saveScore");
      localStorage.username = this.username;
      let allscore = localStorage.getItem("allscore");

      if (allscore == null) {
        allscore = 0;
      }
      this.allscore = parseInt(allscore) + parseInt(this.score);
      localStorage.allscore = this.allscore;
      this.saveButtonDisabled = true;
    },
  },
  watch: {},
};
</script>
<style scoped>
.container {
  text-align: center;
}
.scoreCard {
  background-color: rgb(29, 245, 219, 0.8);
  border-width: 10px 10px 10px 10px;
  border-radius: 20px;
}
.username {
  border-radius: 4px;
  border: 1px solid black;
  width: 220px;
}
.enterUserName {
  font-size: 12px;
}
</style>
