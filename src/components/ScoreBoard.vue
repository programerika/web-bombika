<template>
  <div class="boardDiv">
    <v-table theme="dark" class="scoreBoard" density="compact">
      <thead class="scoreBoardHeader">
        <tr>
          <th class="text-center text-center-header" id="rank">Rank</th>
          <th class="text-center text-center-header" id="rank">Player</th>
          <th class="text-center text-center-header" id="rank">Points</th>
        </tr>
      </thead>
      <tbody v-for="(player, index) in topPlayers" :key="player">
        <tr
          v-if="!scoreBoardViewModel.isLoading"
          :class="
            player.username === scoreBoardViewModel.getUsername()
              ? 'scoreBoardBodyCurrentPlayer'
              : 'scoreBoardBody'
          "
        >
          <td class="text-center">{{ index + 1 }}.</td>
          <td class="text-center">{{ player.username }}</td>
          <td class="text-center">{{ player.score }}</td>
        </tr>
      </tbody>
    </v-table>
    <p
      v-if="scoreBoardViewModel.displayErrorMessage"
      class="loadPlayersErrorMessage"
    >
      {{ scoreBoardViewModel.errorMessage }}
    </p>
    <div v-if="scoreBoardViewModel.isLoading" class="Loader">
      <v-progress-circular
        :size="50"
        color="#15b3a0"
        indeterminate
      ></v-progress-circular>
    </div>
    <div
      class="welcome"
      v-if="
        scoreBoardViewModel.showWelcome ||
        (scoreBoardViewModel.currentPlayer && !score)
      "
    >
      <p>
        Hi,
        <span class="scoreUnderTop10">{{
          scoreBoardViewModel.returnPlayerFromLocalStorage()
        }}</span
        >!🤗
      </p>
    </div>
    <div
      v-if="scoreBoardViewModel.currentPlayer && score"
      class="scoreAndDeleteScore"
    >
      <p v-if="!scoreBoardViewModel.isPlayerInTop10" class="scoreMessage">
        <span class="registeredPlayer">{{
          scoreBoardViewModel.currentPlayer.username
        }}</span>
        your score is <span class="scoreUnderTop10"> {{ score }} </span>.😎
      </p>
      <p v-if="scoreBoardViewModel.isPlayerInTop10" class="scoreMessage">
        You are in top 10 players,keep playing!😎
      </p>
      <v-btn
        class="deleteButton"
        color="#0c5e54"
        size="x-small"
        @click="deleteCurrentPlayer()"
        >Delete player!</v-btn
      >
    </div>
  </div>
</template>

<script>
import { ScoreBoardViewModel } from "@/viewModel/scoreBoardViewModel";
export default {
  data() {
    return {
      scoreBoardViewModel: new ScoreBoardViewModel(),
    };
  },
  mounted() {
    this.scoreBoardViewModel.refreshView();
  },
  computed: {
    topPlayers() {
      return this.scoreBoardViewModel.topPlayers;
    },
    score() {
      return this.scoreBoardViewModel.currentPlayer.score;
    },
  },
  props: { refreshScoreBoard: Number },
  methods: {
    async deleteCurrentPlayer() {
      await this.scoreBoardViewModel.deletePlayer();
    },
    async getCurrentPlayer() {
      await this.scoreBoardViewModel.getCurrentPlayer();
    },
  },
  watch: {
    refreshScoreBoard() {
      this.scoreBoardViewModel.refreshView();
    },
  },
};
</script>

<style scoped>
.welcome {
  display: grid;
  align-items: center;
  place-items: center;
  margin-top: 20px;
  height: 70px;
  padding: 10px;
  background-color: #15b3a0;
  color: solid black;
  border-radius: 4px;
}
#rank {
  font-size: large;
}
.scoreAndDeleteScore {
  display: grid;
  align-items: center;
  margin-top: 5px;
  height: 70px;
  background-color: #15b3a0;
  color: solid black;
  border-radius: 4px;
}
.scoreMessage {
  margin: auto;
  color: black;
  font-size: 15px;
  font-family: sans-serif;
}

.deleteButton {
  margin: auto;
  margin-right: 5px;
  margin-bottom: 5px;
  color: #1df5db;
}

.registeredPlayer {
  background-color: rgb(255, 165, 0);
  color: black;
  border-radius: 10px;
  padding: 5px;
  /* padding-left: 10px;
  padding-right: 10px; */
}

.scoreUnderTop10 {
  background-color: rgb(255, 165, 0);
  color: black;
  border-radius: 10px;
  padding: 3px;
}

.scoreBoardHeader {
  background-color: #15b3a0;
  color: black !important;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}
.Loader {
  height: 320px;
  background-color: black;
  width: 300px;
  display: grid;
  place-items: center;
}
.scoreBoardBody {
  /* background-color: #0c5e54; */
  color: white;
  background-color: black;
}

.loadPlayersErrorMessage {
  color: black;
  margin: auto;
  font-size: 18px;
  margin-top: 100px;
  background-color: #a84242;
  padding: 20px;
  border-radius: 4px;
}
.scoreBoardBodyCurrentPlayer {
  /* background-color: #0c5e54; */
  color: black;
  background-color: orange;
}

.scoreBoard {
  border-radius: 15px;
  /* border: 2px solid #15b3a0; */
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}
.boardDiv {
  width: 300px;
  margin-left: 20px;
}

.text-center-header {
  color: black !important;
  font-weight: bolder !important;
}

@media screen and (max-width: 800px) {
  .boardDiv {
    border-radius: 15px;
    width: 336px;
    margin-top: 10px;
    margin-left: 0px;
  }
}
.v-progress-circular {
  margin: 7rem;
  color: #15b3a0;
  /* height: 320px; */
}
</style>
