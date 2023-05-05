<template>
  <div>
    <h2 class="text-white font-bold text-2xl pb-5">Vidéos</h2>
    <div
      class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5"
      v-if="!isFetching"
    >
      <div v-for="video in formattedVideo?.message" :key="video.id">
        <router-link :to="{name: 'watch', params: {id: video.id}}">
          <video-card :video="video"></video-card>
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

<script setup>
import { useFetch } from '@vueuse/core'
import VideoCard from './VideoCard.vue'
import { computed } from 'vue'
import VideoCardSkeleton from './VideoCardSkeleton.vue'
const { isFetching, error, data: videos } = useFetch('http://localhost:8080/getTimelineVideos')
const formattedVideo = computed(() => {
  return JSON.parse(videos.value)
})

const videoUrl = function(videoId){
  return "/watch?id="
}
</script>
