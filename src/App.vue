<template>
  <v-app class="background">
    <v-main>
      <div class="bombika">
        <GamePanel @finished="this.isFinished = $event" />
        <ScoreBoard :isFinished="isFinished" />
      </div>
    </v-main>
  </v-app>
</template>

<script>
import GamePanel from "./components/GamePanel.vue";
import ScoreBoard from "./components/ScoreBoard.vue";

export default {
  name: "App",

  components: {
    GamePanel,
    ScoreBoard,
  },

  data: () => ({ isFinished: false }),
};
</script>

<style>
.material-icons {
  font-family: "Material Icons";
  font-weight: normal;
  font-style: normal;
  font-size: 24px; /* Preferred icon size */
  display: inline-block;
  line-height: 1;
  text-transform: none;
  letter-spacing: normal;
  word-wrap: normal;
  white-space: nowrap;
  direction: ltr;

  /* Support for all WebKit browsers. */
  -webkit-font-smoothing: antialiased;
  /* Support for Safari and Chrome. */
  text-rendering: optimizeLegibility;

  /* Support for Firefox. */
  -moz-osx-font-smoothing: grayscale;

  /* Support for IE. */
  font-feature-settings: "liga";
}

.background {
  background-color: black;
  display: grid;
  place-items: center;
  justify-content: space-around;
}

.bombika {
  display: flex;
}

.pixeli {
  height: 20000px;
}

@media screen and (max-width: 600px) {
  .bombika {
    display: grid;
    margin-top: 10px;
  }
}
</style>
