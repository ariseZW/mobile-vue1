import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  { path: '*', redirect: '/login' },
  {
    path:'/',
    redirect: '/login',
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login.vue'),
    // 路由独享的守卫
    beforeEnter: (to, from, next) => { next(); }
  },
  {
    path: '/home',
    name: 'home',
    redirect: {name:'new'},
    component: () => import('../views/home.vue'),
    children:[
      {
        path: 'new',
        name: 'new',
        component: () => import('../views/new.vue'),
      },
      {
        path: 'historyDetails/:id',
        name: 'historyDetails',
        component: () => import('../views/historyDetails.vue'),
      },
      {
        path: 'history',
        name: 'history',
        component: () => import('../views/history.vue'),
      },
      // {
      //   path: 'statistics',
      //   name: 'statistics',
      //   component: () => import('../views/statistics.vue'),
      // }
    ]
  }
]

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 全局前置守卫
router.beforeEach((to, from, next) => {
  // console.log(to);
  next();
})

// 全局后置钩子
router.afterEach((to, from) => {
  // console.log(to);
})

export default router
