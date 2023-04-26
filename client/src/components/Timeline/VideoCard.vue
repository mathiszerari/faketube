<script setup>

const props = defineProps({
    video: {
        type: Object,
        required: true,
    }
})
</script>

<template>
    <div>
        <img class="video__thumbnail" :src="video.image" :alt="video.title">
        <div>
            <div class="publisher__avatar">
            </div>
            <div class="video__info">
                <span>{{ video.title }}</span>
                <span>{{ video.publisher }}</span>
                <span>{{ video.views }}de vues - {{ video.created_at }}</span>
            </div>
        </div>
    </div>
</template>