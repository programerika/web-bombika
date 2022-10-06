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
    <div v-if="isLoading" class="Loader">
      <v-progress-circular
        :size="50"
        color="#15b3a0"
        indeterminate
      ></v-progress-circular>
    </div>
    <div v-if="currentPlayer" class="scoreAndDeleteScore">
      <p class="scoreMessage">
        {{ currentPlayer.username }} you scored
        {{ currentPlayer.score }} points.
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
export default {
  data() {
    return {
      topPlayers: [],
      currentPlayer: null,
      isLoading: true,
    };
  },
  props: { refreshScoreBoard: Boolean, scoreViewModel: Object },
  mounted() {
    this.refresh();
  },
  methods: {
    async getTopPlayers() {
      this.isLoading = true;
      let players = await this.scoreViewModel.getTopPlayers();
      this.isLoading = false;
      return players;
    },
    async deleteCurrentPlayer() {
      await this.scoreViewModel.deletePlayer();
      this.refresh();
    },
    async getCurrentPlayer() {
      return await this.scoreViewModel.getCurrentPlayer();
    },
    refresh() {
      this.topPlayers = this.getTopPlayers().then((response) => {
        this.topPlayers = response;
        this.$forceUpdate();
      });
      this.getCurrentPlayer().then((response) => {
        this.currentPlayer = response;
        this.$forceUpdate();
      });
    },
  },
  watch: {
    refreshScoreBoard() {
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
