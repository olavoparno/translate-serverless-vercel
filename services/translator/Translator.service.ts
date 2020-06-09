import translate from 'baidu-translate-api'
import { Logger } from '../logging/Logging.logger'
import { ITranslateResponse, ITranslateOptions } from '../../index'

export const translateService = ({ message, from, to }: ITranslateOptions): Promise<ITranslateResponse | Error> => {
  return new Promise((resolve, reject) => {
    return translate(message, {
      from,
      to,
    })
      .then(resolve)
      .catch((error) => {
        reject(
          new Error(
            JSON.stringify({
              status: 500,
              data: {
                information: 'Internal server error.',
                complementary: error,
              },
            }),
          ),
        )
      })
  })
}

export const translateTriage = ({ message, from, to }: ITranslateOptions): Promise<ITranslateOptions | Error> => {
  return new Promise((resolve, reject) => {
    if (from === to) {
      Logger.info('> NoTranslationMade::')
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
