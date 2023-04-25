<script setup>
import {reactive, ref, onMounted } from 'vue';

const testDummy = ref("")

// Requête sur le serveur
async function fetchTest(){
  const data = await fetch('http://localhost:8080/welcome');
  const pokeInfo = await data.json()
  console.log(pokeInfo);
  testDummy.value = pokeInfo
}

onMounted(() => {
  fetchTest();
})

</script>

<template>
  <main>
    {{ testDummy.message }}
    <h1 class="text-3xl font-bold underline">
    Hello world!
  </h1>
  </main>
</template>
