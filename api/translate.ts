import { NowRequest, NowResponse } from '@now/node'
import translate from 'baidu-translate-api'
import { defaultHtml } from '../constants'
import { useRedis } from '../redis'
import { ITranslateOptions, ITranslateResponse } from '..'

function resolveTranslateOptions(req: NowRequest) {
  if (Object.keys(req.body || {}).length > 0) {
    return req.body
  }

  if (Object.keys(req.query || {}).length > 0) {
    return req.query
  }

  return {
    message: 'Translate now!',
    from: 'auto',
    to: 'auto',
  }
}

export default (req: NowRequest, res: NowResponse): NowResponse | void => {
  const redisClient = useRedis()
  if (req.method !== 'GET') {
    return res.status(405).json({
      information: 'Refer to the documentation https://github.com/olavoparno/translate-serverless-now',
    })
  }

  res.setHeader('Cache-Control', 'max-age=0, s-maxage=60')

  const { message, from, to }: ITranslateOptions = resolveTranslateOptions(req)

  if (from === to) {
    return res.status(200).json({
      information: 'No translation made.',
      translation: {
        from,
        to,
        trans_result: {
          dst: message,
          src: message,
        },
      },
    })
  }

  redisClient.on('error', function (error) {
    console.error('redisError', error)
  })

  redisClient.hgetall('translationCache', function (err, cacheObject) {
    const { cFrom, cTo, cSrc, cDst } = cacheObject
    if (cSrc === message && cFrom === from && cTo === to) {
      return res.status(200).json({
        information: 'From cache!',
        translation: {
          from: cFrom,
          to: cTo,
          trans_result: {
            dst: cDst,
            src: cSrc,
          },
        },
      })
    }
  })

  translate(message, {
    from,
    to,
  })
    .then((response: ITranslateResponse) => {
      redisClient.hmset('translationCache', {
        cFrom: from,
        cTo: to,
        cSrc: response.trans_result.src,
        cDst: response.trans_result.dst,
      })
      return res.status(200).json({
        information: 'Translation successful!',
        translation: response,
      })
    })
    .catch(() => {
      res.writeHead(418, { 'Content-Type': 'text/html' })
      return res.end(defaultHtml)
    })
    .finally(() => {
      redisClient.expire('translationCache', 2612345)
      redisClient.quit()
    })
}
