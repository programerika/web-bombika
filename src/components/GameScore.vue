<template>
  <div class="container3">
    <h1>Game over</h1>
    <h2>You have won {{ score }} points</h2>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },

  props: {
    score: Number,
  },

  components: {},

  methods: {
    registracija() {
      console.log("Ulogovan si");
    },
  },
};
</script>

<style scoped>
button {
  background-color: aquamarine;
}

.container3 {
  text-align: center;
}
</style>
