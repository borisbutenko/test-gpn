<template>
<form class="modal-wrapper" @submit.prevent="submit">

  <header class="modal-header">
    <h2 class="modal-title">Нам важно Ваше мнение!</h2>
  </header>

  <div class="modal-content">

    <p class="dark">
      <b>Оцените пожалуйста Вашу готовность рекомендовать «Газпромнефть-Корпоративные продажи» своим коллегам / партнерам?</b>
    </p>

    <p class="lightdark">{{ rating.label }}</p>

    <rating-line
      v-if="rating.count"
      v-model="currentRating"
      :rating="rating.count"/>
  </div>

  <footer class="modal-footer">
    <base-button primary type="submit" :disabled="!currentRating">Отправить</base-button>
    <base-button @click="$emit('close-poll')">Больше не спрашивать</base-button>
  </footer>

</form>
</template>

<script>
import BaseButton from '@/components/BaseButton'
import RatingLine from '@/components/RatingLine'

import { mapState, mapActions } from 'vuex'
import { LOAD_RATING } from '@/store/action-types'

export default {
  name: 'ModalStep1',

  components: {
    BaseButton,
    RatingLine
  },

  data () {
    return {
      currentRating: null
    }
  },

  computed: {
    ...mapState('poll', ['rating']),

    pollData () {
      return {
        rating: {
          rate: this.currentRating
        }
      }
    }
  },

  created () {
    this.LOAD_RATING()
    this.$emit('update-step', 1)
  },

  methods: {
    ...mapActions('poll', [LOAD_RATING]),

    submit () {
      this.$emit('update-poll', this.pollData)
    }
  }
}
</script>
