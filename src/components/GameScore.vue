<template>
  <div class="scoreContainer">
    <ConfettiExplosion
      v-show="score > 0"
      :force="1"
      :duration="4000"
      :particleCount="250"
    />
    <v-card elevation="12" class="scoreCard" width="320px" height="230px">
      <v-card-title>GAME OVER</v-card-title>
      <h2>{{ scoreViewModel.gameOverMessage }}</h2>
      <br />

      <v-text-field
        v-if="scoreViewModel.showRegistrationForm"
        label="Username"
        class="usernameTextField"
        v-model="username"
        @input="validateUsername"
        placeholder="Username - eg.MyName12"
        counter="8"
        max-length="8"
        :rules="inputRules"
        :disabled="scoreViewModel.inputUsernameDisabled"
        :error-message="scoreViewModel.usernameMessage"
        dense="true"
        outlined
        compact
      ></v-text-field>
      <br />
      <v-row align="center" justify="space-around">
        <v-btn @click="playAgain" color="#BEBEBE">Play again!</v-btn>
        <v-btn
          v-if="score > 0 && scoreViewModel.showRegistrationForm"
          :disabled="scoreViewModel.saveButtonDisabled"
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
import { ScoreViewModel } from "@/viewModel/ScoreViewModel";
import ConfettiExplosion from "vue-confetti-explosion";

export default {
  data() {
    return {
      inputRules: [
        (v) => v.length >= 6 || "Minimum length is 6 characters",
        (v) => v.length <= 8 || "Maximum length is 8 characters",
      ],
      isRegistered: false,
      username: "",
      scoreViewModel: new ScoreViewModel(),
    };
  },
  props: {
    score: Number,
    isFinished: Boolean,
  },
  mounted() {
    this.scoreViewModel.initialView(this.score);
  },
  components: { ConfettiExplosion },
  emits: ["restart:game", "saved:score"],
  methods: {
    playAgain() {
      this.$emit("restart:game");
    },
    async savePlayerAndScore() {
      await this.scoreViewModel.savePlayerAndScore(this.username, this.score);
      this.$emit("saved:score");
    },
    validateUsername() {
      this.scoreViewModel.validateUsername(this.username, this.score);
    },
  },
};
</script>
<style scoped>
.scoreContainer {
  text-align: center;
  /* margin-top: 43px; */
  background-color: rgba(29, 245, 219, 0.7);
  border-width: 7px 7px 7px 7px;
  border-radius: 15px;
}
.scoreCard {
  background-color: rgba(29, 245, 219, 0.7);
  border-width: 7px 7px 7px 7px;
  border-radius: 30px;
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
