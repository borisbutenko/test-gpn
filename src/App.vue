<template>
<base-layout>
  <keep-alive>
    <router-view :id="pageId"/>
  </keep-alive>
</base-layout>
</template>

<script>
import BaseLayout from '@/layouts/base'

export default {
  name: 'App',

  components: {
    BaseLayout
  },

  computed: {
    pageId () {
      return `page-${ this.$route.name }`
    }
  }
}
</script>

<style lang="scss" src="./styles/index.scss"></style>
