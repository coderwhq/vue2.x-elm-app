import Vue from 'vue'
import moment from 'moment'
import App from './App.vue'
import router from './router/index'
import store from './store/index'

// 这里需要引入mock，这样才会搭建服务器
import './mock/mockServer'

Vue.config.productionTip = false;

// 事件总线
Vue.prototype.$EventBus = new Vue();

Vue.filter('dateformat', function(value) {
  return moment(value).format('YYYY-MM-DD HH:mm:ss');
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
// 1.  联系：$mount和el都是用来将vue实例挂载到dom上的
// 2.  区别：el是自动挂载，$mount是手动挂载
