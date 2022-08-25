<template>
  <div class="flex">
    <img @click="restartGame()" class="restart" :src="restart" alt="restart" />
  </div>
</template>
<script>
import restart from "@/assets/restart.png";
export default {
  data() {
    return {
      restart: restart,
    };
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
