// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import vuetify from '@/plugins/vuetify' // path to vuetify export
//import VuetifyDialog from 'vuetify-dialog'
//import 'vuetify-dialog/dist/vuetify-dialog.css' 
import Login from './components/Login.vue'
import Home from './components/Home.vue'
import Signup from './components/Signup.vue'
import Activity from './components/ActivityWindow.vue'
import DateSelect from './components/DateSelect.vue'

Vue.use(ElementUI)
Vue.config.productionTip = false
//Vue.use(VuetifyDialog)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  vuetify
}).$mount('#app')
