<template>
  <v-app class="background">
    <v-main>
      <GamePanel />
    </v-main>
  </v-app>
</template>

<script>
import GamePanel from "./components/GamePanel.vue";

export default {
  name: "App",

  components: {
    GamePanel,
  },

  data: () => ({}),
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
}
</style>
