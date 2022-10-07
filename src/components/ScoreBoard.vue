<template>
  <div class="boardDiv">
    <v-table theme="dark" class="scoreBoard" density="compact">
      <thead class="scoreBoardHeader">
        <tr>
          <th class="text-center">Rank</th>
          <th class="text-center">Username</th>
          <th class="text-center">Points</th>
        </tr>
      </thead>
      <tbody v-for="(player, index) in topPlayers" :key="player">
        <tr
          v-if="player.username == scoreBoardViewModel.getUsername()"
          class="scoreBoardBodyCurrentPlayer"
        >
          <td class="text-center">{{ index + 1 }}</td>
          <td class="text-center">{{ player.username }}</td>
          <td class="text-center">{{ player.score }}</td>
        </tr>
        <tr
          v-else-if="player.username != scoreBoardViewModel.getUsername()"
          class="scoreBoardBody"
        >
          <td class="text-center">{{ index + 1 }}</td>
          <td class="text-center">{{ player.username }}</td>
          <td class="text-center">{{ player.score }}</td>
        </tr>
      </tbody>
    </v-table>
    <div v-if="isLoading" class="Loader">
      <v-progress-circular
        :size="50"
        color="#15b3a0"
        indeterminate
      ></v-progress-circular>
    </div>
    <div v-if="scoreBoardViewModel.currentPlayer" class="scoreAndDeleteScore">
      <p v-if="!scoreBoardViewModel.isPlayerInTop10" class="scoreMessage">
        {{ scoreBoardViewModel.currentPlayer.username }} you scored
        {{ scoreBoardViewModel.currentPlayer.score }} points.
      </p>
      <p v-if="scoreBoardViewModel.isPlayerInTop10" class="scoreMessage">
        You are already in top 10 players, keep playing!
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
import { ScoreBoardViewModel } from "@/viewModel/ScoreBoardViewModel";
export default {
  data() {
    return {
      isLoading: false,
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
  },
  props: { refreshScoreBoard: Boolean },
  methods: {
    async getTopPlayers() {
      this.isLoading = true;
      await this.scoreBoardViewModel.getTopPlayers();
      this.isLoading = false;
    },
    async deleteCurrentPlayer() {
      await this.scoreBoardViewModel.deletePlayer();
    },
    async getCurrentPlayer() {
      return await this.scoreBoardViewModel.getCurrentPlayer();
    },
    checkIfPlayerInScoreBoard() {
      this.isInTop10 = this.scoreBoardViewModel.checkIfPlayerIsInTop10();
      return this.isInTop10;
    },
  },
  watch: {
    refreshScoreBoard() {
      this.scoreBoardViewModel.refreshView();
      this.isInTop10 = this.scoreBoardViewModel.isPlayerInTop10;
    },
  },
};
</script>

<style scoped>
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
}

.deleteButton {
  margin: auto;
  margin-right: 5px;
  margin-bottom: 5px;
  color: #1df5db;
}
.scoreBoardHeader {
  background-color: #15b3a0;
  color: black;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}
.Loader {
  height: 320px;
  background-color: black;
  width: 300px;
  place-items: center;
}
.scoreBoardBody {
  /* background-color: #0c5e54; */
  color: #1df5db;
  background-color: black;
}
.scoreBoardBodyCurrentPlayer {
  /* background-color: #0c5e54; */
  color: black;
  background-color: gold;
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

@media screen and (max-width: 600px) {
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
