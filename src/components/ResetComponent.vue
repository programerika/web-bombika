<template>
  <div class="flex">
    <button style="{{background-color: cyan;}}">
      <img @click="restartGame" class="restart" :src="restart" alt="restart" />
    </button>
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
      this.$emit("restart");
    },
  },
};
</script>

<style>
.flex {
  margin: auto;
}
</style>
