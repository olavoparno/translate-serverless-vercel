import fs from 'fs'
import path from 'path'
import { NowResponse, NowRequest } from '@now/node'
import { Logger } from '../logging/Logging.logger'
import { ITranslateOptions } from '../..'

export const returnHttpJson = (res: NowResponse, status: number, payload: unknown): NowResponse => {
  return res.status(status).json(payload)
}

export const returnEndpointPayload = ({ req, res }: { req: NowRequest; res: NowResponse }): ITranslateOptions => {
  if (Object.keys(req.body || {}).length > 0) {
    return req.body as ITranslateOptions
  }

  if (Object.keys(req.query || {}).length > 0) {
    return (req.query as unknown) as ITranslateOptions
  }

  returnHttpJson(res, 405, {
    information: 'Refer to the documentation https://github.com/olavoparno/translate-serverless-now',
  })
}

export const returnHtmlPage = ({ res }: { res: NowResponse }): void => {
  res.writeHead(418, { 'Content-Type': 'text/html', 'Cache-Control': 'max-age=0, s-maxage=2612345' })

  return fs.readFile(path.join(__dirname, '../../public/index.html'), null, (fsError, data) => {
    if (fsError) {
      Logger.error('> ReadHTMLFailure::')
      Logger.error(JSON.stringify(fsError))

      res.writeHead(404)
      res.write('Whoops! File not found!')
    } else {
      res.write(data)
    }

    return res.end()
  })
}

export const transformRequest = (req: NowRequest, res: NowResponse): { req: NowRequest; res: NowResponse } => {
  if (req.method !== 'POST') {
    returnHttpJson(res, 405, {
      information: 'Refer to the documentation https://github.com/olavoparno/translate-serverless-now',
    })
  }

  req.on('data', () => {
    Logger.info('> TransactionOpened::')
  })

  res.on('close', () => {
    Logger.info('> TransactionClosed')
  })

  res.on('error', (error) => {
    Logger.error('> TransactionError::')
    Logger.error(JSON.stringify(error))
  })

  return { req, res }
}

export const handleRejections = (res: NowResponse) => (error: Error): void => {
  const parsedError = JSON.parse(error.toString().replace('Error: ', ''))

  Logger.info('> HandleRejections::')
  Logger.info(JSON.stringify(parsedError))

  returnHttpJson(res, parsedError.status, parsedError.data)
}
