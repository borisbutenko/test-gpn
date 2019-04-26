<template>
<transition name="modal">
  <div class="wrapper">

    <div class="modal">

      <slot/>

    </div>

  </div>
</transition>
</template>

<script>
export default {
  name: 'Modal'
}
</script>

<style lang="scss" scoped>
.wrapper {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  width: 100vw;
  height: 100vh;
  padding: 0 10rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(map_get($colors, black), .4);
}

.modal {
  margin-right: 20rem;
  background-color: #f5f5f5;
}
</style>
