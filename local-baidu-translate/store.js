const Configstore = require('configstore')
const conf = new Configstore('baidu-translate-api')

const { COOKIES, PARAMS } = require('./constant')

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
module.exports = {
  getCookies: () => conf.get(COOKIES),
  setCookies: (cookies) => conf.set(COOKIES, cookies),
  getParams: () => conf.get(PARAMS),
  setParams: (params) => conf.set(PARAMS, params),
}
