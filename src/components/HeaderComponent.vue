<template>
  <div class="flexic">
    <slot></slot>
  </div>
</template>
<script>
export default {};
</script>

<style>
.flexic {
  display: flex;
  border-bottom: 2px solid black;
  background-color: rgb(0, 181, 187);
  border-radius: 10pt;
  justify-content: space-between;
}
</style>
