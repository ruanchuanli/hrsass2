import { login, getInfo, getUserDetailById } from '@/api/user'
import { getToken, setToken, removeToken, setTimestamp } from '@/utils/auth'
const state = {
  token: getToken(),
  userInfo: {}
}
const mutations = {
  setToken(state, payload) {
    state.token = payload
  },
  setUserInfo(state, payload) {
    state.userInfo = payload
  },
  removeToken(state) {
    state.token = null
    // 清除cookies
    removeToken()
  },
  removeUserInfo(state) {
    state.userInfo = {}
  }
}
const actions = {
  // 登录
  async login(context, data) {
    const res = await login(data)
    context.commit('setToken', res)
    setTimestamp(Date.now())
    setToken(res)
  },
  // 用户信息
  async getInfo1(context) {
    const res = await getInfo()
    const res2 = await getUserDetailById(res.userId)
    context.commit('setUserInfo', { ...res2, ...res })
    console.log(res)
    console.log(res2)
  },
  // 退出
  logout(context) {
    // 清空token
    context.commit('removeToken')
    // 清空用户信息
    context.commit('removeUserInfo')
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}

