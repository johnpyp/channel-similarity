<template>
  <div>
    <div class="flex px-4 py-3 border-b border-gray-400 md:px-8">
      <router-link
        :to="{ name: 'Home' }"
        class="text-lg font-semibold text-blue-600"
      >
        Twitch Channel Similarity
      </router-link>
    </div>
    <div>
      <router-view :key="$route.fullPath" />
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
