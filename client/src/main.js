import Vue from "vue";
import VueVirtualScroller from "vue-virtual-scroller";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import "./main.css";
import "vue-virtual-scroller/dist/vue-virtual-scroller.css";

Vue.use(VueVirtualScroller);

new Vue({
  store,
  router,
  render: (h) => h(App),
}).$mount("#app");
