<script setup>
import {reactive, ref, onMounted, computed} from 'vue';
import {useFetch} from "@vueuse/core";
import * as dayjs from 'dayjs';
import SearchBar from '../components/recherche/SearchBar.vue'
import SearchFilter from '../components/recherche/SearchFilter.vue'
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
    publisherName[user] = userInfo.message[0] 
}

onMounted(async () => {
    if (formattedVideo.value && formattedVideo.value.message) { 
        for (let video of formattedVideo.value.message) {
            await UserBot(video.publisher_id)
        }
    }
})

const dateDiff = reactive({})

async function checkDate(uploadDate) {
  let dateDiffsec = dayjs().diff(dayjs(uploadDate), "second")
  if(dateDiffsec<=60){
      dateDiff[uploadDate] = `${dateDiffsec} secondes`
  }
  else {
      let dateDiffmin = dayjs().diff(dayjs(uploadDate), "minute")
      if (dateDiffmin>60) {
          let dateDiffhour = dayjs().diff(dayjs(uploadDate), "hour")
          if (dateDiffhour>24) {
              let dateDiffday = dayjs().diff(dayjs(uploadDate), "day")
              dateDiff[uploadDate] = `${dateDiffday} jours`
          }
          else{
              dateDiff[uploadDate] = `${dateDiffhour} heures`
          }
      }
      else {
          dateDiff[uploadDate] = `${dateDiffmin} minutes`
      }
  }
}

onMounted(async () => {
  if (formattedVideo.value && formattedVideo.value.message) { 
      for (let video of formattedVideo.value.message) {
          await checkDate(video.created_at)
      }
  }
})

// function test() {
//    if(formattedVideo.message) {
//     console.log("test");
//    }
    
// }
// test()



</script>
<template>
    <div class="main-container flex flex-col w-full ml-20">
        <SearchBar></SearchBar>
        <SearchFilter></SearchFilter>
        <div class="bg-zinc-800 w-full flex flex-col gap-y-4">
            <div v-for="(video) in formattedVideo.message" v-if="formattedVideo.message"  class="bg-gray shadow overflow-hidden sm:rounded-lg flex max-sm:flex-col">
                <div class="aspect-w-16 aspect-h-9 flex-shrink-0">
                <img class="object-cover w-80 h-48 max-md:w-56 max-md:h-32 rounded-2xl" :src="video.minature_path" alt="Miniature de la vidéo">
                </div>
                <div class="p-4 flex-grow flex flex-col justify-center">
                    <h3 class="text-white text-xl font-bold mb-2">{{ video.title }}</h3>
                    <div class="views-date flex gap-2">
                        <p class="text-gray-500 text-sm">{{ video.views }} vues</p>
                        <p class="text-gray-500 text-sm">• il y a {{ dateDiff[video.created_at] }}</p>
                    </div>
                    <div class="views-date flex gap-2 mt-3">
                        <img class="object-cover rounded-full w-8 h-8" :src="publisherName[video.publisher_id]?.profile_photo" alt="Image de la chaine">
                        <p class="text-gray-500 text-sm flex items-center">{{ publisherName[video.publisher_id]?.pseudo ?? 'Nom inconnu' }} chaine</p>
                    </div>
                    
                </div>
            </div>
        </div>
    </div>
</template>