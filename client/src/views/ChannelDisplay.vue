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
      <table class="w-full mt-8 table-auto">
        <thead>
          <tr>
            <th class="px-2 py-2 text-left">
              <button
                class="inline px-1 font-bold border-b border-transparent hover:border-gray-500"
                @click="changeSort('channel')"
              >
                Channel
                <span v-if="sortBy === 'channel'">
                  <span v-if="sortDir === 'asc'">⌃</span>
                  <span v-else>⌄</span>
                </span>
              </button>
            </th>
            <th class="px-2 py-2 text-left">
              <button
                class="inline px-1 font-bold border-b border-transparent hover:border-gray-500"
                @click="changeSort('similarityScore')"
              >
                Similarity Score
                <span v-if="sortBy === 'similarityScore'">
                  <span v-if="sortDir === 'asc'">⌃</span>
                  <span v-else>⌄</span>
                </span>
              </button>
            </th>
            <th class="px-2 py-2 text-left">
              <button
                class="inline px-1 font-bold border-b border-transparent hover:border-gray-500"
                @click="changeSort('sharedViewers')"
              >
                Unique Shared Viewers
                <span v-if="sortBy === 'sharedViewers'">
                  <span v-if="sortDir === 'asc'">⌃</span>
                  <span v-else>⌄</span>
                </span>
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in sortedSimilarites" :key="row.channel">
            <td class="px-4 py-2 border">{{ capitalize(row.channel) }}</td>
            <td class="px-4 py-2 border">
              {{ (row.similarityScore * 100).toFixed(2) }}
            </td>
            <td class="px-4 py-2 border">{{ row.sharedViewers }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { capitalize, zip, sortBy } from "lodash-es";
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
      sortDir: "desc",
      sortBy: "similarityScore",
    };
  },
  computed: {
    displayChannel() {
      return capitalize(this.channel);
    },
    sortedSimilarites() {
      const sorted = sortBy(this.similarities, this.sortBy);
      if (this.sortDir === "desc") sorted.reverse();
      return sorted;
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
    ).map(([channel, similarityScore, sharedViewers]) => ({
      channel,
      similarityScore,
      sharedViewers,
    }));
    this.sully = body.sullygnome_stats;
  },
  methods: {
    changeSort(field) {
      if (this.sortBy === field) {
        if (this.sortDir === "desc") this.sortDir = "asc";
        else if (this.sortDir === "asc") this.sortDir = "desc";
      }
      this.sortBy = field;
    },
    capitalize,
  },
};
</script>

<style scoped></style>
