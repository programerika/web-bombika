<template>
  <div class="flex">
    <img @click="restartGame()" class="restart" :src="restart" alt="restart" />
  </div>
</template>
<script>
import restart from "@/assets/restart.png";
export default {
  setup() {
    return {
      restart: restart,
    };
  },
  props: {
    reset: Object,
  },
  components: {},
  methods: {
    restartGame: function () {
      this.$emit("reset");
    },
  },
};
</script>

<style>
.flex {
  margin: auto;
}
</style>
