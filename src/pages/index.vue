<template>
<section v-if="loaded" class="page">

  <notice v-show="showNotice" @close="UPDATE_STORAGE({ notice: false })">
    Мы хотим стать лучше! Пожалуйста, пройдите опрос и оцените качество сервиса.
    <router-link :to="{ name: 'step', params: { step: lastStep || 1 } }">
      {{ (lastStep) ? 'Продолжить опрос' : 'Пройти опрос' }}
    </router-link>
  </notice>

  <modal v-if="step">
    <transition name="slide">
      <keep-alive>
        <component
          :is="modalComponent"
          @update-step="updateStep"
          @update-poll="updatePoll"
          @close-poll="closePoll"
          @finish-poll="finishPoll"/>
      </keep-alive>
    </transition>
  </modal>

  <footer class="page__footer">
    <base-button @click="clearStorage">
      Clear storage
    </base-button>
  </footer>

</section>
</template>

<script>
import BaseButton from '@/components/BaseButton'

import { mapState, mapActions } from 'vuex'
import {
  LOAD_INITIAL_DATA,
  UPDATE_STORAGE,
  UPDATE_POLL,
  SEND_DATA
} from '@/store/action-types'

export default {
  name: 'PageIndex',

  components: {
    BaseButton,

    Notice: () => import('@/components/Notice'),
    Modal: () => import('@/components/Modal'),
    Step1: () => import('@/modals/Step1'),
    Step2: () => import('@/modals/Step2'),
    Step3: () => import('@/modals/Step3'),
    Step4: () => import('@/modals/Step4')
  },

  data () {
    return {
      loaded: false
    }
  },

  computed: {
    ...mapState('poll', ['result']),

    step () {
      let step = this.$route.params.step
      return (step) ? Number(step) : null
    },

    modalComponent () {
      return 'step' + this.step
    },

    lastStep () {
      return this.result.step
    },

    rate () {
      return this.result.rating.rate
    },

    notice () {
      return this.result.notice
    },

    finish () {
      return this.result.finish
    },

    showNotice () {
      return this.notice && !this.finish
    }
  },

  async created () {
    await this.LOAD_INITIAL_DATA()

    // --- if poll started
    // --- and not end
    if (this.lastStep && this.lastStep !== 4) {
      this.SEND_DATA()
    }

    this.loaded = true
  },

  methods: {
    ...mapActions('poll', [
      LOAD_INITIAL_DATA,
      UPDATE_STORAGE,
      UPDATE_POLL,
      SEND_DATA
    ]),

    clearStorage () {
      localStorage.clear()
      location.reload()
    },

    nextStep () {
      let currentStep = this.step
      let nextStep = currentStep + 1

      // --- if 1st step
      // --- check rate
      // --- go step 2 if rate < 10
      // --- else go step 3
      if (currentStep === 1 && this.rate === 10) {
        nextStep += 1
      }

      this.$router.push({
        ...this.$route,
        params: {
          step: nextStep
        }
      })
    },

    updateStep (step) {
      this.UPDATE_STORAGE({ step })
    },

    async updatePoll (data) {
      await this.UPDATE_POLL(data)
      this.nextStep()
    },

    async closePoll () {
      this.updateStep(4)
      await this.UPDATE_POLL({ finish: true })
      await this.SEND_DATA()
      this.$router.push({ name: 'index' })
    },

    finishPoll () {
      this.UPDATE_POLL({ finish: true })
      this.SEND_DATA()
    }
  }
}
</script>

<style lang="scss" scoped>
.page {
  height: 100%;
  display: flex;
  flex-direction: column;

  &__footer {
    margin-top: auto;
    display: flex;
    align-items: center;
    justify-content: center;

    button {
      width: 100%;
      background: lightblue;
    }
  }
}
</style>
