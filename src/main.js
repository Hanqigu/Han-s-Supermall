import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

// new一个Vue实例来作为事件总线
Vue.prototype.$bus = new Vue();

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
