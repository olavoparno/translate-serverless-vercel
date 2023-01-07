export interface TranslateOptions {
  message: string
  from: string
  to: string
}

export interface TransResult {
  dst: string
  src: string
}

export interface TranslateResponse {
  from: string
  to: string
  trans_result: TransResult
}
