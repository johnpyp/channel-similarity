import "regenerator-runtime/runtime";
import Vue from "vue";
import VueMathjax from "vue-mathjax";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import "./main.css";

Vue.use(VueMathjax);

new Vue({
  store,
  router,
  render: (h) => h(App),
}).$mount("#app");
