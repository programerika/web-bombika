<template>
  <div class="flex">
    <button>
      <img class="flex" :src="help" alt="restart" />
    </button>
  </div>
</template>

<script>
import help from "@/assets/help.png";
export default {
  data() {
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
