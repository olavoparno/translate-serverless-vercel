import { NextApiRequest, NextApiResponse } from "next";
import { Logger } from "../../src/services/logging/Logging.logger";
import {
  returnEndpointPayload,
  transformRequest,
  returnHttpJson,
  handleRejections,
  allowCors,
} from "../../src/services/http/Http.facilitators";
import {
  translateTriage,
  translateService,
} from "../../src/services/translator/Translator.service";
import { redisGet, redisSet } from "../../src/services/redis/Redis.actions";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  return Promise.resolve(transformRequest(req, res))
    .then(returnEndpointPayload)
    .then((translateData) => {
      Logger.info("Payload normalized::");
      Logger.info(JSON.stringify(translateData));
      return translateData;
    })
    .then(translateTriage)
    .then((translateData) => {
      Logger.info("Triage done. Continuing::");
      return translateData;
    })
    .then(redisGet)
    .then((translateData) => {
      Logger.info("No Cache found. Continuing::");
      return translateData;
    })
    .then(translateService)
    .then((translateResponse) => {
      Logger.info("Translate service completed::");
      Logger.info(JSON.stringify(translateResponse));
      return translateResponse;
    })
    .then(redisSet)
    .then((translateResponse) => {
      Logger.info("Cache set successfully::");
      return translateResponse;
    })
    .then((translateReponse) => {
      return returnHttpJson(res, 200, {
        information: "Translation successful!",
        translation: translateReponse,
      });
    })
    .catch(handleRejections(res));
};

export default allowCors(handler);
