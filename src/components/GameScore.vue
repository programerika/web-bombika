<template>
  <div class="scoreContainer">
    <ConfettiExplosion
      v-show="score > 0"
      :force="1"
      :duration="4000"
      :particleCount="250"
    />
    <v-card elevation="12" class="scoreCard" width="320px" height="260px">
      <v-card-title>GAME OVER</v-card-title>
      <h2 class="gameMessage">{{ scoreViewModel.gameOverMessage }}</h2>
      <br />

      <v-text-field
        v-if="score > 0 && scoreViewModel.showRegistrationForm"
        label="Username"
        class="usernameTextField"
        v-model="username"
        @input="usernameValidation"
        placeholder="eg.MyName12"
        :disabled="scoreViewModel.inputUsernameDisabled"
        :error-messages="usernameValidationMessage"
        hint="Format(4-6 letters/numbers & 2 numbers)."
        outlined
      ></v-text-field>
      <br />
      <v-row align="center" justify="space-around">
        <v-btn @click="playAgain" color="#BEBEBE">Play again!</v-btn>
        <v-btn
          v-if="score > 0 && scoreViewModel.showRegistrationForm"
          :disabled="scoreViewModel.saveButtonDisabled"
          @click="savePlayerAndScore"
          color="#BEBEBE"
          >{{ scoreViewModel.saveButtonText }}</v-btn
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
      isRegistered: false,
      username: "",
    };
  },
  props: {
    score: Number,
    isFinished: Boolean,
    scoreViewModel: Object,
  },
  mounted() {
    this.scoreViewModel.initializeView(this.score);
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
    usernameValidation() {
      this.scoreViewModel.usernameValidation(this.username, this.score);
    },
  },
  computed: {
    usernameValidationMessage() {
      if (!this.scoreViewModel.isUsernameValid) {
        return [this.scoreViewModel.usernameMessage];
      }
      return undefined;
    },
  },
};
</script>
<style scoped>
.gameMessage {
  font-size: 24px;
  font-weight: bold;
  margin: 0px;
}
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
</style>
