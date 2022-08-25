<template>
  <div class="flex">
    <button style="{{background-color: cyan;}}">
      <img
        @click="restartGame()"
        class="restart"
        :src="restart"
        alt="restart"
      />
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
  props: {
    timer: Number,
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
