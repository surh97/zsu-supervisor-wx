import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
// import './registerServiceWorker';

import Vant, { Toast } from 'vant';
import 'vant/lib/index.css';

import '@/styles/index.scss'; // global css

Vue.use(Vant);
import '@/permission';

Vue.config.productionTip = false;

Toast.allowMultiple(true);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
