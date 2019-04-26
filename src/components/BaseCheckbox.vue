<template>
<label class="base-checkbox">

  <input
    :name="name"
    :value="model"
    type="checkbox"
    class="base-checkbox__input"
    @change="handleChange">

  <span class="base-checkbox__checkmark"></span>

  <span
    v-if="label"
    class="base-checkbox__label">

    {{ label }}

  </span>

</label>
</template>

<script>
export default {
  name: 'BaseCheckbox',

  props: {
    name: String,
    value: Boolean,
    label: String
  },

  data () {
    return {
      model: Boolean(this.value)
    }
  },

  watch: {
    model: 'emitEvents'
  },

  methods: {
    handleChange () {
      this.model = !this.model
    },

    emitEvents (value) {
      this.$emit('input', value)
      this.$emit('change', value)
    }
  }
}
</script>

<style lang="scss" scoped>
$size: 2rem;

.base-checkbox {
  position: relative;
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  transition: opacity .1s linear;

  &__input {
    position: absolute;
    left: 0;
    z-index: 1;

    &:checked + .base-checkbox__checkmark {
      background-color: map_get($colors, blue);

      &::after {
        position: absolute;
        left: ($size / 2 - .4);
        top: ($size / 2 - .8);
        content: '';
        display: block;
        width: .5rem;
        height: 1rem;
        border: solid white;
        border-width: 0 2px 2px 0;
        transform: rotate(45deg);
      }
    }
  }

  &__checkmark {
    position: relative;
    z-index: 10;
    width: $size;
    height: $size;
    margin-right: 1rem;
    border: 1px solid map_get($colors, lightgray);
    border-radius: 3px;
    background-color: map_get($colors, white);
    transition: background-color .1s linear;
  }

  &:hover {
    opacity: .9;
  }
}
</style>
