<template>
  <div>
    <div class="flex px-4 py-3 bg-blue-200 md:px-8">
      <router-link
        :to="{ name: 'Home' }"
        class="text-lg font-semibold text-gray-700"
      >
        Twitch Channel Similarity
      </router-link>
    </div>
    <div>
      <router-view />
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
