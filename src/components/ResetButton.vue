<template>
  <div>
    <v-btn
      class="ma-1"
      color="#1df5db"
      icon="mdi-restart"
      @click="restartGame"
      alt="restart"
      size="large"
    >
    </v-btn>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  components: {},
  methods: {
    restartGame: function () {
      this.$emit("restart");
    },
  },
};
</script>
