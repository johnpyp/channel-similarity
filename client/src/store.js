/* eslint-disable no-param-reassign */
import Vue from "vue";
import Vuex from "vuex";
import superagent from "superagent";

Vue.use(Vuex);

const baseUrl = process.env.VUE_APP_API;
export default new Vuex.Store({
  state: {
    channels: [],
  },
  mutations: {
    setChannels(state, newChannels) {
      state.channels = Object.freeze(newChannels);
    },
  },
  actions: {
    async updateChannels({ commit }) {
      const { body } = await superagent.get(`${baseUrl}/channels`);
      commit("setChannels", body);
    },
  },
});
