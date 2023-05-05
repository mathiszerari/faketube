<template>
  <main id="Home-page">
    <div class="bg-zinc-800 pt-10 p-10">

      <div v-if="userId.value !== ''">
        <TheAdvancedTimeline></TheAdvancedTimeline>
      </div>
      <TheTimeline></TheTimeline>
    </div>
    {{ userId.value }}

  </main>
</template>

<script setup>
import TheAdvancedTimeline from '../components/Timeline/TheAdvancedTimeline.vue'
import TheTimeline from '../components/Timeline/TheTimeline.vue'

import { onMounted, ref } from 'vue'

const userId = ref("");

onMounted(() => {
  if (localStorage.getItem('id')) {
    userId.value = localStorage.getItem('id')
  }

  console.log(userId.value);
})
</script>

<style scoped>
main {
  padding: 0;
}
</style>
