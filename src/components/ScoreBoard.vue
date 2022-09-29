<template>
  <div>
    <v-table theme="dark" class="scoreBoardWidth">
      <thead>
        <tr>
          <th class="text-center">Rank</th>
          <th class="text-center">Username</th>
          <th class="text-center">Points</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(player, index) in topPlayers" :key="player">
          <td class="text-center">{{ index + 1 }}</td>
          <td class="text-center">{{ player.username }}</td>
          <td class="text-center">{{ player.score }}</td>
        </tr>
      </tbody>
    </v-table>
    <div v-show="currentPlayer">
      <v-card class="vCardStyle">
        Your username is: {{ currentPlayer.username }} and you have
        {{ currentPlayer.score }} points.
        <br />
        <v-btn color="error" class="ma-4" @click="deleteCurrentPlayer()"
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
    });
    // console.log(this.topPlayers);
    this.currentPlayer = this.getCurrentPlayer().then((response) => {
      this.currentPlayer = response;
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
.scoreBoardWidth {
  width: 50vh;
}

.vCardStyle {
  display: grid;
  align-content: center;
  margin-top: 30px;
  height: 10vh;
}
</style>
