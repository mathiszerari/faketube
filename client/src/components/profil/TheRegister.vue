<template>
    <div class=" flex flex-col justify-center items-center w-full h-min bg-gray-800 p-8 m-4 max-w-screen-sm ">
        <form @submit.prevent="registerFunction" class="w-full max-w-lg">
            <div class="">
                <img src="../../assets/logo.svg" class="w-24 m-4" alt="pp">
            </div>
            <div class="mb-4">
                <label for="pseudo" class="block text-gray-200 font-bold mb-2">Pseudo:</label>
                <input type="text" id="pseudo" name="pseudo" v-model="pseudo"
                       class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
            </div>
            <div class="mb-4">
                <label for="email" class="block text-gray-200 font-bold mb-2">Email:</label>
                <input type="email" id="email" name="email" v-model="email"
                       class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
            </div>
            <div class="mb-4">
                <label for="password" class="block text-gray-200 font-bold mb-2">Mot de passe:</label>
                <input type="password" id="password" name="password" v-model="password"
                       class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
            </div>
            <div class="mb-4">
                <label for="confirmPassword" class="block text-gray-200 font-bold mb-2">Confirmer le mot de
                    passe:</label>
                <input type="password" id="confirmPassword" name="confirmPassword" v-model="confirmPassword"
                       class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
            </div>
            <div class="flex items-center justify-center">
                <button type="submit" :disabled="!isFormValid()"
                        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    S'inscrire
                </button>
            </div>
        </form>
    </div>
</template>

<script>
import {useFetch} from "@vueuse/core";

export default {
    data() {
        return {
            pseudo: '',
            email: '',
            password: '',
            confirmPassword: '',
        }
    },
    methods: {
        isFormValid() {
            return this.pseudo !== '' && this.email !== '' && this.password !== '' && this.confirmPassword !== '' && this.password === this.confirmPassword;
        },
        registerFunction() {
            if (!this.isFormValid()) {
                return;
            }
            const {
                isFetching,
                error,
                data: video
            } = useFetch(`http://localhost:8080/register/${this.pseudo}/${this.email}/${this.password}`)
            console.log(this.pseudo)
        }
    }
}
</script>

<style scoped>

</style>
