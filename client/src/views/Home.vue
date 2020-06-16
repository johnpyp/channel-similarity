<template>
  <div class="flex justify-center">
    <div class="w-full px-4 md:w-1/2 lg:w-1/3">
      <div class="flex-wrap my-6 md:flex md:items-center">
        <div v-if="latex" class="w-full">
          <vue-mathjax :formula="latex"></vue-mathjax>
        </div>
        <div>
          <label
            class="block pr-4 mb-1 font-bold text-gray-600 md:text-right md:mb-0"
            for="inline-full-name"
          >
            Channel Search
          </label>
        </div>
        <div class="md:w-2/3">
          <input
            v-model="filterKey"
            class="w-full px-4 py-2 leading-tight text-gray-700 bg-gray-200 border-2 border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-blue-400"
            type="text"
            placeholder="Channel name"
          />
        </div>
      </div>
      <div v-for="channel in filteredChannels" :key="channel">
        <div class="px-4 py-2 my-2 bg-gray-200 rounded-sm">
          <router-link
            :to="{ name: 'ChannelDisplay', params: { channel } }"
            class="text-gray-700 border-b border-gray-500 hover:text-blue-600"
          >
            {{ channel }}
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { capitalize } from "lodash-es";
import superagent from "superagent";

export default {
  data() {
    return {
      filterKey: null,
      latex: null,
    };
  },
  computed: {
    ...mapState({
      channels: (s) => [...s.channels].sort(),
    }),
    filteredChannels() {
      if (!this.filterKey) return [];
      return Object.freeze(
        this.channels
          .filter((c) => c.includes(this.filterKey ?? ""))
          .map((x) => capitalize(x))
      );
    },
  },
  async mounted() {
    this.$store.dispatch("updateChannels");
    const { body } = await superagent.get(`${process.env.VUE_APP_API}/latex`);
    console.log(body);
    this.latex = body;
  },
};
</script>

<style scoped></style>
