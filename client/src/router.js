import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import ChannelDisplay from "./views/ChannelDisplay.vue";
import Details from "./views/Details.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    { path: "/", component: Home, name: "Home" },
    { path: "/details", component: Details, name: "Details" },
    {
      path: "/:channel",
      component: ChannelDisplay,
      name: "ChannelDisplay",
      props: true,
    },
  ],
});
