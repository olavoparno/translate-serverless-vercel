import { NowRequest, NowResponse } from '@now/node'
import { defaultHtml } from '../constants'

export default (req: NowRequest, res: NowResponse) => {
  if (req.method !== 'GET') {
    return res.status(405).json({
      message: 'Refer to the documentation https://github.com/olavoparno/translate-serverless-now',
    })
  }
  res.writeHead(418, { 'Content-Type': 'text/html', 'Cache-Control': 'max-age=0, s-maxage=2612345' })
  return res.end(defaultHtml)
}
