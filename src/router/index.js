import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import(/* webpackChunkName: "about" */ '@/components/CommonLayout.vue'),
    children:[
      {
        path:'',
        component:()=>import('@/views/Home.vue'),
        name:'home'
      },
      {
        path:'/detail/:id',
        component:()=>import('@/views/Detail.vue')
      },
      {
        path:'/personal',
        component:()=>import('@/views/Personal.vue')
      }
    ]
  },
  {
    path:'/login',
    component: () => import('@/views/Login.vue')
  }

]

const router = new VueRouter({
  routes
})

export default router
