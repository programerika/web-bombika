<template>
  <div class="container">
    <HeaderComponent />
    <GameTableComponent />
  </div>
</template>
<script>
import HeaderComponent from "./HeaderComponent.vue";
import GameTableComponent from "./GameTableComponent.vue";
export default {
  setup() {},
  components: { HeaderComponent, GameTableComponent },
};
</script>
