import translate from '@vitalets/google-translate-api'
import { Logger } from '../logging/Logging.logger'
import { TranslateOptions, TranslateResponse } from '../../../interfaces'

export const translateService = async ({ message, from, to }: TranslateOptions): Promise<TranslateResponse> => {
  return translate(message, {
    from,
    to,
  })
    .then((res) => {
      return {
        from,
        to,
        trans_result: {
          dst: res.text,
          src: message,
        },
      }
    })
    .catch((error) => {
      throw new Error(
        JSON.stringify({
          status: 500,
          data: {
            information: 'The translation lib has errored.',
            complementary: error,
          },
        }),
      )
    })
}

export const translateTriage = async ({ message, from, to }: TranslateOptions): Promise<TranslateOptions> => {
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
