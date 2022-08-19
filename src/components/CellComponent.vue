<template>
  <div>
    <img @click="logujField" class="field" :src="field" alt="field" />
  </div>
</template>
<script>
import field from "@/assets/grey-icon-0.png";

export default {
  setup() {
    return {
      field: field,
    };
  },
  components: {},
  methods: {
    logujField: function () {
      console.log("polje");
    },
  },
};
</script>
