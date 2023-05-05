<script setup>
import { computed, ref, watch, onMounted, reactive } from 'vue'
import { useFetch } from '@vueuse/core'
import * as dayjs from 'dayjs'
const props = defineProps({
  video: {
    type: Object,
    required: true
  }
})
const formattedVideoDate = computed(() => {
  const videoDateFormatted = dayjs(props.video.created_at)
  const now = dayjs()
  const diff = now.diff(videoDateFormatted, 'second')
  if (diff >= 31536000) {
    return `${Math.floor(diff / 31536000)} ans`
  } else if (diff >= 2592000) {
    return `${Math.floor(diff / 2592000)} mois`
  } else if (diff >= 604800) {
    return `${Math.floor(diff / 604800)} semaine`
  } else if (diff >= 86400) {
    return `${Math.floor(diff / 86400)} jours`
  } else if (diff >= 3600) {
    return `${Math.floor(diff / 3600)} heures`
  } else if (diff >= 60) {
    return `${Math.floor(diff / 60)} minutes`
  } else {
    return `${diff} secondes`
  }
})
const publisherInfos = reactive({ pseudo: '', id: '', profilePicture: '' })
onMounted(async () => {
  const { isFetching, error, data } = await useFetch(
    `http://localhost:8080/getUserById/${props.video.publisher_id}`
  )
  const formattedData = JSON.parse(data.value).message[0]
  publisherInfos.pseudo = formattedData.pseudo
  publisherInfos.id = formattedData.id
  publisherInfos.profilePicture = formattedData.profile_photo
})
</script>
<template>
  <div class="aspect-video text-white">
    <img
      class="w-max aspect-video object-cover rounded-2xl"
      :src="`http://localhost:8080/thumbnail/${video.id}`"
      :alt="video.title"
    />
    <div class="flex flex-row gap-4 mt-4">
      <div class="publisher__avatar bg-zinc-700 rounded-full aspect-square">
        <img
          :src="publisherInfos.profilePicture"
          :alt="`${publisherInfos.pseudo} profile picture`"
          class="rounded-full w-full h-full"
        />
      </div>
      <div class="video__info flex flex-col">
        <span class="font-bold text-10">{{ video.title }}</span>
        <span class="text-zinc-500">{{ publisherInfos.pseudo }}</span>
        <span class="text-zinc-500">{{ video.views }} vues - il y a {{ formattedVideoDate }}</span>
      </div>
    </div>
  </div>
</template>
<style scoped>
.publisher__avatar {
  width: 50px;
  height: 50px;
}
</style>
