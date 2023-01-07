import { RedisManager } from './Redis.instance'
import { TranslateResponse, TranslateOptions } from '../../../interfaces'

const redisClient = RedisManager()

export const redisGet = ({ message, from, to }: TranslateOptions): Promise<TranslateOptions> => {
  return new Promise((resolve, reject) => {
    const getKey = JSON.stringify({ cFrom: from, cTo: to, cSrc: message })

    redisClient.get(getKey).then((value) => {
      if (value) {
        reject(
          new Error(
            JSON.stringify({
              status: 200,
              data: {
                information: 'From cache.',
                translation: {
                  from: from,
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

      resolve({ message, from, to })
    })
  })
}

export const redisSet = ({ from, to, trans_result }: TranslateResponse): Promise<TranslateResponse> => {
  return new Promise((resolve, reject) => {
    const { src, dst } = trans_result
    const setKey = JSON.stringify({
      cFrom: from,
      cTo: to,
      cSrc: src,
    })

    redisClient
      .set(setKey, dst, 'EX', 2612345)
      .then(() => {
        resolve({ from, to, trans_result })
      })
      .catch((error: Error) => {
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
