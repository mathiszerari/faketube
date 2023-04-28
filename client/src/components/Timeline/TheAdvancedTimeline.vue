<script setup>
import { useFetch } from '@vueuse/core'
import VideoCard from "./VideoCard.vue";
import { computed } from 'vue'

const { isFetching, error, data:videos } = useFetch('http://localhost:8080/getAdvancedTimelineVideos')
const formattedVideo = computed(()=>{
    return JSON.parse(videos.value)
})

</script>

<template>
    <div class="bg-zinc-800 pt-10">
        <h2 class="text-white font-bold text-2xl pb-5">Recommendation</h2>
        <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5" v-if="!isFetching">
            <div v-for="(videoData) in formattedVideo?.message" :key="videoData.id">
                <router-link :to="{name: video, params: { id: videoData.id} }">
                    <video-card :video="videoData"></video-card>
                </router-link>
    
            </div>
        </div>
        <div v-else>
            <div>
            <!-- TO DO add code link to Loading Videos -->
                Loading...
            </div>
        </div>
        
    </div>
   
    
</template>

