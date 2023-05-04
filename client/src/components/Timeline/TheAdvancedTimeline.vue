<script setup>
import { useFetch } from '@vueuse/core'
import VideoCard from './VideoCard.vue'
import { computed, ref, onMounted } from 'vue'
import VideoCardSkeleton from './VideoCardSkeleton.vue'
const {
  isFetching,
  error,
  data: videos
} = useFetch('http://localhost:8080/getAdvancedTimelineVideos?userId=1')
const formattedVideo = computed(() => {
  return JSON.parse(videos.value)
})

const showVideos = computed(()=>{
  return formattedVideo.value !== null
})
const userId = ref('')
onMounted(() => {
  if (localStorage.getItem('id')) {
    userId.value = localStorage.getItem('id')
  }

  console.log(showVideos.value);

})
</script>

<template>
  <div v-if="userId !== '' && !showVideos">
    <h2 class="text-white font-bold text-2xl pb-5">Recommandations</h2>
    <div
      class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5"
      v-if="!isFetching"
    >
      <div v-for="videoData in formattedVideo?.message" :key="videoData.id">
        <router-link :to="{name: 'watch', params: {id: videoData.id}}">
          <video-card :video="videoData"></video-card>
        </router-link>
      </div>
    </div>
    <div
      class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5"
      v-else
    >
      <div v-for="index in 5" :key="index">
        <video-card-skeleton></video-card-skeleton>
      </div>
    </div>
  </div>
</template>
