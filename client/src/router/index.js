import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store/index'
import Home from '@/components/Home'
import Register from '@/components/user/Register'
import Login from '@/components/user/Login'
import Profile from '@/components/user/Profile'

Vue.use(Router)

let requiredLogin = (to, from, next) => {
  if (!store.getters.isLoggedIn) {
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
      name: 'Home',
      component: Home
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile,
      beforeEnter: (to, from, next) => {
        requiredLogin(to, from, next)
      }
    }
  ]
})

export default router
