import fs from 'fs'
import path from 'path'
import { NowRequest, NowResponse } from '@now/node'

export default (req: NowRequest, res: NowResponse): NowResponse | void => {
  if (req.method !== 'GET') {
    res.status(405).json({
      information: 'Refer to the documentation https://github.com/olavoparno/translate-serverless-now',
    })
  }
  res.writeHead(418, { 'Content-Type': 'text/html', 'Cache-Control': 'max-age=0, s-maxage=2612345' })
  fs.readFile(path.join(__dirname, '../index.html'), null, (error, data) => {
    if (error) {
      res.writeHead(404)
      res.write('Whoops! File not found!')
    } else {
      res.write(data)
    }
    res.end()
  })
}
