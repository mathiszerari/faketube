<script setup>
import {reactive, ref, onMounted, computed} from 'vue';
import {useFetch} from "@vueuse/core";
import * as dayjs from 'dayjs';


// Requête sur le serveur


function checkChannel(channel, words){
     // Fetch
    let score = 0
    words.forEach(word =>{
        if(word==channel){
            score += 500;
        }
    })
    return score;
    
}

function checkTitle(title, words){
    let score = 0
    words.forEach(word =>{
        if(title.includes(word)){
            score += 50;
        }
    })
    return score;
}

function checkTag(tags, userResearch) {
    let score = 0
    let listTags = tags.split("#")
    listTags.forEach(tag =>{
        if(userResearch.includes(tag)){
            score += 75;
        }
    })
    return score;
}

function checkDescription(description, word) {
    if (description.includes(word)) {
        return 25;
    }
    return 0;
}

function checkDate(uploadDate) {
    let dateDiff = dayjs().diff(dayjs(uploadDate), "day")
    if(dateDiff<=1){
        return 100;
    }
    if(dateDiff<=7){
        return 30;
    }
    return 0;   
}
function checkViews(viewsNumber){
    if(viewsNumber>=10){
        return 50;
    }
    return 0;
}

function checkSubscribers(number){
  // Fetch
}

async function getInfoUser(userId){
    const {isFetching, error, data} = await useFetch('http://localhost:8080/getUserById/'+userId)
    return JSON.parse(data.value)
}

async function getVideos(){
    const {isFetching, error, data} = await useFetch('http://localhost:8080/searchVideo')
    return JSON.parse(data.value)
}

async function getVideoScore(video, userResearch){
    let score = 0 
    let infosUser = await getInfoUser(video.publisher_id)
    let words = userResearch.split(" ")

    //Channel

    score += checkChannel(infosUser.message[0].pseudo, words)

    
    //Title
    score += checkTitle(video.title, words)
    score += checkTag(video.tags, userResearch)



    return score

}

onMounted(async () =>{
   let videoInfos =  await getVideos()
   videoInfos.message.forEach(async video => {
        let scoreVideo =  await getVideoScore(video, "voiture")
        console.log(scoreVideo)

   });


})

</script>


<template>
    <main>
        <div>
            {{  }}
            <span v-for="(video,index) in formattedVideo?.message" :key="index">
                {{  }}

               
            </span>
        </div>
    </main>
  </template>