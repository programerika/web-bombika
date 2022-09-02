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
  background-color: #15b3a0;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  justify-content: space-between;
  align-items: center;
}
</style>
