import { NowRequest, NowResponse } from '@now/node'
import { Logger } from '../services/logging/Logging.logger'
import {
  returnEndpointPayload,
  transformRequest,
  returnHttpJson,
  handleRejections,
} from '../services/http/Http.facilitators'
import { translateTriage, translateService } from '../services/translator/Translator.service'
import { redisGet, redisSet } from '../services/redis/Redis.actions'

export default (req: NowRequest, res: NowResponse): void => {
  Promise.resolve(transformRequest(req, res))
    .then(returnEndpointPayload)
    .then((translateData) => {
      Logger.info('TransformedPayload::')
      Logger.info(JSON.stringify(translateData))
      return translateData
    })
    .then(translateTriage)
    .then((translateData) => {
      Logger.info('ContinuingProcess after triage::')
      Logger.info(JSON.stringify(translateData))
      return translateData
    })
    .then(redisGet)
    .then((translateData) => {
      Logger.info('ContinuingProcess after redisGet::')
      Logger.info(JSON.stringify(translateData))
      return translateData
    })
    .then(translateService)
    .then((translateResponse) => {
      Logger.info('ContinuingProcess after translateService::')
      Logger.info(JSON.stringify(translateResponse))
      return translateResponse
    })
    .then(redisSet)
    .then((translateResponse) => {
      Logger.info('ContinuingProcess after redisSet::')
      Logger.info(JSON.stringify(translateResponse))
      return translateResponse
    })
    .then((translateReponse) => {
      return returnHttpJson(res, 200, {
        information: 'Translation successful!',
        translation: translateReponse,
      })
    })
    .catch(handleRejections(res))
}
