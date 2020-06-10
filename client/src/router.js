import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import ChannelDisplay from "./views/ChannelDisplay.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    { path: "/", component: Home, name: "Home" },
    {
      path: "/:channel",
      component: ChannelDisplay,
      name: "ChannelDisplay",
      props: true,
    },
  ],
});
