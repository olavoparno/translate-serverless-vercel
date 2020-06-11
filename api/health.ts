import { NowRequest, NowResponse } from '@now/node'
import translate from '@vitalets/google-translate-api'

export default (req: NowRequest, res: NowResponse): void => {
  Promise.resolve(
    translate('Health is ok!', {
      from: 'en',
      to: 'pt',
    })
      .then((response) => {
        res.status(200).json(response)
      })
      .catch((error) => {
        res.status(500).json(error)
      }),
  )
}
