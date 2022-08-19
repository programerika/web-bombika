<template>
  <div>
    <img @click="reset" class="restart" :src="restart" alt="restart" />
  </div>
</template>
<script>
import restart from "@/assets/restartGreenBlue.png";
export default {
  setup() {
    return {
      restart: restart,
    };
  },
  components: {},
  methods: {
    reset: function () {
      console.log("reset");
    },
  },
};
</script>
