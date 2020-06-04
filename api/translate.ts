import { NowRequest, NowResponse } from '@now/node'
import translate from 'baidu-translate-api'

import { defaultHtml } from '../constants'
import { useRedis } from '../redis'

interface ITranslateOptions {
  message: string
  from: string
  to: string
}

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

export default (req: NowRequest, res: NowResponse) => {
  const { redisClient } = useRedis()
  if (req.method !== 'GET') {
    return res.status(405).json({
      message: 'Refer to the documentation https://github.com/olavoparno/translate-serverless-now',
    })
  }
  res.setHeader('Cache-Control', 'max-age=0, s-maxage=2612345')
  const { message, from, to }: ITranslateOptions = resolveTranslateOptions(req)

  if (from === to) {
    return res.status(200).json({
      message: 'No translation made.',
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
    if (cacheObject && cacheObject.message === message && cacheObject.from === from && cacheObject.to === to) {
      return res.status(200).json({
        message: 'From cache!',
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
  })

  translate(message, {
    from,
    to,
  })
    .then((response) => {
      redisClient.hmset('translationCache', {
        message,
        from,
        to,
      })
      redisClient.expire('translationCache', 2612345)
      return res.status(200).json({
        message: 'Translation successful!',
        translation: response,
      })
    })
    .catch(() => {
      res.writeHead(418, { 'Content-Type': 'text/html' })
      return res.end(defaultHtml)
    })
    .finally(() => {
      redisClient.quit()
    })
}
