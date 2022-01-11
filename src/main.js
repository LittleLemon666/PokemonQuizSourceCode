// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import vuetify from '@/plugins/vuetify' // path to vuetify export
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import VueGoodTablePlugin from 'vue-good-table';
// import the styles
import 'vue-good-table/dist/vue-good-table.css'

Vue.use(ElementUI)
Vue.config.productionTip = false
let globalData = new Vue({
  data: {
    $activityWindowReturn: 'Home',
    $userName: '', //admin
    $firstName: '', //NTUST
    $lastName: '', //CSIE
    $email: '', //b10815000@gapps.ntust.edu.tw
  }
})
Vue.mixin({
  computed: {
    $activityWindowReturn: {
      get: function() { return globalData.$data.$activityWindowReturn },
      set: function(newValue) { globalData.$data.$activityWindowReturn = newValue }
    },
    $userName: {
      get: function() { return globalData.$data.$userName },
      set: function(newValue) { globalData.$data.$userName = newValue }
    },
    $firstName: {
      get: function() { return globalData.$data.$firstName },
      set: function(newValue) { globalData.$data.$firstName = newValue }
    },
    $lastName: {
      get: function() { return globalData.$data.$lastName },
      set: function(newValue) { globalData.$data.$lastName = newValue }
    },
    $email: {
      get: function() { return globalData.$data.$email },
      set: function(newValue) { globalData.$data.$email = newValue }
    }
  }
})
Vue.use(VueGoodTablePlugin);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  vuetify
}).$mount('#app')
