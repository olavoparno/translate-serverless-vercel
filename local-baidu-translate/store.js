import Configstore from 'configstore'
const conf = new Configstore('baidu-translate-api')

import { COOKIES, PARAMS } from './constant'

/**
 * {
 *   cookies: {
 *      value: "",
 *      expires: ""
 *   },
 *   params: {  // change the token every day
 *      token: "",
 *      gtk: "",
 *      expires: ""
 *   }
 * }
 */
export function getCookies() {
  return conf.get(COOKIES)
}
export function setCookies(cookies) {
  return conf.set(COOKIES, cookies)
}
export function getParams() {
  return conf.get(PARAMS)
}
export function setParams(params) {
  return conf.set(PARAMS, params)
}
