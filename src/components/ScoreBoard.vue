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
      <tbody>
        <tr
          v-for="(player, index) in topPlayers"
          :key="player"
          class="scoreBoardBody"
        >
          <td class="text-center">{{ index + 1 }}</td>
          <td class="text-center">{{ player.username }}</td>
          <td class="text-center">{{ player.score }}</td>
        </tr>
      </tbody>
    </v-table>
    <div v-if="currentPlayer" class="scoreAndDeleteScore">
      <p class="scoreMessage">
        {{ currentPlayer.username }} you scored
        {{ currentPlayer.score }} points.
      </p>
      <v-btn
        class="deleteButton"
        color="#0c5e54"
        size="small"
        @click="deleteCurrentPlayer()"
        >Delete your score</v-btn
      >
    </div>
  </div>
</template>

<script>
import { ScoreViewModel } from "@/viewModel/ScoreViewModel";
export default {
  data() {
    return {
      scoreViewModel: {},
      topPlayers: [],
      currentPlayer: {},
    };
  },
  props: { isFinished: Boolean },
  mounted() {
    this.scoreViewModel = new ScoreViewModel();
    this.refresh();
  },
  methods: {
    async getTopPlayers() {
      return await this.scoreViewModel.getTopPlayers();
    },
    async deleteCurrentPlayer() {
      return await this.scoreViewModel.deletePlayer();
    },
    async getCurrentPlayer() {
      return await this.scoreViewModel.getCurrentPlayer();
    },
    refresh() {
      this.topPlayers = this.getTopPlayers().then((response) => {
        this.topPlayers = response;
        this.$forceUpdate();
      });
      // console.log(this.topPlayers);
      this.currentPlayer = this.getCurrentPlayer().then((response) => {
        this.currentPlayer = response;
        this.$forceUpdate();
        console.log(this.currentPlayer);
      });
    },
  },
  watch: {
    isFinished() {
      this.refresh();
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
  color: white;
}
.scoreBoardHeader {
  background-color: #15b3a0;
  color: black;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}

.scoreBoardBody {
  background-color: #0c5e54;
  color: #1df5db;
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
</style>
