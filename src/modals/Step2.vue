<template>
<form class="modal-wrapper" @submit.prevent="submit">

  <header class="modal-header">
    <h2 class="modal-title dark">Почему Вы не поставили оценку 10?</h2>
  </header>

  <div v-if="reasons" class="modal-content">

    <p class="dark">
      <b>
        {{ reasonsLabel }}
      </b>
    </p>

    <fieldset class="fieldset dark">
      <legend class="fieldset__label">
        Выберите не более {{ maxReasons }}-х ключевых причин.
      </legend>
      <base-checkbox
        v-for="reason in reasons"
        :key="reason.id"
        :label="reason.label"
        :value="ids.includes(reason.id)"
        class="fieldset__row"
        @change="handleChange(reason, $event)"/>
    </fieldset>

    <textarea
      v-if="isOther"
      v-model="reasonsMessage"
      v-focus
      name="other"
      rows="5"
      placeholder="Ваш ответ..."
      class="textarea textarea--noresize"
      minlength="20"
      required>
    </textarea>
  </div>

  <footer class="modal-footer">
    <base-button
      primary
      type="submit"
      :disabled="!ids.length || ids.length > 3">
      Отправить
    </base-button>
    <base-button @click="$router.push({ name: 'index' })">Закрыть</base-button>
  </footer>

</form>
</template>

<script>
import BaseCheckbox from '@/components/BaseCheckbox'
import BaseButton from '@/components/BaseButton'

import { mapState, mapActions } from 'vuex'
import { LOAD_REASONS } from '@/store/action-types'

export default {
  name: 'ModalStep1',

  directives: {
    focus: {
      inserted: el => el.focus()
    }
  },

  components: {
    BaseCheckbox,
    BaseButton
  },

  data () {
    return {
      ids: [],
      reasonsMessage: ''
    }
  },

  computed: {
    ...mapState('poll', ['reasonData']),

    reasonsLabel () {
      return this.reasonData.label
    },

    maxReasons () {
      return this.reasonData.maxReasons
    },

    reasons () {
      return this.reasonData.reasons
    },

    isOther () {
      // --- if other is checked
      // --- show area for comment
      return this.ids.includes(10)
    },

    pollData () {
      let pollData = {
        reasons: {
          ids: this.ids
        }
      }

      if (this.isOther) {
        pollData.reasons.msg = this.reasonsMessage
      }

      return pollData
    }
  },

  created () {
    this.LOAD_REASONS()
    this.$emit('update-step', 2)
  },

  methods: {
    ...mapActions('poll', [LOAD_REASONS]),

    handleChange ({ id }, checked) {
      let ids = this.ids
      if (ids.includes(id)) ids.splice(ids.indexOf(id), 1)
      else ids.push(id)
    },

    submit () {
      this.$emit('update-poll', this.pollData)
    }
  }
}
</script>

<style lang="scss" scoped>
.fieldset {
  margin: 0;
  padding: 0;
  display: flex;
  border: 0;

  &__label {
    margin-bottom: ($space-base / 2);
  }

  &__row {
    margin-bottom: 1.4rem;
  }
}
</style>
