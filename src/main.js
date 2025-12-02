import Vue from 'vue'
import App from './App.vue'
import router from './router'

import 'semantic-ui-css/semantic.min.css';

import axios from 'axios';
axios.defaults.withCredentials = true;

Vue.config.productionTip = false ;

new Vue({
  router,
  data: {
    user: null
  },
  render: h => h(App)
}).$mount('#app');