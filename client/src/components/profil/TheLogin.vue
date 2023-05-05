<template>
    <div class="form-container">
        <form @submit.prevent="registerFunction" class="form">
            <div class="header">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/YouTube_full-color_icon_%282017%29.svg/640px-YouTube_full-color_icon_%282017%29.svg.png"
                     alt="Logo YouTube">
                <h1>Connexion</h1>
            </div>
            <div class="form-field">
                <label for="email" class="label">Email:</label>
                <input type="email" id="email" name="email" v-model="email"
                       class="input">
            </div>
            <div class="form-field">
                <label for="password" class="label">Mot de passe:</label>
                <input type="password" id="password" name="password" v-model="password"
                       class="input">
            </div>
            <span>
              {{ message.message }}
            </span>
            <button @click="register()">S'inscrire</button>
            <div class="form-field">
                <button type="submit" :disabled="!isFormValid" @click="LOGINFunction()"
                        class="btn">
                    Se connecter
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

const email = ref("")
const password = ref("")

const isFormValid = computed(() => {
    return email.value !== '' && password.value !== '';
});

const LOGINFunction = async () => {
    if (!isFormValid) {
        return;
    }

    const {
        isFetching,
        error,
        data: dbmessage
    } = await useFetch(`http://localhost:8080/login/${email.value}/${password.value}`);
    message.message = JSON.parse(dbmessage.value)["message"]

    // Naviguer vers la page home
    if (JSON.parse(dbmessage.value)["valide"] !== "false") {
        localStorage.setItem("id", JSON.parse(dbmessage.value)["id"]);
        await router.push({name: 'home'});
    }
};

const formattedMessage = computed(() => {
    return message;
});

function register() {
    router.push({name: 'register'});
}

</script>

<style scoped>
/* Global styles */
* {
    @apply box-border m-0 p-0;
}

body {
    @apply bg-[#121212] text-white text-base;
    font-family: Arial, sans-serif;
}

/* Container */
.form-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}

/* Form */
.form {
    @apply flex flex-col bg-[#1c1c1c] shadow-[0px_4px_10px_rgba(0,0,0,0.2)] max-w-[400px] w-full p-8 rounded-[10px];
}

/* Header */
.header {
    @apply flex justify-center items-center h-[100px];
}

.header img {
    @apply w-[50px] mr-2.5;
}

.header h1 {
    @apply text-[2em] text-[white] m-0;
}

/* Form fields */
.form-field {
    @apply text-[white] mb-4;
}

.label {
    @apply block text-[small] text-[grey] mb-[5px];
}

.input {
    @apply w-full bg-[#292929] shadow-[0_0_5px_rgba(0,0,0,0.3)] mb-5 p-2.5 rounded-[3px] border-[none];
}

.btn {
    @apply block w-full bg-[#393e46] text-white text-[1em] cursor-pointer transition-[background-color] duration-[0.2s] ease-[ease-in-out] p-2.5 rounded-[3px] border-[none] hover:bg-[#c4302b];
}
</style>
