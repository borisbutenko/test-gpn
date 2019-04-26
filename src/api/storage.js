import { merge } from 'lodash-es'

export default
class Storage {
  constructor () {
    this.storage = localStorage
    this.set('poll', merge({ finish: false, notice: true }, this.poll))
  }

  get poll () {
    return JSON.parse(this.storage.getItem('poll')) || {}
  }

  get (key) {
    if (key === 'poll') return this.poll
    return this.poll[key]
  }

  set (key, value) {
    let data = (key === 'poll') ? merge(this.poll, value) : merge(this.poll, { [key]: value })
    this.storage.setItem('poll', JSON.stringify(data))
  }
}
