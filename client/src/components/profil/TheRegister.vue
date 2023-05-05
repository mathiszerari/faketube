<template>
    <div class="form-wrapper">
        <form @submit.prevent="registerFunction" class="form">
            <div class="header">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/YouTube_full-color_icon_%282017%29.svg/640px-YouTube_full-color_icon_%282017%29.svg.png"
                     alt="Logo YouTube">
                <h1>Inscription</h1>
            </div>
            <div class="form-group">
                <label for="profileImage" class="label">Image de profil:</label>
                <input type="file" id="profileImage" name="profileImage" accept="image/*" @change="onFileChange">
            </div>
            <div class="form-group">
                <label for="pseudo" class="label">Pseudo:</label>
                <input type="text" id="pseudo" name="pseudo" v-model="pseudo" class="input">
            </div>
            <div class="form-group">
                <label for="email" class="label">Email:</label>
                <input type="email" id="email" name="email" v-model="email" class="input">
            </div>
            <div class="form-group">
                <label for="password" class="label">Mot de passe:</label>
                <input type="password" id="password" name="password" v-model="password" class="input">
            </div>
            <div class="form-group">
                <label for="confirmPassword" class="label">Confirmer le mot de passe:</label>
                <input type="password" id="confirmPassword" name="confirmPassword" v-model="confirmPassword"
                       class="input">
            </div>
            <div class="form-field">
                <label for="pref" class="label">Preferences: (Séparez avec des espaces)</label>
                <input type="pref" id="pref" name="pref" v-model="pref"
                       class="input">
            </div>
            <div class="error-message">
                {{ message.message }}
            </div>
            <button @click="login()">Se connecter</button>
            <div class="form-group">
                <button type="submit" :disabled="!isFormValid" @click="registerFunction()" class="button">S'inscrire
                </button>
            </div>
        </form>
    </div>
</template>


<script setup>
import {useFetch} from "@vueuse/core";
import {computed, reactive, ref} from "vue";
import {useRoute, useRouter} from "vue-router";

const router = useRouter();
const route = useRoute();

let message = reactive({message: ""})

const registerFunction = async (key, value) => {
    if (!isFormValid) {
        return;
    }

    const {
        isFetching,
        error,
        data: dbmessage
    } = await useFetch(`http://localhost:8080/register/${pseudo.value}/${email.value}/${password.value}/${pref.value}`);
    message.message = JSON.parse(dbmessage.value)["message"]

    if (JSON.parse(dbmessage.value)["valide"] !== "false") {
        localStorage.setItem("id", JSON.parse(dbmessage.value)["id"]);
        await router.push({name: 'home'});
    }
};

const formattedMessage = computed(() => {
    return message;
});

const pseudo = ref("")
const email = ref("")
const password = ref("")
const confirmPassword = ref("")
const pref = ref("")


const isFormValid = computed(() => {
    return pseudo.value !== '' && email.value !== '' && password.value !== '' && confirmPassword.value !== '' && password.value === confirmPassword.value && pref.value !== '';
});

function login() {
    router.push({name: 'login'});
}

</script>

<style scoped>
* {
    @apply box-border;
}

body {
    @apply bg-[#292929] text-white m-0;
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}

#profileImage {
    @apply bg-[#393e46] rounded-[30px];
}

.header {
    @apply flex justify-center items-center h-[100px];
}

.header img {
    @apply w-[50px] mr-2.5;
}

.header h1 {
    @apply text-[2em] text-[white] m-0;
}

.form-wrapper {
    @apply flex justify-center items-center h-[calc(100vh_-_100px)];
}

.form {
    @apply w-[400px] text-[white] bg-[#121212] shadow-[0_0_10px_rgba(0,0,0,0.3)] p-5 rounded-[5px];
}

.label {
    @apply block text-[small] text-[grey] mb-[5px];
}

.input {
    @apply w-full bg-[#292929] shadow-[0_0_5px_rgba(0,0,0,0.3)] mb-5 p-2.5 rounded-[3px] border-[none];
}

.button {
    @apply block w-full bg-[#393e46] text-white text-[1em] cursor-pointer transition-[background-color] duration-[0.2s] ease-[ease-in-out] p-2.5 rounded-[3px] border-[none] hover:bg-[#c4302b];
}

</style>
