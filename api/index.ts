import { NowRequest, NowResponse } from '@now/node'
import Bluebird from 'bluebird'
import { returnHtmlPage, transformRequest, handleRejections } from '../services/http/Http.facilitators'

const handler = (req: NowRequest, res: NowResponse): void => {
  Bluebird.resolve(transformRequest(req, res, 'GET')).tap(returnHtmlPage).catch(handleRejections(res))
}

export default handler
