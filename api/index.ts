import { chain } from '@amaurymartiny/now-middleware'
import { NowRequest, NowResponse } from '@now/node'

import cors from 'cors'
import morgan from 'morgan'

import { returnHtmlPage, transformRequest, handleRejections } from '../services/http/Http.facilitators'

const handler = (req: NowRequest, res: NowResponse) => {
  Promise.resolve(transformRequest(req, res, 'GET')).then(returnHtmlPage).catch(handleRejections(res))
}

export default chain(cors(), morgan('common'))(handler)
