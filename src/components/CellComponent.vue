<template>
  <div class="flex">
    <img
      @click="onClick"
      @contextmenu.prevent="onRightClick"
      class="flex"
      :src="require('@/assets/' + cell)"
      alt="field"
    />
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  props: {
    cell: String,
  },
  components: {},
  methods: {
    onClick() {
      console.log("click");
      this.$emit("openField");
    },
    onRightClick() {
      this.$emit("toggleFlag");
    },
  },
  emits: ["openField", "toggleFlag"],
};
</script>

<style>
.flex {
  display: flex;
}
</style>
