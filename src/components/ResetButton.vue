<template>
  <div class="flex">
    <v-btn
      class="ma-1"
      color="cyan"
      icon="mdi-restart"
      @click="restartGame"
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
