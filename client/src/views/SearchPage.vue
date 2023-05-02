<script setup>
import {reactive, ref, onMounted, computed} from 'vue';
import {useFetch} from "@vueuse/core";
const {isFetching, error, data:video} = useFetch('http://localhost:8080/searchPage')

const formattedVideo = computed(()=>{
    return JSON.parse(video.value)
})
</script>

<template>
    <div v-for="(video,index) in formattedVideo.message" :key="index" class="bg-white shadow overflow-hidden sm:rounded-lg flex">
        <div class="aspect-w-16 aspect-h-9 flex-shrink-0">
            <img class="object-cover w-full h-full" :src="video.miniature_path" alt="Miniature de la vidéo">
        </div>
        <div class="p-4 flex-grow">
          <h3 class="text-black font-bold mb-2">{{ video.title }}</h3>
          <p class="text-gray-500 text-sm">{{ video.description }}</p>
        </div>
    </div>
      
      
      
  </template>
  