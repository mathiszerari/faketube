<script setup>
import {reactive, ref, onMounted, computed} from 'vue';
import {useFetch} from "@vueuse/core";
const {isFetching, error, data:video} = useFetch('http://localhost:8080/searchPage')

const formattedVideo = computed(()=>{
    return JSON.parse(video.value)
})
</script>

<template>
    <div v-for="(video,index) in formattedVideo.message" :key="index" class="bg-white shadow overflow-hidden sm:rounded-lg flex flex-row-reverse">
        <div class="aspect-w-16 aspect-h-9 flex-shrink-0">
          <video class="object-cover" controls>
            <source :src="video.video_path" type="video/mp4">
          </video>
        </div>
        <div class="p-4 flex-grow">
          <h3 class="text-lg font-bold mb-2 text-right">{{ video.title }}</h3>
          <p class="text-gray-500 text-sm text-right">{{ video.description }}</p>
        </div>
      </div>
      
  </template>
  