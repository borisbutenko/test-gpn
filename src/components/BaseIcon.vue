<template>
<img :src="src" :alt="name">
</template>

<script>
export default {
  name: 'Icon',

  props: {
    name: {
      type: String,
      required: true
    },
    ext: {
      type: String,
      default: 'svg'
    }
  },

  computed: {
    src () {
      return `/static/icons/${ this.name }.${ this.ext }`
    }
  }
}
</script>
