import fs from 'fs'
import path from 'path'
import { VercelRequest, VercelResponse } from '@vercel/node'
import { Logger } from '../logging/Logging.logger'
import { TranslateOptions } from '../../interfaces'

export const returnHttpJson = (res: VercelResponse, status: number, payload: unknown): VercelResponse => {
  return res.status(status).json(payload)
}

export const returnEndpointPayload = async ({ req }: { req: VercelRequest }): Promise<TranslateOptions> => {
  return new Promise((resolve, reject) => {
    if (Object.keys(req.body || {}).length > 0) {
      resolve(req.body as TranslateOptions)
    }

    if (Object.keys(req.query || {}).length > 0) {
      resolve(req.query as unknown as TranslateOptions)
    }

    reject(
      new Error(
        JSON.stringify({
          status: 400,
          data: {
            information: 'Refer to the documentation https://github.com/olavoparno/translate-serverless-vercel',
            complementary: 'Tip: you should review your payload information',
          },
        }),
      ),
    )
  })
}

export const returnHtmlPage = ({ res }: { res: VercelResponse }): void => {
  res.writeHead(418, { 'Content-Type': 'text/html', 'Cache-Control': 'max-age=0, s-maxage=2612345' })

  return fs.readFile(path.join(__dirname, '../../public/index.html'), null, (fsError, data) => {
    if (fsError) {
      Logger.error('ReadHTMLFailure::')
      Logger.error(JSON.stringify(fsError))

      res.writeHead(404)
      res.write('Whoops! File not found!')
    } else {
      res.write(data)
    }

    return res.end()
  })
}

export const transformRequest = async (
  req: VercelRequest,
  res: VercelResponse,
  method?: string,
): Promise<{ req: VercelRequest; res: VercelResponse }> => {
  return new Promise((resolve, reject) => {
    req.on('data', () => {
      Logger.info('TransactionOpened::')
    })
    res.on('close', () => {
      Logger.info('TransactionClosed')
    })
    res.on('error', (error) => {
      Logger.error('TransactionError::')
      Logger.error(JSON.stringify(error))
    })

    if (req.method !== (method || 'POST')) {
      reject(
        new Error(
          JSON.stringify({
            status: 405,
            data: {
              information: 'Refer to the documentation https://github.com/olavoparno/translate-serverless-vercel',
            },
          }),
        ),
      )
    }

    resolve({ req, res })
  })
}

export const handleRejections =
  (res: VercelResponse) =>
  (error: Error): void => {
    const parsedError = JSON.parse(error.toString().replace('Error: ', ''))

    Logger.info('HandleRejections::')
    Logger.info(JSON.stringify(parsedError))

    returnHttpJson(res, parsedError.status, parsedError.data)
  }

export const allowCors =
  (fn: (req: VercelRequest, res: VercelResponse) => Promise<void | VercelResponse>) =>
  async (req: VercelRequest, res: VercelResponse) => {
    res.setHeader('Access-Control-Allow-Credentials', 'true')
    res.setHeader('Access-Control-Allow-Origin', '*')

    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS,POST')
    res.setHeader(
      'Access-Control-Allow-Headers',
      'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
    )
    if (req.method === 'OPTIONS') {
      res.status(200).end()
      return
    }
    return await fn(req, res)
  }
