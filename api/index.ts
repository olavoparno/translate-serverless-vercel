import { NowRequest, NowResponse } from '@now/node'

import { returnHtmlPage, transformRequest, handleRejections } from '../services/http/Http.facilitators'

export default (req: NowRequest, res: NowResponse): void => {
  Promise.resolve(transformRequest(req, res, 'GET')).then(returnHtmlPage).catch(handleRejections(res))
}
