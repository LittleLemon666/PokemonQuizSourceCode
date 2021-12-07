import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home.vue'
import Login from '@/components/Login.vue'
import Signup from '@/components/Signup.vue'
import Activity from '@/components/ActivityWindow.vue'
import DateSelect from '@/components/DateSelect.vue'

//懶載入方式，當路由被訪問的時候才載入對應元件
//const Login = resolve => require(['@/components/Login'], resolve)

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/Home',
      name: 'Home',
      component: Home
    },
    {
      path: '/',
      name: 'Login_Redir',
      component: Login
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login
    },
    {
      path: '/Signup',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/Activity',
      name: 'ActivityWindow',
      component: Activity
    },
    {
      path: '/DateSelect',
      name: 'DateSelect',
      component: DateSelect
    }
  ]
})