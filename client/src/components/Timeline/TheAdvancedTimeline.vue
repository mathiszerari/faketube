<script setup>
import {reactive, onMounted, ref} from "vue"
import { useFetch } from '@vueuse/core'

const { isFetching, error, data:products } = useFetch('https://fakestoreapi.com/products') // TO DO Need to change URL with the true URL


</script>

<template>
    <div v-if="!isFetching">
        <div v-for="(product) in JSON.parse(products)" :key="product.id">
            {{product.id}}{{ product.title }}
        </div>
    </div>
    <div v-else>
        <div>
        <!-- TO DO add code link to Loading Videos -->
            Loading...
        </div>
    </div>
    
</template>

