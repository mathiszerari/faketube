<script setup>
import {reactive, ref, onMounted, computed} from 'vue';
import {useFetch} from "@vueuse/core";
import * as dayjs from 'dayjs';
const {isFetching, error, data:video} = useFetch('http://localhost:8080/searchPage')

const formattedVideo = computed(()=>{
    return JSON.parse(video.value)
})
</script>

<template>
    <div v-for="(video,index) in formattedVideo" :key="index" class="bg-white shadow overflow-hidden sm:rounded-lg flex">
        <div class="aspect-w-16 aspect-h-9 flex-shrink-0">
          <img class="object-cover w-full h-full" :src="video.miniature_path" alt="Miniature de la vidéo">
        </div>
        <div class="p-4 flex-grow">
            <h3 class="text-black font-bold mb-2">{{ video.title }}</h3>
            <p class="text-gray-500 text-sm">{{ video.description }}</p>
            <p class="text-gray-500 text-sm">{{ video.like_number }} poces blo</p>
            <p class="text-gray-500 text-sm">{{ video.views }} vues</p>
            <p class="text-gray-500 text-sm">{{ video.pseudo }} vues</p>
          </div>
      </div>
      
      
      
      
  </template>
  