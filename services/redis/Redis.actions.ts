import { RedisManager } from './Redis.instance'
import { ITranslateResponse, ITranslateOptions } from '../../index'

const redisClient = RedisManager()

export const redisGet = ({ message, from, to }: ITranslateOptions): Promise<string | Error> => {
  return new Promise((resolve, reject) => {
    const normalizedFrom = from === 'auto' ? 'en' : from
    const getKey = JSON.stringify({ cFrom: normalizedFrom, cTo: to, cSrc: message })

    redisClient.get(getKey).then((value) => {
      if (value) {
        reject(
          new Error(
            JSON.stringify({
              status: 200,
              data: {
                information: 'From cache.',
                translation: {
                  from: normalizedFrom,
                  to,
                  trans_result: {
                    dst: value,
                    src: message,
                  },
                },
              },
            }),
          ),
        )
      }

      resolve()
    })
  })
}

export const redisSet = ({ from, to, trans_result }: ITranslateResponse): Promise<string> => {
  return new Promise((resolve, reject) => {
    const { src, dst } = trans_result
    const setKey = JSON.stringify({
      cFrom: from,
      cTo: to,
      cSrc: src,
    })

    redisClient
      .set(setKey, dst, 'ex', 2612345)
      .then((value) => {
        resolve(value)
      })
      .catch((error) => {
        reject(
          new Error(
            JSON.stringify({
              status: 500,
              data: {
                information: 'Internal redis error.',
                complementary: error,
              },
            }),
          ),
        )
      })
  })
}
