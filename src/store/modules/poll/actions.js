import api from '@/api'
import { cloneDeep } from 'lodash-es'

import * as actionTypes from '@/store/action-types'
import * as mutationTypes from '@/store/mutation-types'

export default {
  async [actionTypes.LOAD_INITIAL_DATA] ({ commit }, data) {
    let res = await api.ajax('initial')
    commit(mutationTypes.UPDATE_POLL, res)
  },

  async [actionTypes.SEND_DATA] ({ getters }) {
    console.info('Poll is not finished. Send data to server...')
    console.log(cloneDeep(getters.getData))
  },

  [actionTypes.UPDATE_STORAGE] ({ commit }, data) {
    for (let key in data) {
      if (data.hasOwnProperty(key)) {
        api.storage.set(key, data[key])
      }
    }
    commit(mutationTypes.UPDATE_POLL, data)
  },

  async [actionTypes.UPDATE_POLL] ({ commit }, data) {
    try {
      for (let prop in data) {
        if (data.hasOwnProperty(prop)) {
          let res = await api.update(prop, data[prop])
          // --- TODO: почему-то при ключе "finish"
          // --- не корректно работает присваивание булева значения
          // --- возможно проблема в api.update
          // --- пока такой рабочий костыль...
          res = (prop === 'finish') ? res : { [prop]: res }
          commit(mutationTypes.UPDATE_POLL, res)
        }
      }
    }
    catch (error) {
      console.error(error)
    }
  },

  async [actionTypes.LOAD_RATING] ({ commit }) {
    let res = await api.ajax('step1')
    commit(mutationTypes.UPDATE_RATING, res)
  },

  async [actionTypes.LOAD_REASONS] ({ commit }) {
    let res = await api.ajax('step2')
    commit(mutationTypes.UPDATE_REASON_DATA, res)
  }
}
