import router from './router'
import VueCookies from 'vue-cookies'

const whiteList = ['/', '/register']

router.beforeEach((to, from, next) => {
  const token = VueCookies.get('cid')
  const role = VueCookies.get('role')

  if (whiteList.includes(to.path)) {
    next()
    return
  }

  if (!token) {
    next('/')
    return
  }

  if (to.path.startsWith('/index') && role !== '0') {
    next('/student')
    return
  }

  if (to.path.startsWith('/student') && role !== '1' && role !== '2') {
    next('/student')
    return
  }

  next()
})

router.afterEach(() => {
  window.scrollTo(0, 0)
})
