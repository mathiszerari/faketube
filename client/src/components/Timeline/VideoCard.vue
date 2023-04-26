<script setup>

const props = defineProps({
    video: {
        type: Object,
        required: true,
    }
})
</script>

<template>
    <div class="aspect-video text-white">
        <img class="w-max aspect-video object-cover rounded-2xl" 
        :src="video.image" 
        :alt="video.title">
        <div class="flex flex-row gap-4 mt-4">
            <div class="publisher__avatar bg-zinc-700 rounded-full aspect-square">
            </div>
            <div class="video__info flex flex-col">
                <span class="font-bold">{{ video.title }}</span>
                <span class="text-zinc-500">{{ video.category }}</span>
                <span class="text-zinc-500">{{ video.rating.count }} de vues - {{ video.price }}</span>
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