import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'
const ASP_NET_SessionId = 'ASPNET-Token'

export function getASPNETSessionId() {
  return Cookies.get(ASP_NET_SessionId)
}

export function setASPNETSessionId(token) {
  return Cookies.set(ASP_NET_SessionId, token)
}
export function removeASPNETSessionId() {
  return Cookies.remove(ASP_NET_SessionId)
}

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
