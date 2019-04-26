import { merge } from 'lodash-es'
import * as mutationTypes from '@/store/mutation-types'

export default {
  [mutationTypes.UPDATE_POLL] (state, value) {
    state.result = merge({}, state.result, value)
  },

  [mutationTypes.UPDATE_RATING] (state, value) {
    state.rating = value
  },

  [mutationTypes.UPDATE_REASON_DATA] (state, value) {
    state.reasonData = value
  }
}
