import { NowRequest, NowResponse } from '@now/node'
import Bluebird from 'bluebird'
import { Logger } from '../services/logging/Logging.logger'
import { returnEndpointPayload, transformRequest, returnHttpJson } from '../services/http/Http.facilitators'
import { translateTriage, translateService } from '../services/translator/Translator.service'
import { redisGet, redisSet } from '../services/redis/Redis.actions'

export default (req: NowRequest, res: NowResponse): NowResponse | void => {
  Bluebird.resolve(transformRequest(req, res))
    .then(returnEndpointPayload)
    .tap((translateData) => {
      Logger.info('> TranslateOptions::')
      Logger.info(JSON.stringify(translateData))
    })
    .tap(translateTriage)
    .tap((translateData) => {
      Logger.info('> ContinuingProcess after triage::')
      Logger.info(JSON.stringify(translateData))
    })
    .tap(redisGet)
    .tap((translateData) => {
      Logger.info('> ContinuingProcess after redisGet::')
      Logger.info(JSON.stringify(translateData))
    })
    .then(translateService)
    .tap((translateResponse) => {
      Logger.info('> ContinuingProcess after translateService::')
      Logger.info(JSON.stringify(translateResponse))
    })
    .tap(redisSet)
    .tap((translateResponse) => {
      Logger.info('> ContinuingProcess after redisSet::')
      Logger.info(JSON.stringify(translateResponse))
    })
    .tap((translateReponse) => {
      returnHttpJson(res, 200, {
        information: 'Translation successful!',
        translation: translateReponse,
      })
    })
    .catch(handleRejections(res))
}

const handleRejections = (res) => (error) => {
  const parsedError = JSON.parse(error.toString().replace('Error: ', ''))

  Logger.info('> HandleRejections::')
  Logger.info(JSON.stringify(parsedError))

  returnHttpJson(res, parsedError.status, parsedError.data)
}
