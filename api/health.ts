import { NowRequest, NowResponse } from '@now/node'
import translate from '../local-baidu-translate/translate'

export default (req: NowRequest, res: NowResponse): void => {
  Promise.resolve(
    translate('Health is ok!', {
      from: 'en',
      to: 'pt',
    })
      .then((response) => {
        console.log('THEN RESOLVE', response)
        res.status(200).json(response)
      })
      .catch((error) => {
        console.log('CATCH RESOLVE', error)
        res.status(500).json(error)
      }),
  )
}
