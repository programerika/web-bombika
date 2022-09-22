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
          @click="save(username, score, allscore)"
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
import { StorageService } from "@/services/StorageService";
import { ScoreViewModel } from "@/viewModel/ScoreViewModel";
let storage = new StorageService();
export default {
  data() {
    return {
      scoreViewModel: {},
      storage: storage,
      username: "",
      allscore: storage.getItem("allscore"),
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
    this.scoreViewModel = new ScoreViewModel();

    if (storage.getItem("username")) {
      this.username = storage.getItem("username");
    }

    if (storage.getItem("allscore")) {
      this.allscore = storage.getItem("allscore");
    }

    if (
      this.isFinished &&
      this.score > 0 &&
      !storage.isItemInStorageEmpty("username")
    ) {
      this.save(this.username, this.score, this.allscore);
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
    save(username, score, allscore) {
      this.scoreViewModel.save(username, score, allscore);
      console.log(username, score, allscore);
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
