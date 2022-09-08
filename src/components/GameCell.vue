<template>
  <div>
    <v-btn flat="true"
      ><img
        @click="flagSelector ? toggleFlag() : openField()"
        @contextmenu.prevent="toggleFlag"
        class="flex"
        :src="require('@/assets/' + cell)"
        alt="field"
      />
    </v-btn>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  props: {
    cell: String,
    flagSelector: Boolean,
  },
  components: {},
  methods: {
    openField() {
      this.$emit("openField");
    },
    toggleFlag() {
      this.$emit("toggleFlag");
    },
  },
  emits: ["openField", "toggleFlag"],
};
</script>

<style scoped>
.v-btn {
  width: 30px;
  min-width: 30px;
  height: 30px;
  min-height: 30px;
  padding: 0;
  background: transparent;
}
img {
  border-radius: 5px;
}
</style>
<!-- 
<img
  @click="onClick()"
  @contextmenu.prevent="onRightClick()"
  class="flex"
  :src="require('@/assets/' + cell)"
  alt="field"
/> -->
