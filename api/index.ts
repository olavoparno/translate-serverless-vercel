import { NowRequest, NowResponse } from '@now/node'
import { defaultHtml } from './defaults'

export default (req: NowRequest, res: NowResponse) => {
  if (req.method !== 'GET') {
    return res.status(404).json({
      message: 'Resource not found',
    })
  }
  res.writeHead(418, { 'Content-Type': 'text/html' })
  res.end(defaultHtml)
}
