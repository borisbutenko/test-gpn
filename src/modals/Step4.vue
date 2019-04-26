<template>
<form class="modal-wrapper">

  <header class="modal-header">
    <h2 class="modal-title t-center">Спасибо!</h2>
  </header>

  <footer class="modal-footer">
    <base-button @click="$router.push({ name: 'index' })">Закрыть</base-button>
  </footer>

</form>
</template>

<script>
import BaseButton from '@/components/BaseButton'

export default {
  name: 'ModalStep1',

  components: {
    BaseButton
  },

  created () {
    this.$emit('finish-poll')
    this.$emit('update-step', 4)
  }
}
</script>

<style lang="scss" scoped>
.modal-wrapper {
  max-width: 60rem;
}

.modal-footer {
  justify-content: center;
}
</style>
