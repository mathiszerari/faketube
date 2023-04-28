<script setup>
import {reactive, ref, onMounted, computed} from 'vue';
import {useFetch} from "@vueuse/core";
const {isFetching, error, data:video} = useFetch('http://localhost:8080/searchPage')

const formattedVideo = computed(()=>{
    return JSON.parse(video.value)
})
</script>

<template>
    <main>
        <div>
            {{ formattedVideo }}
            <h2>test</h2>
            
           
        </div>
    </main>
  </template>
