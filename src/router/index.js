import Vue from 'vue'
import Router from 'vue-router'
import Poke from '@/components/Poke.vue'

//懶載入方式，當路由被訪問的時候才載入對應元件
//const Login = resolve => require(['@/components/Login'], resolve)

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/Poke',
    },
    {
      path: '/Poke',
      name: 'Poke',
      component: Poke
    },
  ]
})