<template>
  <div class="container">
    <ConfettiExplosion v-show="score > 0 && isFinished" />
    <v-card elevation="12" class="scoreCard" width="320px" height="230px">
      <v-card-title>Game over</v-card-title>
      <br v-show="score === 0" />
      <h2 v-show="score == 0">Better luck next time!</h2>
      <h2 v-show="score > 0">You won {{ score }} points!!!</h2>
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
      <!-- <button @click="playAgain" color="#15b3a0">Play again!</button> -->
      <v-row align="center" justify="space-around">
        <!-- <v-btn @click="playAgain" color="#0c5e54">Play again!</v-btn> -->
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
import ConfettiExplosion from "vue-confetti-explosion";
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
  components: { ConfettiExplosion },
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
  margin-top: 43px;
}
.scoreCard {
  background-color: rgb(29, 245, 219, 0.8);
  border-width: 7px 7px 7px 7px;
  border-radius: 15px;
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
