<script setup>
import {reactive, ref, onMounted, computed} from 'vue';
import {useFetch} from "@vueuse/core";
import * as dayjs from 'dayjs';
const {isFetching, error, data:video} = useFetch('http://localhost:8080/searchPage')

const formattedVideo = computed(()=>{
    return JSON.parse(video.value)
})

const publisherName = reactive({})

async function getInfoUser(userId){
    const {isFetching, error, data:user} = await useFetch('http://localhost:8080/getUserById/'+userId)
    
    return JSON.parse(user.value)
}
async function UserBot(user) {
    let userInfo = await getInfoUser(user)
    publisherName[user] = userInfo.message[0] // stocker la valeur dans publisherName
}

onMounted(async () => {
    if (formattedVideo.value && formattedVideo.value.message) { // vérifier l'existence de la valeur de formattedVideo
        for (let video of formattedVideo.value.message) {
            await UserBot(video.publisher_id)
        }
    }
})
</script>
<template>

    <div v-for="(video,index) in formattedVideo.message" v-if="formattedVideo.message" :key="index" class="bg-white shadow overflow-hidden sm:rounded-lg flex">
        <div class="aspect-w-16 aspect-h-9 flex-shrink-0">
          <img class="object-cover w-full h-full" :src="video.miniature_path" alt="Miniature de la vidéo">
        </div>
        <div class="p-4 flex-grow">
            <h3 class="text-black font-bold mb-2">{{ video.title }}</h3>
            <p class="text-gray-500 text-sm">{{ video.description }}</p>
            <p class="text-gray-500 text-sm">{{ video.like_number }} poces blo</p>
            <p class="text-gray-500 text-sm">{{ video.views }} vues</p>
            <p class="text-gray-500 text-sm">il y a {{ video.created_at }}</p>
            <p class="text-gray-500 text-sm">{{ publisherName[video.publisher_id].pseudo }} chaine</p> <!-- afficher la valeur stockée dans publisherName -->
        </div>
    </div>
</template>
