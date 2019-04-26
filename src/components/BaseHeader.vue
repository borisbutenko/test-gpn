<template>
<header class="base-header">
  <base-icon name="opti-24-logo"/>
  <base-icon name="gpn-logo"/>
</header>
</template>

<script>
import BaseIcon from '@/components/BaseIcon'

export default {
  name: 'BaseHeader',

  components: {
    BaseIcon
  }
}
</script>

<style lang="scss" scoped>
.base-header {
  padding: .8rem $space-primary 1.2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
