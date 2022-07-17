import router from '@/router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import store from '@/store'
// 白名单，有没有token都能去的页面
const whiteList = ['/login', '/404']
router.beforeEach((to, from, next) => {
  // 开启进度条
  NProgress.start()
  const token = store.state.user.token
  if (token) {
    if (to.path === '/login') {
      next('/')
      NProgress.done()
    } else {
      // 存在用户信息就不会再去发送请求
      if (!store.getters.userId) {
        store.dispatch('user/getInfo1')
      }
      next()
    }
  } else {
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next('/login')
    }
  }
})

router.afterEach(() => {
  // 关闭进度条
  NProgress.done()
})
