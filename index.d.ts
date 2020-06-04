export interface ITranslateOptions {
  message: string
  from: string
  to: string
}

export interface ITranslateResponse {
  information: string
  from: string
  to: string
  trans_result: {
    dst: string
    src: string
  }
}
