<template>
  <div id="1"><GameComponent /></div>
</template>

<script>
import GameComponent from "./components/GameComponent.vue";

export default {
  name: "App",
  components: { GameComponent },
  methods: {},
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
