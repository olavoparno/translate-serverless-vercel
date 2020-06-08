import fs from 'fs'
import path from 'path'
import { NowResponse, NowRequest } from '@now/node'
import { Logger } from '../logging/Logging.logger'
import { ITranslateOptions } from '../../interfaces'

export const returnHttpJson = (res: NowResponse, status: number, payload: unknown): NowResponse => {
  return res.status(status).json(payload)
}

export const returnEndpointPayload = ({ req }: { req: NowRequest }): Promise<ITranslateOptions> => {
  return new Promise((resolve, reject) => {
    if (Object.keys(req.body || {}).length > 0) {
      resolve(req.body as ITranslateOptions)
    }

    if (Object.keys(req.query || {}).length > 0) {
      resolve((req.query as unknown) as ITranslateOptions)
    }

    reject(
      new Error(
        JSON.stringify({
          status: 400,
          data: {
            information: 'Refer to the documentation https://github.com/olavoparno/translate-serverless-now',
            complementary: 'Tip: you should review your payload information',
          },
        }),
      ),
    )
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

export const transformRequest = (
  req: NowRequest,
  res: NowResponse,
  method?: string,
): Promise<{ req: NowRequest; res: NowResponse }> => {
  return new Promise((resolve, reject) => {
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

    if (req.method === 'OPTIONS') {
      reject(
        new Error(
          JSON.stringify({
            status: 200,
            options: true,
          }),
        ),
      )
    }

    res.setHeader('Access-Control-Allow-Credentials', 'true')
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
    res.setHeader(
      'Access-Control-Allow-Headers',
      'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
    )

    if (req.method !== (method || 'POST')) {
      reject(
        new Error(
          JSON.stringify({
            status: 405,
            data: {
              information: 'Refer to the documentation https://github.com/olavoparno/translate-serverless-now',
            },
          }),
        ),
      )
    }

    resolve({ req, res })
  })
}

export const handleRejections = (res: NowResponse) => (error: Error): void => {
  const parsedError = JSON.parse(error.toString().replace('Error: ', ''))

  Logger.info('> HandleRejections::')
  Logger.info(JSON.stringify(parsedError))

  if (parsedError.options) {
    return res.status(200).end()
  }

  returnHttpJson(res, parsedError.status, parsedError.data)
}
