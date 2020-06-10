<template>
  <div class="flex justify-center">
    <div v-if="channel" class="w-full px-4 md:w-1/2 lg:w-1/3">
      <p class="mt-4 mb-4 font-bold">{{ displayChannel }}</p>
      <div v-for="(amount, chan) in similarities" :key="chan">
        <div class="relative my-2">
          <div class="text-gray-700">
            {{ capitalize(chan) }}: {{ (amount * 100).toFixed(2) }}%
          </div>
          <div>
            <div
              class="h-4 text-gray-700 bg-red-400"
              :style="`width: ${amount * 100}%`"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { capitalize } from "lodash-es";
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
    this.similarities = body;
  },
  methods: {
    capitalize,
  },
};
</script>

<style scoped></style>
