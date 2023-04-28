<template>
    <div class="bg-zinc-800 pt-10">
        <h2 class="text-white font-bold text-2xl pb-5">Video</h2>
        <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5" v-if="!isFetching">
            <div v-for="(video) in formattedVideo.message" :key="video.id">
                <router-link to="/video">
                    <video-card :video="video"></video-card>
                </router-link>

            </div>
        </div>
        <div v-else>
            <div>
                Loading...
            </div>
        </div>

    </div>


</template>

<script setup>
import { useFetch } from '@vueuse/core'
import VideoCard from "./VideoCard.vue";
 
const { isFetching, error, data:videos } = useFetch('http://localhost:8080/getTimelineVideos%27')

const formattedVideo = computed(()=>{
    return formattedVideo.message
})

</script>
