import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
Vue.config.productionTip = false

// index.scss 全局scss
import './assets/scss/index.scss';

// tools.js 工具类
import tools from './assets/js/tools.js';
Vue.use(tools);

// serverConfig
axios.get('/serverConfig.json').then(res => {
  Vue.prototype.serverConfig = res.data;
});

// Vant
import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);

// iview
import iView from 'iview';
import 'iview/dist/styles/iview.css';
Vue.use(iView);

// rem
import './config/rem.js'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
