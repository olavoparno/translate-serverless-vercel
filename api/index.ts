import { NowRequest, NowResponse } from '@now/node'
import Bluebird from 'bluebird'
import { returnHtmlPage, transformRequest } from '../services/http/Http.facilitators'

export default (req: NowRequest, res: NowResponse): NowResponse | void => {
  Bluebird.resolve(transformRequest(req, res)).finally(() => {
    returnHtmlPage(res)
  })
}
