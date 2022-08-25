<template>
  <div class="flex">
    <h1>{{ numberOfFlags }}</h1>
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

<style>
.flex {
  margin: auto;
}
</style>
