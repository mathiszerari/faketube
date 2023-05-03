<script setup>
import {reactive, ref, onMounted, computed} from 'vue';
import {useFetch} from "@vueuse/core";


const formattedVideo = computed(()=>{
    return JSON.parse(video.value)
})

</script>

<template>
  <main>
      <div>
          <span v-for="(video,index) in formattedVideo.message" :key="index">
              {{ video.pseudo }}
              {{ video.id }}
          </span>
      </div>
      <h1 class="text-3xl font-bold underline">
    Hello world!
  </h1>
  </main>
</template>
