// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import vuetify from '@/plugins/vuetify' // path to vuetify export
import 'material-design-icons-iconfont/dist/material-design-icons.css'

Vue.use(ElementUI)
Vue.config.productionTip = false
Vue.prototype.$userName = 'admin'
Vue.prototype.$firstName = 'NTUST'
Vue.prototype.$lastName = 'CSIE'
Vue.prototype.$email = 'b10815000@gapps.ntust.edu.tw'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  vuetify
}).$mount('#app')
