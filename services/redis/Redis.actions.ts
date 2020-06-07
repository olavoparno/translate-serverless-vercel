import { RedisManager } from './Redis.instance'
import { ITranslateResponse, ITranslateOptions } from '../..'

const redisClient = RedisManager()

export const redisGet = ({ message, from, to }: ITranslateOptions): Promise<string | Error> => {
  return new Promise(async (resolve, reject) => {
    const normalizedFrom = from === 'auto' ? 'en' : from
    const getKey = JSON.stringify({ cFrom: normalizedFrom, cTo: to, cSrc: message })

    const redisReturn = await redisClient.get(getKey)

    if (redisReturn) {
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
                  dst: redisReturn,
                  src: message,
                },
              },
            },
          }),
        ),
      )
    }

    resolve(redisReturn)
  })
}

export const redisSet = ({ from, to, trans_result }: ITranslateResponse): Promise<string> => {
  return new Promise(async (resolve) => {
    const { src, dst } = trans_result
    const setKey = JSON.stringify({
      cFrom: from,
      cTo: to,
      cSrc: src,
    })

    resolve(await redisClient.set(setKey, dst, 'ex', 2612345))
  })
}
