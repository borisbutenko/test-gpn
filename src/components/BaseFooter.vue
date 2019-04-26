<template>
<footer class="base-footer">
  <base-icon name="opti-24-logo-gray"/>
  <base-icon name="gpn-logo-gray"/>
</footer>
</template>

<script>
import BaseIcon from '@/components/BaseIcon'

export default {
  name: 'BaseFooter',

  components: {
    BaseIcon
  }
}
</script>

<style lang="scss" scoped>
.base-footer {
  padding: .8rem $space-primary 1.2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
