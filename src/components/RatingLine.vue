<template>
<div class="rating-line">

  <base-icon
    name="dislike"
    ext="png"
    class="rating-line__icon"/>

  <label
    v-for="n in ratingLength"
    :key="`rate-${ n }`"
    :class="['rating-line__label radio', { active: n <= currentRating }]">

    <b class="radio__label dark">{{ n }}</b>

    <input
      :id="`rate-${ n }`"
      class="radio__input"
      name="rating"
      type="radio"
      :value="n"
      required
      @change="handleChange(n)">

    <i class="radio__checkmark"></i>

    <span
      v-if="n !== 1"
      class="radio__line">
    </span>

  </label>

  <base-icon
    name="like"
    ext="png"
    class="rating-line__icon"/>

</div>
</template>

<script>
import BaseIcon from '@/components/BaseIcon'

export default {
  name: 'RatingLine',

  components: {
    BaseIcon
  },

  props: {
    value: [Number, String],
    rating: {
      type: [Number, String],
      required: true
    }
  },

  data () {
    return {
      currentRating: this.value
    }
  },

  computed: {
    ratingLength () {
      return Number(this.rating)
    }
  },

  watch: {
    currentRating: 'emitEvents'
  },

  methods: {
    handleChange (value) {
      this.currentRating = Number(value)
    },

    emitEvents (value) {
      this.$emit('input', value)
      this.$emit('change', value)
    }
  }
}
</script>

<style lang="scss" scoped>
.rating-line {
  margin-bottom: $space-base;
  display: flex;
  align-items: center;
  justify-content: space-around;

  &__label {
    display: inline-flex;
    flex-direction: column;
    align-items: center;

    &:first-of-type {
      margin-left: 1rem;
    }

    &:last-of-type {
      margin-right: 1rem;
    }
  }

  &__icon {
    width: 4rem;
    height: 4rem;
    margin-top: 2.5rem;
  }
}

.radio {
  position: relative;
  height: 5rem;
  flex: 1 0 auto;

  &__label {
    margin-bottom: .5rem;
  }

  &__input {
    position: absolute;
    bottom: 1rem;
    left: calc(50% - 1.2rem);
    z-index: 1;
  }

  &__checkmark {
    z-index: 10;
  }

  &__line {
    position: absolute;
    top: 3.2rem;
    right: 50%;
    display: inline-block;
    width: 100%;
    height: .3rem;
    background-color: map_get($colors, lightgray);
    transition: background-color .1s linear;
  }

  &.active &__line {
    background-color: map_get($colors, blue);
  }

  &.active &__checkmark {
    background-color: map_get($colors, blue);
    border: 1px solid map_get($colors, blue);
  }
}
</style>
