import Vue from "vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "./styles/reset.css";
import myaxios from './utils/myaxios.js';
Vue.prototype.axios = myaxios;
import App from "./App.vue";
import router from "./router";
import Print from 'vue-print-nb'

Vue.config.productionTip = false;
Vue.use(Print);
Vue.use(ElementUI);
new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
