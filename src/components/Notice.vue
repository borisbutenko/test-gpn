<template>
<div v-show="show" :class="['notice', `notice--${ color }`]">

  <p class="notice__content">
    <slot/>
  </p>

  <a
    v-if="closable"
    href="#"
    class="notice__close"
    @click.prevent="closeNotice">

    <base-icon name="times"/>

  </a>

</div>
</template>

<script>
import BaseIcon from '@/components/BaseIcon'

export default {
  name: 'Notice',

  components: {
    BaseIcon
  },

  props: {
    content: String,
    color: {
      type: String,
      default: 'green'
    },
    closable: {
      type: Boolean,
      default: true
    }
  },

  data () {
    return {
      show: true
    }
  },

  methods: {
    closeNotice () {
      this.show = false
      this.$emit('close')
    }
  }
}
</script>

<style lang="scss" scoped>
.notice {
  padding: .6rem $space-primary;
  display: flex;
  align-items: center;
  justify-content: space-between;

  &--green {
    color: map_get($colors, white);
    background-color: map_get($colors, green);
  }

  &__content {
    margin: 0;
    padding-right: $space-base;
  }

  /deep/ a {
    color: inherit;
  }
}
</style>
