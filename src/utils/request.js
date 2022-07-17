import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import router from '@/router'
import { getTimestamp } from '@/utils/auth'
// 2h
const timeout = 2 * 60 * 60 * 1000
const istimeout = () => {
  const cha = Date.now() - getTimestamp()
  console.log(cha)
  if (cha < timeout) {
    return false
  }
  return true
}
const request = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 10000
})
// 添加请求拦截器
request.interceptors.request.use(function(config) {
  // 在发送请求之前做些什么
  const token = store.getters.token
  if (token) {
    if (istimeout()) {
      store.dispatch('user/logout')
      router.push('/login')
    } else {
      config.headers.Authorization = 'Bearer ' + token
    }
  }
  return config
}, function(error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

request.interceptors.response.use(function(response) {
  // 对响应数据做点什么
  const { data, success, message } = response.data
  if (success) {
    Message.success(message)
    return data
  } else {
    Message.error(message)
    return Promise.reject(new Error(message))
  }
}, function(error) {
  if (error.response?.data?.code === 10002) {
    store.dispatch('user/logout')
    router.push('/login')
  }
  // 对响应错误做点什么
  return Promise.reject(error)
})
export default request
