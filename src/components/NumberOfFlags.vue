<template>
  <div>
    <h1 class="numberOfFlags">🚩{{ numberOfFlags }}</h1>
  </div>
</template>
<script>
export default {
  props: {
    numberOfFlags: Number,
  },

  components: {},
};
</script>

<style scoped>
.numberOfFlags {
  font-size: 2em;
  margin: 0px;
  font-weight: bold;
}
</style>
