import { returnObject } from 'baidu-translate-api'
import translate from '../../local-baidu-translate/translate'
import { Logger } from '../logging/Logging.logger'
import { ITranslateOptions } from '../../interfaces'

export const translateService = ({ message, from, to }: ITranslateOptions): Promise<void | returnObject> => {
  return translate(message, {
    from,
    to,
  })
    .then((res) => res)
    .catch((error) => {
      throw new Error(
        JSON.stringify({
          status: 500,
          data: {
            information: 'Internal server error.',
            complementary: error,
          },
        }),
      )
    })
}

export const translateTriage = ({ message, from, to }: ITranslateOptions): Promise<ITranslateOptions | Error> => {
  return new Promise((resolve, reject) => {
    if (from === to) {
      Logger.info('NoTranslationMade::')
      Logger.info(JSON.stringify({ message, from, to }))

      reject(
        new Error(
          JSON.stringify({
            status: 200,
            data: {
              information: 'No translation made.',
              translation: {
                from,
                to,
                trans_result: {
                  dst: message,
                  src: message,
                },
              },
            },
          }),
        ),
      )
    }

    resolve({ message, from, to })
  })
}
