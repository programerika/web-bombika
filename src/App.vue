<template>
  <v-app>
    <v-main>
      <GameComponent />
    </v-main>
  </v-app>
</template>

<script>
import GameComponent from "./components/GameComponent.vue";

export default {
  name: "App",

  components: {
    GameComponent,
  },

  data: () => ({
    //
  }),
};
</script>
