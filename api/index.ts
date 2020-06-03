import { NowRequest, NowResponse } from '@now/node'
import { defaultHtml } from '../constants'

export default (req: NowRequest, res: NowResponse) => {
  if (req.method !== 'GET') {
    return res.status(404).json({
      message: 'Resource not found',
    })
  }
  res.setHeader('Cache-Control', 'max-age=0, s-maxage=2612345')
  res.writeHead(418, { 'Content-Type': 'text/html' })
  res.end(defaultHtml)
}
