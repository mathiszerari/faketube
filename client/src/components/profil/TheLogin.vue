<template>
  <div
    class="flex flex-col justify-center items-center w-full h-min bg-gray-800 p-8 m-4 max-w-screen-sm"
  >
    <form @submit.prevent="registerFunction" class="w-full max-w-lg">
      <div class="mb-4">
        <label for="email" class="block text-gray-200 font-bold mb-2">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          v-model="email"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div class="mb-4">
        <label for="password" class="block text-gray-200 font-bold mb-2">Mot de passe:</label>
        <input
          type="password"
          id="password"
          name="password"
          v-model="password"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <span v-for="(message, index) in formattedMessage?.message" :key="index">
        {{ message }}
      </span>
      <div class="flex items-center justify-center">
        <button
          type="submit"
          :disabled="!isFormValid"
          @click="LOGINFunction()"
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Se connecter
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { useFetch } from '@vueuse/core'
import { computed, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()

let message = reactive({ message: '' })

const email = ref('')
const password = ref('')

const isFormValid = computed(() => {
  return email.value !== '' && password.value !== ''
})

const LOGINFunction = async () => {
  if (!isFormValid.value) {
    return
  }

  const {
    isFetching,
    error,
    data: dbmessage
  } = await useFetch(`http://localhost:8080/login/${email.value}/${password.value}`)
  message.message = JSON.parse(dbmessage.value)['message']

  // Naviguer vers la page home
  if (JSON.parse(dbmessage.value)['valide'] !== 'false') {
    localStorage.setItem('id', JSON.parse(dbmessage.value)['id'])
    await router.push({ name: 'home' })
  }
}

const formattedMessage = computed(() => {
  return message
})
</script>

<style scoped></style>
