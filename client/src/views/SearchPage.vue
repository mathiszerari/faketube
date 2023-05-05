<script setup>

import { reactive, ref, onMounted, computed } from 'vue'
import { useFetch } from '@vueuse/core'
import * as dayjs from 'dayjs'
const { isFetching, error, data: video } = useFetch('http://localhost:8080/searchPage')

const formattedVideo = computed(() => {
  return JSON.parse(video.value)
})

const publisherName = reactive({})

async function getInfoUser(userId) {
  const {
    isFetching,
    error,
    data: user
  } = await useFetch('http://localhost:8080/getUserById/' + userId)

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
  let dateDiffsec = dayjs().diff(dayjs(uploadDate), 'second')
  if (dateDiffsec <= 60) {
    dateDiff[uploadDate] = `${dateDiffsec} secondes`
  } else {
    let dateDiffmin = dayjs().diff(dayjs(uploadDate), 'minute')
    if (dateDiffmin > 60) {
      let dateDiffhour = dayjs().diff(dayjs(uploadDate), 'hour')
      if (dateDiffhour > 24) {
        let dateDiffday = dayjs().diff(dayjs(uploadDate), 'day')
        dateDiff[uploadDate] = `${dateDiffday} jours`
      } else {
        dateDiff[uploadDate] = `${dateDiffhour} heures`
      }
    } else {
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



</script>
<template>

  <div
    v-for="video in formattedVideo.message"
    v-if="formattedVideo.message"
    :key="index"
    class="bg-white shadow overflow-hidden sm:rounded-lg flex"
  >
    <div class="aspect-w-16 aspect-h-9 flex-shrink-0">
      <img
        class="object-cover w-full h-full"
        :src="video.miniature_path"
        alt="Miniature de la vidéo"
      />
    </div>
    <div class="p-4 flex-grow">
      <h3 class="text-black font-bold mb-2">{{ video.title }}</h3>
      <p class="text-gray-500 text-sm">{{ video.like_number }} poces blo</p>
      <p class="text-gray-500 text-sm">{{ video.views }} vues</p>
      <p class="text-gray-500 text-sm">il y a {{ dateDiff[video.created_at] }}</p>
      <p class="text-gray-500 text-sm">
        {{ publisherName[video.publisher_id]?.pseudo ?? 'Nom inconnu' }} chaine
      </p>
    </div>
  </div>
</template>

