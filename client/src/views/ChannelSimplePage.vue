<template>
  <main>
    <div class="w-full overflow-x-hidden">
      <div><img src="../assets/pp.jpg" alt="" class="w-full h-32" /></div>

      <!-- channel info section -->
      <div class="w-9/12 m-auto flex justify-center flex-col items-center mt-2">
        <!-- profile picture -->
        <div>
          <!-- <img src="../assets/ppCarre.png" alt="" class= "rounded-full w-1/4"> -->
          <router-link to="/modifpp"
            ><img src="../assets/ppCarre.png" alt="" class="rounded-full w-1/4 bg-rose-500 m-auto"
          /></router-link>
        </div>
        <!-- channel info text -->
        <div class="flex items-center flex-col text-center">
          <h2>NOM CHAINE</h2>
          <h3>chaine data</h3>
          <!-- description + buttons -->
          <div>
            <!-- ligne de la description avec son bouton de redirection -->
            <div class="flex">
              <h3>description fkjdlkjdjldjlfjlkdjljdljdfljdk...</h3>
              <router-link to="/description">></router-link>
            </div>
            <button class="text-center">S'abonner</button>

            <ul class="flex justify-around">
              <li><router-link to="/description">></router-link></li>
              <li><router-link to="/description">></router-link></li>
              <li><router-link to="/description">></router-link></li>
              <li><router-link to="/description">></router-link></li>
            </ul>
          </div>
        </div>
      </div>

      <InfoChannel
        videoChannelName="toto"
        VideoNumber="3"
        SubscriberNumber="5"
        videoDescription="ma super chaine"
      ></InfoChannel>

      <!-- <H2 class="ml-4 m-auto" >nos vidéos</H2> -->

      <!-- composant video -->
      <div
        class="bg-green-300 grid justify-items-center m-4 w-full min-[550px]:bg-sky-300 min-[550px]:grid justify-items-start"
      >
        <router-link to="/video"
          ><img
            src="../assets/pp.jpg"
            alt=""
            class="rounded-lg mt-4 w-full border-solid border-2 border-sky-950"
        /></router-link>
        <p class="mr-44">titre de la video</p>
        <p class="flex mr-36">10 k vues</p>
        <p>il y a temps</p>

        <button class="w-full w-auto">X</button>
      </div>
      <p>data video</p>

      <!-- VIDEO ACCEUIL -->
      <div class="bg-green-600 flex flex-col justify-center items-center sm:bg-sky-300 sm:w-1/4">
        <router-link to="/video"
          ><img src="../assets/pp.jpg" alt="" class="rounded-lg border-sky-950"
        /></router-link>
        <div>
          <p class="">titre de la video</p>
          <p class="flex">10 k vues</p>
          <p>il y a temps</p>
        </div>

        <button class="w-full w-auto">X</button>
      </div>
      <p>data video</p>

      <!-- composant video -->
      <div class="bg-green-600 flex flex-row justify-center items-start sm:bg-sky-300 sm:w-1/4">
        <router-link to="/video"
          ><img src="../assets/pp.jpg" alt="" class="rounded-lg border-sky-950"
        /></router-link>
        <div>
          <p class="">titre de la video</p>
          <p class="flex">10 k vues</p>
          <p>il y a temps</p>
        </div>

        <button class="w-full w-auto">X</button>
      </div>
      <div>data video</div>
      <!-- <Khaled></Khaled> -->

      <h1>test composant</h1>
      <SelectVideoChannel></SelectVideoChannel>

      <h1>test composant dynamique</h1>
      <SelectVideoChannelDynamic videoTitle="toto"></SelectVideoChannelDynamic>

      <h1>test composant fetch</h1>
      <div>
        <!-- v-if="!isFetching" -->
        <div v-for="video in userVideos" :key="video.id">
          <router-link to="/video">
            <SelectVideoChannelFetch :video="video"></SelectVideoChannelFetch>
          </router-link>
        </div>
      </div>
    </div>
  </main>
</template>

<!-- <script>
console.log("eduardo est gentil")

import SelectVideoChannel from "../components/chaine/SelectVideoChannel.vue";
import SelectVideoChannelDynamic from "../components/chaine/SelectVideoChannelDynamic.vue";
export default{
name: "chaine",
components: {
  
  SelectVideoChannel,
  SelectVideoChannelDynamic,
}
};
</script> -->

<script setup>
import { useFetch } from '@vueuse/core'
import { computed, onMounted, ref, reactive } from 'vue'
// import SelectVideoChannel from "../components/chaine/SelectVideoChannel.vue";
import SelectVideoChannelDynamic from '../components/chaine/SelectVideoChannelDynamic.vue'
import SelectVideoChannelFetch from '../components/chaine/SelectVideoChannelFetch.vue'
import InfoChannel from '../components/chaine/InfoChannel.vue'
import { option } from 'artplayer'
import { useRoute } from 'vue-router'

const route = useRoute()

const userVideos = ref('')

onMounted(async () => {
  const userId = route.params.id
  const {
    isFetching,
    error,
    data: videos
  } = await useFetch(`http://localhost:8080/getVideoByPublisherId/${userId}`)
  userVideos.value = JSON.parse(videos.value).message
})
</script>
