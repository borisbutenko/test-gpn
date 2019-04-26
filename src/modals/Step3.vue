<template>
<form class="modal-wrapper" @submit.prevent="submit">

  <header class="modal-header">
    <h2 class="modal-title">Багодарим за оценку!</h2>
  </header>

  <div class="modal-content">
    <p class="paragraph dark">
      Мы будем признательны, если Вы оставите отзыв или предложение по
      <br>
      улучшению работы «Газпромнефть-Корпоративные продажи».
    </p>
    <textarea
      v-model="message"
      v-focus
      name="other"
      rows="8"
      placeholder="Ваш ответ..."
      class="textarea">
    </textarea>
  </div>

  <footer class="modal-footer">
    <base-button primary type="submit">Отправить</base-button>
    <base-button @click="$emit('close-poll')">Больше не спрашивать</base-button>
  </footer>

</form>
</template>

<script>
import BaseButton from '@/components/BaseButton'

export default {
  name: 'ModalStep1',

  directives: {
    focus: {
      inserted: el => el.focus()
    }
  },

  components: {
    BaseButton
  },

  data () {
    return {
      message: ''
    }
  },

  computed: {
    pollData () {
      return {
        message: this.message
      }
    }
  },

  created () {
    this.$emit('update-step', 3)
  },

  methods: {
    submit () {
      this.$emit('update-poll', this.pollData)
    }
  }
}
</script>

<style lang="scss" scoped>
.paragraph {
  margin-bottom: ($space-base / 1.5);
}
</style>
