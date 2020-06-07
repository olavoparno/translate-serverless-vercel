import { chain } from '@amaurymartiny/now-middleware'
import { NowRequest, NowResponse } from '@now/node'

import cors from 'cors'
import morgan from 'morgan'
import Bluebird from 'bluebird'

import { returnHtmlPage, transformRequest } from '../services/http/Http.facilitators'

const handler = (req: NowRequest, res: NowResponse) => {
  Bluebird.resolve(transformRequest(req, res)).tap(returnHtmlPage)
}

export default chain(cors(), morgan('common'))(handler)
