<template>
  <div class="container">
    <ConfettiExplosion v-show="score > 0 && isFinished" />
    <v-card elevation="12" class="scoreCard" width="320px" height="230px">
      <v-card-title>GAME OVER</v-card-title>
      <h2>{{ message }}</h2>
      <br />
      <input
        v-model="username"
        v-show="score > 0"
        maxLength="8"
        :disabled="saveButtonDisabled"
        type="text"
        class="username"
        id="username"
        placeholder="Username - eg. MyName12"
        name="username"
      />
      <p class="enterUserName">
        {{ usernameMessage }}
      </p>
      <br />
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
import ConfettiExplosion from "vue-confetti-explosion";

export default {
  data() {
    return {
      username: "",
      allscore: localStorage.getItem("allscore"),
      saveButtonDisabled: false,
      usernameMessage: "Please enter a username!",
      message: `You won ${this.score} points!🤩`,
    };
  },
  props: {
    score: Number,
    isFinished: Boolean,
  },
  mounted() {
    if (localStorage.username) {
      this.username = localStorage.username;
    }
    if (localStorage.allscore) {
      this.allscore = localStorage.allscore;
    }
    if (this.isFinished && this.score > 0 && this.allscore !== null) {
      this.saveScore();
      this.usernameMessage = "";
    }
    if (this.isFinished && this.score < 1) {
      this.usernameMessage = "";
      this.message = "Sorry! Better luck next time!🥺";
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
      let userInput = new RegExp("^[^-\\s][a-zA-Z0-9]{3,5}[0-9]{2}$");
      if (!userInput.test(this.username) && this.allscore === null) {
        this.usernameMessage = "Incorrect input, eg. MyName12";
      } else {
        this.message = `You won ${this.score} points!🤩`;
        localStorage.username = this.username;
        let allscore = localStorage.getItem("allscore");

        if (allscore == null) {
          allscore = 0;
        }
        this.allscore = parseInt(allscore) + parseInt(this.score);
        localStorage.allscore = this.allscore;
        this.saveButtonDisabled = true;
      }
    },
  },
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
  text-align: center;
  background-color: rgba(114, 166, 184, 0.8);
}
.enterUserName {
  font-size: 12px;
}
</style>
