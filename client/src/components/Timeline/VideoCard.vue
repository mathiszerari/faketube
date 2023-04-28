<script setup>
import { computed } from 'vue'
import * as dayjs from 'dayjs'

const props = defineProps({
    video: {
        type: Object,
        required: true,
    }
})

const videoDateSinceBySeconds = computed( ()=>{
    const videoDateFormatted = dayjs(props.video.created_at)
    return dayjs().diff(videoDateFormatted, 'second')
})
const videoDateSinceByMinutes = computed( ()=>{
    const videoDateFormatted = dayjs(props.video.created_at)
    return dayjs().diff(videoDateFormatted, 'minute')
}) 
const videoDateSinceByHours = computed( ()=>{
    const videoDateFormatted = dayjs(props.video.created_at)
    return dayjs().diff(videoDateFormatted, 'hour')
})
const videoDateSinceByDays = computed( ()=>{
    const videoDateFormatted = dayjs(props.video.created_at)
    return dayjs().diff(videoDateFormatted, 'day')
}) 
const videoDateSinceByWeeks = computed( ()=>{
    const videoDateFormatted = dayjs(props.video.created_at)
    return dayjs().diff(videoDateFormatted, 'week')
}) 
const videoDateSinceByMonths = computed( ()=>{
    const videoDateFormatted = dayjs(props.video.created_at)
    return dayjs().diff(videoDateFormatted, 'month')
})
const videoDateSinceByYears = computed( ()=>{
    const videoDateFormatted = dayjs(props.video.created_at)
    return dayjs().diff(videoDateFormatted, 'year')
})
const formattedVideoDate = computed(()=>{
    let sinceValueDate = "";
    if(videoDateSinceByYears.value != 0){
        sinceValueDate = `${videoDateSinceByYears.value} years`
    }else if(videoDateSinceByMonths.value != 0){
        sinceValueDate = `${videoDateSinceByMonths.value} months`
    }else if(videoDateSinceByWeeks.value != 0){
        sinceValueDate = `${videoDateSinceByWeeks.value} weeks`
    }else if(videoDateSinceByDays.value != 0){
        sinceValueDate = `${videoDateSinceByDays.value} days`
    }else if(videoDateSinceByHours.value != 0){
        sinceValueDate = `${videoDateSinceByHours.value} hours`
    }else if (videoDateSinceByMinutes.value != 0) {
        sinceValueDate = `${videoDateSinceByMinutes.value} minutes`
    }else{
        sinceValueDate = `${videoDateSinceBySeconds.value} seconds`
    }
    return sinceValueDate
})



</script>

<template>
    <div class="aspect-video text-white">
        <img class="w-max aspect-video object-cover rounded-2xl" 
        :src="video.miniature_path" 
        :alt="video.title">
        <div class="flex flex-row gap-4 mt-4">
            <div class="publisher__avatar bg-zinc-700 rounded-full aspect-square">
            </div>
            <div class="video__info flex flex-col">
                <span class="font-bold text-10">{{ video.title }}</span>
                <span class="text-zinc-500">{{ video.publisher_id }}</span>
                <span class="text-zinc-500">{{ video.views }} views - {{ formattedVideoDate }} ago</span>
            </div>
        </div>
    </div>
</template>

<style scoped>

.publisher__avatar{
    width: 50px;
    height: 50px;
}
</style>