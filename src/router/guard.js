import router from './index'
import storage from '@/utils/storage'

const whiteList = ['/', '/register']

const roleHomeMap = {
  '0': '/admin',
  '1': '/teacher',
  '2': '/student'
}

router.beforeEach((to, from, next) => {
  const token = storage.getToken()
  const user = storage.getUser()
  const role = user ? user.role : null

  if (whiteList.includes(to.path)) {
    if (token && role && roleHomeMap[role]) {
      next(roleHomeMap[role])
      return
    }
    next()
    return
  }

  if (!token) {
    next('/')
    return
  }

  if (to.matched.some(record => record.meta && record.meta.roles)) {
    const allowedRoles = to.matched
      .filter(record => record.meta && record.meta.roles)
      .flatMap(record => record.meta.roles)

    if (allowedRoles.length > 0 && !allowedRoles.includes(role)) {
      if (role && roleHomeMap[role]) {
        next(roleHomeMap[role])
      } else {
        storage.clear()
        next('/')
      }
      return
    }
  }

  next()
})

router.afterEach(() => {
  window.scrollTo(0, 0)
})
