// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import '@/assets/css/index.css'
// 引入ElementUI
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 引入axios
import axios from 'axios'
Vue.prototype.$http = axios
// 配置公共的接口地址：
// 只要配置该基础地址后，axios会在每次发送请求的时候，将 baseUrl 和 当前请求的接口 合并到一起
axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'
// axios 拦截器
axios.interceptors.request.use(function (config) {
  // 所有请求之前都要执行的操作
  // console.log('axios 的请求拦截器', config)
  // 如果是login，不添加header
  if (config.url.indexOf('login') <= -1) {
    // 给请求头中添加 Authorization 请求头：
    config.headers.Authorization = localStorage.getItem('token')
  }
  return config
})
// 安装ElementUI插件
Vue.use(ElementUI)
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
