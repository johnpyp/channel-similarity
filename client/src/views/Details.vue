<template>
  <div class="flex justify-center">
    <div class="w-full px-4 md:w-1/2 lg:w-1/3">
      <h1 class="mb-4 text-2xl">Detailed Info</h1>
      <div v-if="latex" class="w-full">
        <div :key="latex">{{ latex }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import superagent from "superagent";

export default {
  data() {
    return {
      latex: null,
    };
  },
  watch: {
    latex() {
      console.log("data changed");
      this.$nextTick().then(() => {
        this.reRender();
      });
    },
  },
  async mounted() {
    this.reRender();
    const { body } = await superagent.get(`${process.env.VUE_APP_API}/latex`);
    console.log(body);
    this.latex = body;
  },
  methods: {
    reRender() {
      if (window.MathJax) {
        console.log("rendering mathjax");
        window.MathJax.Hub.Queue(["Typeset", window.MathJax.Hub], () =>
          console.log("done")
        );
      }
    },
  },
};
</script>

<style scoped></style>
