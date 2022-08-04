import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant'
import './utils/dayjs' // 初始化时间
// 加载 Vant 全局样式
import 'vant/lib/index.css'
import './styles/index.less'
import 'amfe-flexible'
// 注册使用 Vant 组件库
Vue.use(Vant)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
