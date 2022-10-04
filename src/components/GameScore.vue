<template>
  <div class="container">
    <ConfettiExplosion
      v-show="score > 0"
      :force="1"
      :duration="4000"
      :particleCount="250"
    />
    <v-card elevation="12" class="scoreCard" width="320px" height="230px">
      <v-card-title>GAME OVER</v-card-title>
      <h2>{{ message }}</h2>
      <br />
      <input
        @input="validateUsername"
        v-model="username"
        v-if="score > 0 && empty"
        maxLength="8"
        type="text"
        class="username"
        id="username"
        placeholder="Username - eg. MyName12"
        name="username"
      />
      <p
        class="enterUserName"
        :style="{ color: usernameMessageColour }"
        v-show="score > 0 && empty"
      >
        {{ usernameMessage }}
      </p>
      <br />
      <v-row align="center" justify="space-around">
        <v-btn @click="playAgain" color="#BEBEBE">Play again!</v-btn>
        <v-btn
          v-if="score > 0 && empty"
          :disabled="saveButtonDisabled"
          @click="savePlayerAndScore"
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
import { ScoreViewModel } from "@/viewModel/ScoreViewModel";

export default {
  data() {
    return {
      scoreViewModel: {},
      username: "",
      saveButtonDisabled: false,
      usernameMessage: "Please enter a username!",
      message: `You won ${this.score} points!!!🤩`,
      details: {},
      usernameMessageColour: "black",
      empty: true,
    };
  },
  props: {
    score: Number,
  },
  mounted() {
    this.scoreViewModel = new ScoreViewModel();

    this.username = this.scoreViewModel.getUsername() || "";

    this.scoreViewModel.addScore(this.score);

    if (this.score < 1) {
      this.usernameMessage = "";
      this.message = "Sorry! Better luck next time!🥺";
    }
    this.isEmpty();
  },
  components: { ConfettiExplosion },
  emits: ["restart:game", "saved:score"],
  methods: {
    playAgain() {
      this.$emit("restart:game");
    },
    async savePlayerAndScore() {
      this.details = {
        ...this.details,
        ...(await this.scoreViewModel.savePlayerAndScore(
          this.username,
          this.score
        )),
      };
      this.setScoreDetails(this.details);
      this.$emit("saved:score");
    },

    setScoreDetails(details) {
      this.usernameMessage = details.usernameMessage;
      this.message = details.message;
      this.saveButtonDisabled = details.saveButtonDisabled;
      this.usernameMessageColour = details.usernameMessageColour;
    },
    isEmpty() {
      this.empty = !this.scoreViewModel.isPlayerRegistered();
    },
    validateUsername() {
      this.details = {
        ...this.details,
        ...this.scoreViewModel.validateUsername(this.username, this.score),
      };
      this.setScoreDetails(this.details);
    },
  },
};
</script>
<style scoped>
.container {
  text-align: center;
  /* margin-top: 43px; */
  background-color: rgba(29, 245, 219, 0.7);
  border-width: 7px 7px 7px 7px;
  border-radius: 15px;
}
.scoreCard {
  background-color: rgba(29, 245, 219, 0.7);
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
  font-size: 15px;
}
</style>
