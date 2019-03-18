import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login/Login.vue'
import Layout from '@/components/layout/Layout.vue'
import Home from '@/components/home/Home'
import Users from '@/components/users/Users'
import Rights from '@/components/rights/Rights'
import Roles from '@/components/roles/Roles'

Vue.use(Router)
const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/layout'
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/layout',
      component: Layout,
      children: [
        {
          path: '/',
          redirect: '/home'
        },
        {
          path: '/home',
          name: 'home',
          component: Home
        },
        {
          path: '/users',
          name: 'users',
          component: Users
        },
        {
          path: '/rights',
          name: 'rights',
          component: Rights
        },
        {
          path: '/roles',
          name: 'roles',
          component: Roles
        }
      ]
    }
  ]
})
// 全局导航守卫
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  if (to.path === '/login' || token) {
    next()
  } else {
    next('/login')
  }
})

export default router
