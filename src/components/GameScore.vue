<template>
  <div class="container3">
    <p>Kraj igre! Osvojili ste {{ score }} poena</p>

    <p>Registruj se</p>

    <button @click="registracija">Registruj se</button>
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

.container {
  border: 2px solid #0c5e54;

  border-radius: 5px;

  background-color: #0c5e54;
}
</style>
