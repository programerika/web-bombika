<template>
  <div class="container">
    <ConfettiExplosion
      v-show="score > 0 && isFinished"
      :force="1"
      :duration="4000"
      :particleCount="250"
    />
    <v-card elevation="12" class="scoreCard" width="320px" height="230px">
      <v-card-title>GAME OVER</v-card-title>
      <h2>{{ message }}</h2>
      <br />
      <input
        @input="onInputChange"
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
    isFinished: Boolean,
  },
  mounted() {
    this.scoreViewModel = new ScoreViewModel();

    if (this.scoreViewModel.getItemInStorage()) {
      this.username = this.scoreViewModel.getItemInStorage();
    }

    if (this.isFinished && !this.scoreViewModel.isStorageEmpty()) {
      this.scoreViewModel.saveScoreIfPlayerIsAlreadyRegistered(this.score);
    }
    if (this.isFinished && this.score < 1) {
      this.usernameMessage = "";
      this.message = "Sorry! Better luck next time!🥺";
    }
    this.isEmpty();
  },
  components: { ConfettiExplosion },
  emits: ["playAgain"],
  methods: {
    playAgain() {
      this.$emit("playAgain");
    },
    async saveScore() {
      this.details = {
        ...this.details,
        ...(await this.scoreViewModel.saveScore(this.username, this.score)),
      };
      this.setScoreDetails(this.details);
    },

    setScoreDetails(details) {
      this.usernameMessage = details.usernameMessage;
      this.message = details.message;
      this.saveButtonDisabled = details.saveButtonDisabled;
      this.usernameMessageColour = details.usernameMessageColour;
    },
    isEmpty() {
      this.empty = this.scoreViewModel.isStorageEmpty();
    },
    onInputChange() {
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
  margin-top: 43px;
}
.scoreCard {
  background-color: rgba(29, 245, 219, 0.8);
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
