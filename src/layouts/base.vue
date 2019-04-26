<template>
<div class="base-layout">

  <base-header class="bg-gray"/>

  <main>
    <slot/>
  </main>

  <base-footer class="bg-gray"/>

</div>
</template>

<script>
import BaseHeader from '@/components/BaseHeader'
import BaseFooter from '@/components/BaseFooter'

export default {
  name: 'LayoutBase',

  components: {
    BaseHeader,
    BaseFooter
  }
}
</script>

<style lang="scss" scoped>
.base-layout {
  height: 100%;
  display: grid;
  grid-template-rows: 6rem auto 7rem;
}
</style>
