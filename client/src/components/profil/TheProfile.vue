<template>
    <div class="profile dark-theme">
        <div class="flex flex-col items-center w-full mb-0">
            <label for="profile-image-input">
                <img src="https://static.vecteezy.com/system/resources/previews/005/544/718/original/profile-icon-design-free-vector.jpg" class="w-[120px] h-[120px] object-cover mb-5 rounded-full border-4 border-white shadow-md cursor-pointer" alt="Profile Image" />
            </label>
            <input type="file" id="profile-image-input" style="display:none" @change="changeProfileImage" accept="image/*">
            <div class="profile-titles">
                <h1 class="text-4xl font-semibold text-center">{{ user.pseudo }}</h1>
                <p class="text-2xl text-[#bbb] m-0">Membre depuis le {{ user.date }}</p>
            </div>
            <button class="profile-logout-btn bg-red-600 mr-5 text-white rounded-md px-4 py-2 mt-4 transition-colors hover:bg-red-700" @click="logout">Déconnexion</button>
        </div>

        <div class="flex flex-col w-full space-y-6">
            <div class="p-20">
                <h2 class="text-3xl font-semibold mb-4">Informations de compte</h2>
                <div class="grid grid-cols-2 gap-4">
                    <div class="flex flex-col">
                        <label for="username" class="text-lg font-semibold mb-2">Pseudo :</label>
                        <div class="flex items-center">
                            <p class="text-lg">{{ user.pseudo }}</p>
                            <button class="profile-edit-btn bg-transparent text-gray-500 hover:text-gray-800 transition-colors ml-2" @click="editUsername">Modifier</button>
                        </div>
                    </div>
                    <div class="flex flex-col">
                        <label for="description" class="text-lg font-semibold mb-2">Description :</label>
                        <div class="flex items-center">
                            <p class="text-lg">{{ user.description }}</p>
                            <button class="profile-edit-btn bg-transparent text-gray-500 hover:text-gray-800 transition-colors ml-2" @click="editDescription">Modifier</button>
                        </div>
                    </div>
                    <div class="flex flex-col">
                        <label for="email" class="text-lg font-semibold mb-2">Email :</label>
                        <div class="flex items-center">
                            <p class="text-lg">{{ user.email }}</p>
                            <button class="profile-edit-btn bg-transparent text-gray-500 hover:text-gray-800 transition-colors ml-2" @click="editEmail">Modifier</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div>
        <h2 class="text-3xl font-semibold mb-4">Changer le mot de passe</h2>
        <form class="flex flex-col space-y-4">
            <div class="flex flex-col">
                <label for="current-password" class="text-lg font-semibold mb-2">Mot de passe actuel :</label>
                <input type="password" id="current-password" name="current-password" class="border border-gray-300 rounded-md py-2 px-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" required />
            </div>
            <div class="flex flex-col">
                <label for="new-password" class="text-lg font-semibold mb-2">Nouveau mot de passe :</label>
                <input type="password" id="new-password" name="new-password" class="border border-gray-300 rounded-md py-2 px-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" required />
            </div>
            <div class="flex flex-col">
                <label for="confirm-password" class="text-lg font-semibold mb-2">Confirmer le nouveau mot de passe :</label>
                <input type="password" id="confirm-password" name="confirm-password" class="border border-gray-300 rounded-md py-2 px-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" required />
            </div>
        </form>
    </div>
</template>

<script setup>
import {onMounted, reactive, ref} from 'vue';
import {useFetch} from "@vueuse/core";
import router from "@/router";

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
}

const user = reactive({pseudo: "", email:""})

onMounted( async ()=>{
    const { isFetching, error, data:use } = await useFetch(`http://localhost:8080/getUserById/${localStorage.getItem("id")}`)
    user.pseudo = JSON.parse(use.value).message[0]["pseudo"]
    user.email = JSON.parse(use.value).message[0]["email"]
    user.date = JSON.parse(use.value).message[0]["created_at"]
})


async function editUsername() {
    const newUsername = prompt('Nouveau pseudo :', user.pseudo)
    if (newUsername !== null) {
        const { isFetching, error, data:newPseudo } = await useFetch(`http://localhost:8080/updatePseudo/${newUsername}/${localStorage.getItem("id")}`)
        user.pseudo = JSON.parse(newPseudo.value)["newPseudo"]
    }
}

async function editEmail() {
    let newEmail = prompt('Nouvel email :', user.email)
    while (newEmail !== null && !isValidEmail(newEmail)) {
        alert('Adresse e-mail invalide.')
        newEmail = prompt('Nouvel email :')
    }
    if (newEmail !== null) {
        const { isFetching, error, data:newPseudo } = await useFetch(`http://localhost:8080/updateEmail/${newEmail}/${localStorage.getItem("id")}`)
        user.email = JSON.parse(newPseudo.value)["newEmail"]
    }
}

// function editPassword() {
//     const newPassword = prompt('Nouveau mot de passe :')
//     if (newPassword !== null) {
//         // En réalité, il faudrait appeler une API pour modifier le mot de passe enregistré côté serveur.
//         console.log('Le mot de passe a été modifié avec succès.')
//     }
// }

function logout() {
    localStorage.removeItem('id')
    router.push({name: 'home'});
}

</script>

<style scoped>


body {
    @apply flex justify-center items-center bg-[#1a1a1a] text-white text-base leading-normal m-0 p-0;
    font-family: Arial, sans-serif;
}

.profile-info {
    @apply flex items-center mb-2.5;
}
.profile-info-label {
    @apply mr-2.5;
}
.profile-info-value {
    @apply text-[#bbb];
}
.profile-info-value button {
    @apply text-[black];
}
.btn {
    @apply inline-block bg-[#2196f3] text-white text-base cursor-pointer text-center ml-2.5 px-4 py-2 rounded-[5px] border-[none] hover:bg-[#0c7cd5] active:bg-[#0c7cd5] active:translate-y-px;
}


</style>