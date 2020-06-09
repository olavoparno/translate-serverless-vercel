import { NowRequest, NowResponse } from '@now/node'
import translate from '../local-baidu-translate/translate'

export default (req: NowRequest, res: NowResponse): void => {
  Promise.resolve(
    translate('Health is ok!', {
      from: 'en',
      to: 'rom',
    })
      .then((response) => {
        console.log(response.trans_result.dst)
        res.status(200).json(response)
      })
      .catch((error) => {
        console.log(error)
        res.status(200).json(error)
      }),
  )
}
