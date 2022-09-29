<template>
  <div>
    <v-table theme="dark">
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
  </div>
</template>

<script>
import { ScoreViewModel } from "@/viewModel/ScoreViewModel";
export default {
  data() {
    return {
      scoreViewModel: {},
      topPlayers: [],
    };
  },
  mounted() {
    this.scoreViewModel = new ScoreViewModel();
    this.topPlayers = this.getTopPlayers().then((response) => {
      this.topPlayers = response;
      console.log(this.topPlayers);
    });
    // console.log(this.topPlayers);
  },
  methods: {
    async getTopPlayers() {
      return await this.scoreViewModel.getTopPlayers();
    },
  },
};
</script>

<style scoped></style>
