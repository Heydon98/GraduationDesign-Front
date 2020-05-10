// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.prototype.$axios = axios;
//添加请求拦截器，在请求头加token
axios.interceptors.request.use(
    config => {
      if (sessionStorage.getItem('token')) {
        config.headers['token'] = sessionStorage.getItem('token');
      }

      return config;
    },
    error => {
      return Promise.reject(error);
    });

Vue.config.productionTip = false
Vue.use(ElementUI)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
