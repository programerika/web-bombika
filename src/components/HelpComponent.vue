<template>
  <div class="flex">
    <img class="flex" :src="help" alt="restart" />
  </div>
</template>

<script>
import help from "@/assets/help.png";
export default {
  setup() {
    return {
      help,
    };
  },
};
</script>

<style>
.imageStyle {
  display: flex;
}
</style>
