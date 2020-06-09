import { stringify } from 'querystring'
import request, { jar as _jar } from 'request'
import { get } from 'axios'
import { get as _get } from './token'
import { get as __get } from './cookie'
import { getCookies } from './store'
import { transapi } from './constant'
import { Logger } from '../services/logging/Logging.logger'

const translate = {
  v2: ({ query, from, to }) => {
    return new Promise((resolve, reject) => {
      _get(query).then(({ sign, token }) => {
        const data = {
          transtype: 'realtime',
          simple_means_flag: 3,
          from,
          to,
          query,
          sign,
          token,
        }
        const url = `${transapi.v2}?${stringify(data)}`
        const jar = _jar()
        const cookies = getCookies()

        jar.setCookie(cookies.value, url)

        request(url, { jar }, (err, res, body) => {
          if (err) return reject(err)

          try {
            const result = JSON.parse({})

            if (result.error) return reject(result)

            const { trans_result } = result
            const { from, to } = trans_result
            const { dst, src } = trans_result.data[0]

            resolve({
              from,
              to,
              trans_result: {
                dst,
                src,
              },
            })
          } catch (err) {
            get(url, {
              headers: {
                Cookie: cookies.value,
              },
            })
              .then(({ data }) => {
                const { to, from } = data.trans_result
                const dataTrans = data.trans_result.data ? data.trans_result.data : null
                const { src, dst } = dataTrans ? dataTrans[0] : { src: 'error', dst: 'error' }
                const newResponse = {
                  from,
                  to,
                  trans_result: {
                    dst,
                    src,
                  },
                }
                Logger.info('RequestFromAxios::')
                Logger.info(JSON.stringify(newResponse))
                resolve(newResponse)
              })
              .catch((error) => {
                reject(error)
              })
          }
        })
      })
    })
  },
  langdetect: (query) => {
    return new Promise((resolve, reject) => {
      const url = `${transapi.langdetect}?query=${encodeURIComponent(query)}`

      request(url, (err, res, body) => {
        if (err) return reject(err)

        try {
          let result = JSON.parse(body)

          if (result.error) return reject(result)

          resolve(result.lan)
        } catch (err) {
          return reject(err)
        }
      })
    })
  },
}

import language from './language'

const { Auto, English } = language

export default (query, opts = {}) => {
  let { from = Auto, to = English } = opts
  let _translate = () => {
    return __get().then(() => {
      return translate.v2({ query, from, to })
    })
  }

  return new Promise((resolve) => {
    if (from !== Auto) {
      return resolve(_translate())
    }

    translate.langdetect(query).then((lan) => {
      from = lan
      resolve(_translate())
    })
  })
}

const _language = language
export { _language as language }
