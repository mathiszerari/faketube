<script setup>
import { useFetch } from '@vueuse/core'
import VideoCard from "./VideoCard.vue";

const { isFetching, error, data:products } = useFetch('https://fakestoreapi.com/products') // TO DO Need to change URL with the true URL


</script>

<template>
    <div class="bg-zinc-800 pt-10">
        <h1 class="text-white font-bold text-2xl pb-5">Recommendation</h1>
        <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5" v-if="!isFetching">
            <div v-for="(product) in JSON.parse(products)" :key="product.id">
                <router-link to="/">
                    <video-card :video="product"></video-card>
                </router-link>
    
            </div>
        </div>
        <div v-else>
            <div>
            <!-- TO DO add code link to Loading Videos -->
                Loading...
            </div>
        </div>
        
    </div>
   
    
</template>

