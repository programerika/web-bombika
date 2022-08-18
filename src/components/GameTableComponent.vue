<template>
  <div v-for="i in 10" :key="i.index">
    <CellComponent />
  </div>
</template>
<script>
import CellComponent from "./CellComponent.vue";
export default {
  setup() {},
  components: { CellComponent },
};
</script>
