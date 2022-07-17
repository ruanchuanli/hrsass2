import Cookies from 'js-cookie'

const TokenKey = 'hrsass_token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
const timestamp = 'hrsass_timestamp'
// 存时间戳
export function setTimestamp(now) {
  return Cookies.set(timestamp, now)
}
// 取时间戳
export function getTimestamp() {
  return Cookies.get(timestamp)
}
