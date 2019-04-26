import Vue from 'vue'
import App from './App'

import router from './router'
import store from './store'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  created () {
    // --- go to the start page
    // --- if url has step
    if (this.$route.name !== 'index') {
      this.$router.replace({ name: 'index' })
    }
  }
})
