<template>
  <div class="flex justify-center">
    <div v-if="similarities && sully" class="w-full px-4 md:w-1/2 lg:w-1/3">
      <p class="mt-4 mb-4 text-xl font-bold">{{ displayChannel }}</p>
      <p>
        <span class="mr-2 font-semibold">Viewer minutes</span>
        {{ sully.viewminutes.toLocaleString() }}
      </p>
      <p>
        <span class="mr-2 font-semibold">Streamed minutes</span>
        {{ sully.streamedminutes.toLocaleString() }}
      </p>
      <p>
        <span class="mr-2 font-semibold">Average viewers</span>
        {{ sully.avgviewers.toLocaleString() }}
      </p>
      <p>
        <span class="mr-2 font-semibold">Max viewers</span>
        {{ sully.maxviewers.toLocaleString() }}
      </p>
      <div v-for="[chan, sim, viewers] in similarities" :key="chan">
        <div class="relative mb-2">
          <div class="flex text-gray-700">
            <div class="mr-2 font-semibold">{{ capitalize(chan) }}:</div>
            <div>{{ (sim * 100).toFixed(2) }}</div>
            <div class="flex-grow"></div>
            <div>{{ viewers.toLocaleString() }}</div>
          </div>
          <div>
            <div
              class="h-4 text-gray-700 bg-red-400"
              :style="`width: ${sim * 100}%`"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { capitalize, zip } from "lodash-es";
import superagent from "superagent";

const baseUrl = process.env.VUE_APP_API;

export default {
  props: {
    channel: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      similarities: [],
      sully: null,
    };
  },
  computed: {
    displayChannel() {
      return capitalize(this.channel);
    },
  },
  async mounted() {
    const { body } = await superagent.get(
      `${baseUrl}/data/${this.channel.toLowerCase()}`
    );
    const s = body.top_similarity;
    this.similarities = zip(
      s.channel,
      s.similarity.map((x) => Math.sqrt(x)),
      s.shared_unique_viewers
    );
    this.sully = body.sullygnome_stats;
  },
  methods: {
    capitalize,
  },
};
</script>

<style scoped></style>
