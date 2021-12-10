import Vue from 'vue'
import Router from 'vue-router'
import HomeMain from '@/components/HomeMain.vue'
import Home from '@/components/Home.vue'
import Login from '@/components/Login.vue'
import Signup from '@/components/Signup.vue'
import ActivityWindow from '@/components/ActivityWindow.vue'
import DateSelect from '@/components/DateSelect.vue'
import Activity from '@/components/Activity.vue'
import Booking from '@/components/Booking.vue'

//懶載入方式，當路由被訪問的時候才載入對應元件
//const Login = resolve => require(['@/components/Login'], resolve)

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HomeMain',
      component: HomeMain,
      children: [
        {
          path: 'home',
          name: 'Home',
          component: Home
        },
        {
          path: 'activity',
          name: 'Activity',
          component: Activity
        },
        {
          path: 'booking',
          name: 'Booking',
          component: Booking
        },
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/activityWindow',
      name: 'ActivityWindow',
      component: ActivityWindow
    },
    {
      path: '/dateSelect',
      name: 'DateSelect',
      component: DateSelect
    },
    {
      path: '/*',
      redirect: '/home'
    }
  ]
})