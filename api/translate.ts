import { NowRequest, NowResponse } from '@now/node'
import translate from 'baidu-translate-api'
import { defaultHtml } from '../constants'

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
  if (req.method !== 'GET') {
    return res.status(404).json({
      message: 'Resource not found',
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
          src: message,
          dst: message,
        },
      },
    })
  }

  translate(message, {
    from,
    to,
  })
    .then((response) => {
      return res.status(201).json({
        message: 'Translation successful!',
        translation: response,
      })
    })
    .catch(() => {
      res.writeHead(418, { 'Content-Type': 'text/plain' })
      return res.end(defaultHtml)
    })
}
