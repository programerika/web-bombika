<template>
  <div class="flex">
    <v-btn
      v-bind="props"
      class="ma-1"
      color="cyan"
      icon="mdi-restart"
      @click="restartGame()"
      :src="restart"
      alt="restart"
      size="small"
    >
    </v-btn>
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

<!-- <button style="{{background-color: cyan;}}">
      <img
        @click="restartGame()"
        class="restart"
        :src="restart"
        alt="restart"
      />
    </button> -->
