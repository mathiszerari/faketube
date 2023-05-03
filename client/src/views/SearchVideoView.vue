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
            console.log("channel :",word);
            score += 500;
        }
    })
    return score;
    
}

function checkTitle(title, words){
    let score = 0
    words.forEach(word =>{
        if(title.includes(word)){
            console.log("title:",word);
            score += 50;
        }
    })
    return score;
}

function checkTag(tags, userResearch) {
    let score = 0
    let listTags = tags.split("#").splice(1)
    listTags.forEach(tag =>{
        if(userResearch.includes(tag)){
            console.log("tags:",tag);
            score += 75;
        }
    })
    return score;
}

function checkDescription(description, words) {
    let score = 0
    words.forEach(word =>{
        if(description.includes(word)){
            console.log("desc:",word);
            score += 25;
        }
    })
    return score;
}

function checkDate(uploadDate) {
    let score = 0
    let dateDiff = dayjs().diff(dayjs(uploadDate), "day")
    if(dateDiff<=1){
        console.log("date1",uploadDate);
        score+= 100;
    }
    if(dateDiff<=7){
        console.log("date2",uploadDate);
        score+= 30;
    }
    return score  
}
function checkViewsOrSubscribers(number){
    let score = 0
    if(number>=10){
        console.log("views/subs:", number);
        score+=50
    }
    return score;
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
    //Tags
    score += checkTag(video.tags, userResearch)
    //Description
    score += checkDescription(video.description, words)
    //Date
    score+=checkDate(video.created_at)
    //Views
    score+=checkViewsOrSubscribers(video.views)
    //Subscribers
    score+=checkViewsOrSubscribers(infosUser.message[0].subscriber_number)

    return score

}

function compare (a, b){
    console.log("a:" ,a.score);
    console.log("b:",b.score);
    if(a.score < b.score){
        return -1;
    }
    if(a.score > b.score){
        return 1;
    }
    return 0;
}
const videoScores = ref([])
/*async function getSortedVideosByScore(){
    let videoInfos = await getVideos()
    console.log("Video info",videoInfos);
    videoInfos.message.forEach(async video => {
        let scoreVideo = await getVideoScore(video, "voiture")
        videoScores.value.push({video:video,score:scoreVideo})
        console.log(videoScores.value.length);
    })
    
    console.log(videoScores.value.length);
    videoScores.value.sort((a, b) => b.score - a.score);
}*/

onMounted(async () =>{
    const videosInfos = await getVideos()
    console.log(videosInfos);
    const promises = videosInfos.message.map((info)=>{
        return getVideoScore(info, "voiture")
    })
    const score = await Promise.all(promises)
    videoScores.value = videosInfos.message.map((info, index)=>{
    return {video: info, score: score[index]}
  })
  console.log("len :",videoScores.value.length);
  //Separer en fonction haut
  videoScores.value.sort((a, b) => b.score - a.score);
  videoScores.value.forEach(score=>{
    console.log("===================");
    console.log(score.score);
  })
});




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