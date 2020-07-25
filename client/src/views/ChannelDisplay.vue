<template>
  <div class="flex justify-center">
    <div class="w-full px-4 md:w-1/2 lg:w-1/3">
      <p class="mt-4 mb-4 text-xl font-bold">{{ displayChannel }}</p>
      <table v-if="similarities" class="w-full mt-8 table-auto">
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
            <td class="px-4 py-2 border">
              <router-link
                :to="{
                  name: 'ChannelDisplay',
                  params: { channel: capitalize(row.channel) },
                }"
                class="border-b border-transparent hover:border-blue-500 hover:text-blue-600"
                >{{ capitalize(row.channel) }}</router-link
              >
            </td>
            <td class="px-4 py-2 border">
              {{ Math.round(row.similarityScore) }}x
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
    this.similarities = zip(s.channel, s.similarity, s.shared_unique_viewers)
      .map(([channel, similarityScore, sharedViewers]) => ({
        channel,
        similarityScore,
        sharedViewers,
      }))
      .filter((x) => x.channel.toLowerCase() !== this.channel.toLowerCase());
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
