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
    <div v-if="currentPlayer">
      <v-card class="vCardStyle">
        Your username is: {{ currentPlayer.username }} and you have
        {{ currentPlayer.score }} points.
        <br />
        <v-btn color="#0c5e54" class="ma-4" @click="deleteCurrentPlayer()"
          >Delete your score</v-btn
        >
      </v-card>
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
      currentPlayer: Object,
    };
  },
  mounted() {
    this.scoreViewModel = new ScoreViewModel();
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
  },
};
</script>

<style scoped>
.vCardStyle {
  display: grid;
  align-content: center;
  margin-top: 15px;
  height: 10vh;
  background-color: #15b3a0;
  color: solid black;
  height: 13vh;

  border-radius: 15px;
}

.scoreBoardHeader {
  background-color: #15b3a0;
  color: black;
}

.scoreBoardBody {
  background-color: #0c5e54;
  color: #1df5db;
}

.ma-4 {
  color: white;
}

.scoreBoard {
  border-radius: 15px;
  border: 2px solid #15b3a0;
}
.boardDiv {
  width: 30vh;
  margin-left: 20px;
}

@media screen and (max-width: 600px) {
  .boardDiv {
    border-radius: 15px;
    width: 53vh;
    margin-top: 10px;
  }
}
</style>
