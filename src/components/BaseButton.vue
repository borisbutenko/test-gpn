<template>
<button
  :class="['base-button', { [`base-button--${ btnType }`]: btnType }]"
  :type="type"
  @click="$emit('click')">
  <slot/>
</button>
</template>

<script>
export default {
  name: 'BaseButton',

  props: {
    primary: Boolean,
    label: String,
    type: {
      type: String,
      default: 'button'
    }
  },

  computed: {
    btnType () {
      if (this.primary) return 'primary'
      return null
    }
  }
}
</script>

<style lang="scss" scoped>
.base-button {
  height: 4.5rem;
  padding: 0 ($space-base / 3) .1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  border-radius: .3rem;
  border: 0;
  outline: 0;
  font-family: $ff-narrow;
  font-size: 16px;
  color: map_get($colors, blue);
  cursor: pointer;
  transition: opacity .1s linear;

  &--primary {
    background-color: map_get($colors, blue);
    color: map_get($colors, white);
    font-size: 20px;
  }

  &[disabled] {
    opacity: .6;
    cursor: not-allowed;
  }

  &:hover:not([disabled]) {
    opacity: .9;
  }

  &:focus {
    border: 0;
    outline: 0;
  }
}
</style>
