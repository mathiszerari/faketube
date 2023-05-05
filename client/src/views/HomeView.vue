<template>
  <main id="Home-page">
    <div class="bg-zinc-800 pt-10 p-10">
      <TheAdvancedTimeline></TheAdvancedTimeline>
      <TheTimeline></TheTimeline>
    </div>
  </main>
</template>

<script setup>
import TheAdvancedTimeline from '../components/Timeline/TheAdvancedTimeline.vue'
import TheTimeline from '../components/Timeline/TheTimeline.vue'
</script>

<style scoped>
main {
  padding: 0;
}
</style>
