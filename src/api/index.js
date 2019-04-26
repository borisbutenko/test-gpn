import data from './data'
import Storage from './storage'

import { merge, isObject } from 'lodash-es'

const storage = new Storage()
const URLS = ['initial', 'step1', 'step2']

/**
 * Server's delay imitation between 100 - 500 ms
 * @returns {number}
 */
function getDelay () {
  return Math.floor(Math.random() * 500) + 100
}

/**
 * GET imitation
 *
 * @param {String} url
 *
 * @returns {Promise<any>}
 */
async function ajax (url) {
  if (!URLS.includes(url)) {
    throw Error('URL is not correct.')
  }
  try {
    return await new Promise(resolve => {
      let [response, delay] = [null, getDelay()]

      if (url === 'initial') {
        response = storage.get('poll')
      }
      else {
        response = data[url]
      }

      setTimeout(() => resolve(response), delay)
    })
  }
  catch (error) {
    throw Error(`
      Something wrong with ajax...
      Error: ${ error }
    `)
  }
}

/**
 * Update data using
 * localStorage and Vuex.state
 *
 * @param {String} prop
 * @param {Object} data
 *
 * @returns {Promise<any>}
 */
async function update (prop, data) {
  try {
    let oldData = storage.get('poll')
    let [newData, response, delay] = [{}, null, getDelay()]

    return await new Promise(resolve => {
      if (isObject(data)) {
        for (let key in data) {
          if (data.hasOwnProperty(key)) {
            newData[key] = data[key]
          }
        }
        response = merge(oldData, newData)
      }
      else {
        response = merge(oldData, { [prop]: data })
      }

      storage.set('poll', response)
      setTimeout(() => resolve(response), delay)
    })
  }
  catch (error) {
    throw Error(`
      Something wrong with ajax...
      Error: ${ error }
    `)
  }
}

export default {
  ajax,
  update,
  storage
}
