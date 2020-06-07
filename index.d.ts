export interface ITranslateOptions {
  message: string
  from: string
  to: string
}

export interface ITransResult {
  dst: string
  src: string
}

export interface ITranslateResponse {
  from: string
  to: string
  trans_result: ITransResult
}
