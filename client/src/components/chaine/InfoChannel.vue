<template>
  <!-- channel info section -->
    <div class="w-9/12 m-auto flex justify-center flex-col items-center mt-2">
        <!-- profile picture -->
        <div>
            <!-- <img src="../assets/ppCarre.png" alt="" class= "rounded-full w-1/4"> -->
            <router-link to="/modifpp"><img src="../../assets/ppCarre.png" alt="pp"
                                            class="rounded-full w-1/4 bg-rose-500 m-auto"></router-link>
        </div>
        <!-- channel info text -->
        <div class="flex items-center flex-col text-center">

            <h2>{{ user.pseudo }}</h2>
            <h3>{{ user.subscriber_number }} abonnés</h3>
            <!-- description + buttons -->
            <div>
                <!-- ligne de la description avec son bouton de redirection -->
                <div class="flex">
                    <h3>{{ user.description }} </h3>
                    <router-link to="/description">></router-link>
                </div>
                <button class="text-center">S'abonner</button>
                <button class="text-center">modifier profil</button>

                <ul class="flex justify-around">
                    <li>
                        <router-link to="/description">></router-link>
                    </li>
                    <li>
                        <router-link to="/description">></router-link>
                    </li>
                    <li>
                        <router-link to="/description">></router-link>
                    </li>
                    <li>
                        <router-link to="/description">></router-link>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>


<script setup>

import {onMounted, reactive} from "vue";
import {useFetch} from "@vueuse/core";

const user = reactive({pseudo: "", subscriber_number: "", description: ""})

onMounted(async () => {
    const {
        isFetching,
        error,
        data: use
    } = await useFetch(`http://localhost:8080/getUserById/${localStorage.getItem("id")}`)
    user.pseudo = JSON.parse(use.value).message[0]["pseudo"]
    user.subscriber_number = JSON.parse(use.value).message[0]["subscriber_number"]
    user.description = JSON.parse(use.value).message[0]["description"]
})

</script>