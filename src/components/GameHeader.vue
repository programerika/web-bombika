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

  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  justify-content: space-between;
  align-items: center;
}
</style>
