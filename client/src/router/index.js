import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store/index'
import Home from '@/components/Home'
import Register from '@/components/user/Register'
import Login from '@/components/user/Login'
import Profile from '@/components/user/Profile'

import i18n from '../i18n'

Vue.use(Router)

const requireLogin = (to, from, next) => {
  if (store.getters.user) {
    next()
  } else {
    next('/login')
  }
}

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: `/${i18n.locale}`
    },
    {
      path: '/:lang',
      component: {
        render (c) {
          return c('router-view')
        }
      },
      children: [
        {
          path: '/',
          name: 'home',
          component: Home
        },
        {
          path: 'register',
          name: 'register',
          component: Register
        },
        {
          path: 'login',
          name: 'login',
          component: Login
        },
        {
          path: 'profile',
          name: 'profile',
          component: Profile,
          beforeEnter: (to, from, next) => {
            requireLogin(to, from, next)
          }
        }
      ]
    }
  ]
})

export default router
