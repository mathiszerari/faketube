<script setup>
import {reactive, ref, onMounted, computed} from 'vue';
import {useFetch} from "@vueuse/core";
import * as dayjs from 'dayjs';


// Requête sur le serveur
const {isFetching, error, data:video} = useFetch('http://localhost:8080/searchVideo')

const formattedVideo = computed(()=>{
    return JSON.parse(video.value)
})

function checkChannel(channel, word){
    if(channel==word){
        return 500;
    }
    return 0;
}

function checkTitle(title, word){
    if(title.includes(word)){
        return 100;
    }
    return 0;
}

function checkTag(tag, word) {
    if (tag.includes(word)) {
        return 75;
    }
    return 0;
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
    if(viewsNumber){

    }
}

function checkSubscribers(number){

}

function getScore(data, userInput){
    let score = 0
    const userWords = userInput.split("+")
    userWords.forEach(word => {
        // score+=checkChannel()
    });
}


</script>


<template>
    <main>
        <div>
            {{ formattedVideo }}
            <span v-for="(video,index) in formattedVideo.message" :key="index">

                {{  }}
            </span>
        </div>
    </main>
  </template>