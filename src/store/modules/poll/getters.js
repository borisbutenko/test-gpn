import { pick, omitBy, isUndefined } from 'lodash-es'

export default {
  getData: ({ result }) => {
    let data = pick(result, ['finish', 'rate', 'ids', 'msg', 'message'])
    return omitBy({
      finish: data.finish,
      rate: data.rate,
      reasons: data.ids,
      reasonsMessage: data.msg,
      message: data.message
    }, isUndefined)
  }
}
