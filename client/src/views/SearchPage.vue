<script setup>
import {reactive, ref, onMounted, computed} from 'vue';
import {useFetch} from "@vueuse/core";
const {isFetching, error, data:video} = useFetch('http://localhost:1010/searchPage')

const formattedVideo = computed(()=>{
    return JSON.parse(video.value)
})
</script>

<template>
    <main>
      <div>
        <h2>Liste des vidéos</h2>

        <div v-for="video in formattedVideo.message" :key="video.id">
            <h3>{{ video.title }}</h3>
            <p>{{ video.description }}</p>
            <video controls>
                <source :src="video.video_path" type="video/mp4">
            </video>
        </div>
          
        </div>
    </main>
  </template>