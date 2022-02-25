import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './assets/css/golbal.css'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

// 配置axios
import axios from 'axios'
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/'
Vue.prototype.$http = axios

Vue.use(ElementUI);
Vue.config.productionTip = false

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')