// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuesax from 'vuesax'

import App from './App'
import i18n from './plugins/i18n'
import router from './router'
import 'vuesax/dist/vuesax.css'
import 'material-icons/iconfont/material-icons.css'
import store from './store/store'

import './assets/scss/style.scss'

function nextFactory(context, middleware, index) {
  const subsequentMiddleware = middleware[index]
  // If no subsequent Middleware exists,
  // the default `next()` callback is returned.
  if (!subsequentMiddleware) return context.next

  return (...parameters) => {
    // Run the default Vue Router `next()` callback first.
    context.next(...parameters)
    // Then run the subsequent Middleware with a new
    // `nextMiddleware()` callback.
    const nextMiddleware = nextFactory(context, middleware, index + 1)
    subsequentMiddleware({ ...context, next: nextMiddleware })
  }
}

router.beforeEach((to, from, next) => {
  if (to.meta.middleware) {
    const middleware = Array.isArray(to.meta.middleware)
      ? to.meta.middleware
      : [to.meta.middleware]
    const context = { from, next, router, store, to }
    const nextMiddleware = nextFactory(context, middleware, 1)
    return middleware[0]({ ...context, next: nextMiddleware })
  }
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters['user/isLoggedIn']) {
      next({
        name: 'login'
      })
    } else next()
  } else if (to.matched.some(record => record.meta.requiresVisitor)) {
    if (store.getters['user/isLoggedIn']) {
      next({
        name: 'home'
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

Vue.config.productionTip = false
Vue.config.devtools = true
Vue.use(Vuesax)

/* eslint-disable no-new */
const app = new Vue({
  el: '#app',
  router,
  store,
  i18n,
  components: { App },
  template: '<App/>'
})
export default app
