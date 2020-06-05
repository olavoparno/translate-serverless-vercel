import fs from 'fs'
import path from 'path'
import { NowRequest, NowResponse } from '@now/node'
import translate from 'baidu-translate-api'
import { RedisManager } from '../redis'
import { Logger } from '../logging/logger'
import { ITranslateOptions, ITranslateResponse } from '..'

function runTranslate(res, redisClient, { message, from, to }) {
  return translate(message, {
    from,
    to,
  })
    .then((response: ITranslateResponse) => {
      const {
        trans_result: { dst, src },
      } = response

      const setKey = JSON.stringify({
        cFrom: from,
        cTo: to,
        cSrc: src,
      })

      redisClient.set(setKey, dst, 'ex', 2612345).then(() => {
        Logger.info('RedisHmSetCallback >')
        Logger.info(JSON.stringify(response))

        return res.status(200).json({
          information: 'Translation successful!',
          translation: response,
        })
      })
    })
    .catch((error) => {
      Logger.error('TranslationFailure >')
      Logger.error(JSON.stringify(error))

      res.writeHead(418, { 'Content-Type': 'text/html' })

      fs.readFile(path.join(__dirname, '../public/index.html'), null, (fsError, data) => {
        if (fsError) {
          Logger.error('ReadHTMLFailure >')
          Logger.error(JSON.stringify(fsError))

          res.writeHead(404)
          res.write('Whoops! File not found!')
        } else {
          res.write(data)
        }

        return res.end()
      })
    })
}

function returnNotAllowed(res: NowResponse) {
  return res.status(405).json({
    information: 'Refer to the documentation https://github.com/olavoparno/translate-serverless-now',
  })
}

function resolveTranslateOptions(req: NowRequest, res: NowResponse) {
  if (Object.keys(req.body || {}).length > 0) {
    return req.body
  }

  if (Object.keys(req.query || {}).length > 0) {
    return req.query
  }

  returnNotAllowed(res)
}

export default (req: NowRequest, res: NowResponse): NowResponse | void => {
  const redisClient = RedisManager()

  res.on('close', () => {
    Logger.info('TransactionClosed <')
  })

  if (req.method !== 'GET') {
    returnNotAllowed(res)
  }

  const { message, from, to }: ITranslateOptions = resolveTranslateOptions(req, res)

  Logger.info('TranslateOptions >')
  Logger.info(JSON.stringify({ message, from, to }))

  if (from === to) {
    Logger.info('NoTranslationMade >')
    Logger.info(JSON.stringify({ message, from, to }))

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

  redisClient.on('error', (error) => {
    Logger.error('RedisClientOnError >')
    Logger.error(JSON.stringify(error))
  })

  const getKey = JSON.stringify({ cFrom: from, cTo: to, cSrc: message })

  redisClient.get(getKey, (error, cacheString) => {
    if (error) {
      Logger.error('RedisHgetAllError >')
      Logger.error(JSON.stringify(error))

      return false
    }

    if (!cacheString) {
      return false
    }

    Logger.info('TranslationFromCache >')
    Logger.info(cacheString)

    return res.status(200).json({
      information: 'From cache!',
      translation: {
        from: from,
        to: to,
        trans_result: {
          dst: cacheString,
          src: message,
        },
      },
    })
  })

  runTranslate(res, redisClient, { message, from, to })
}
