<script setup>
import { computed, ref, watch } from 'vue'
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
    return `${Math.floor(diff / 31536000)} years`
  } else if (diff >= 2592000) {
    return `${Math.floor(diff / 2592000)} months`
  } else if (diff >= 604800) {
    return `${Math.floor(diff / 604800)} weeks`
  } else if (diff >= 86400) {
    return `${Math.floor(diff / 86400)} days`
  } else if (diff >= 3600) {
    return `${Math.floor(diff / 3600)} hours`
  } else if (diff >= 60) {
    return `${Math.floor(diff / 60)} minutes`
  } else {
    return `${diff} seconds`
  }
})
</script>
<!-- <template>
    <div class="aspect-video text-white">
        <img class="w-max aspect-video object-cover rounded-2xl" 
        :src="video.miniature_path" 
        :alt="video.title">
        <div class="flex flex-row gap-4 mt-4">
            <div class="publisheravatar bg-zinc-700 rounded-full aspect-square">
            </div>
            <div class="videoinfo flex flex-col">
                <span class="font-bold text-10">{{ video.title }}</span>
                <span class="text-zinc-500">{{ video.publisher_id }}</span>
                <span class="text-zinc-500">{{ video.views }} views - {{ formattedVideoDate }} ago</span>
            </div>
        </div>
    </div>
</template> -->
<template>
  <div class="text-white max-h-25">
    <img
      class="w-1/6 aspect-video object-cover rounded-2xl"
      :src="`http://localhost:8080/thumbnail/${video.id}`"
      :alt="video.title"
    />
    <div class="w-1/6 flex flex-row gap-4 mt-2 shadow-sm bg-green-500">
      <div></div>
      <div class="video__info flex flex-col">
        <span class="font-bold text-10">{{ video.title }}</span>
        <span class="text-zinc-500">{{ video.publisher_id }}</span>
        <span class="text-zinc-500">{{ video.views }} views - {{ formattedVideoDate }} ago</span>
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
