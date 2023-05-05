
<script setup>
import { ref, onMounted, reactive } from 'vue'
import logoURL from '../../assets/logo.png'
import { useFetch } from '@vueuse/core'
const is_expanded = ref(localStorage.getItem('is_expanded') === 'true')
onMounted(() => {
  localStorage.setItem('is_expanded', 'true')
})
const ToggleMenu = () => {
  is_expanded.value = !is_expanded.value
  localStorage.setItem('is_expanded', is_expanded.value)
}
const userId = ref('')
const connectedUser = reactive({ pseudo: 'Connexion', profilePicture: '' })
onMounted(async () => {
  if (localStorage.getItem('id')) {
    userId.value = localStorage.getItem('id')
    const { data: userInfosFetch } = await useFetch(
      `http://localhost:8080/getUserById/${userId.value}`
    )
    const fetchResult = JSON.parse(userInfosFetch.value).message[0]
    connectedUser.pseudo = fetchResult.pseudo
    connectedUser.profilePicture = fetchResult.profile_photo
  }
})
const subscriptions = ref([])
onMounted(async () => {
  if (userId.value !== '') {
    const { isFetching, error, data } = await useFetch(
      `http://localhost:8080/getUserSubscriptions/${userId.value}`
    )
    const formattedData = JSON.parse(data.value).message

    const promises = formattedData.map(async (id) => {
      const { data: youtuber } = await useFetch(
        `http://localhost:8080/getUserById/${id.publisher_id}`
      )
      return JSON.parse(youtuber.value).message[0]
    })
    subscriptions.value = await Promise.all(promises)
    console.log(subscriptions.value)
  }
})
</script>


<template>
  <aside :class="`${is_expanded ? 'is-expanded' : ''}`" class="bg-zinc-900 min-h-10 sticky top-0 transition-all duration-200 p-4 z">
    <div class="logo mb-4">
      <img :src="logoURL" alt="" class="w-8">
    </div>

    <div class="menu-toggle-wrap mb-4 flex justify-end relative transition-all duration-200">
      <button class="menu-toggle" @click="ToggleMenu">
        <span class="material-symbols-outlined weight text-3xl transition-all duration-200 transform" :class="`${is_expanded ? 'translate-x-0.5' : ''}`">keyboard_double_arrow_right</span>
      </button>
    </div>

    <div class="menu">
      <h3 class="text-lg font-medium mb-2 ml-5">Profil</h3>
      <router-link :to="{name: 'login'}" class="button flex items-center mb-2" v-if="userId !== ''">
        <img :src="connectedUser.profilePicture" alt="" class="w-10 aspect-square rounded-full mr-2" />
        <span class="text">{{ connectedUser.pseudo }}</span>
      </router-link>
      <router-link :to="{ name: 'login' }" class="button flex items-center mb-2" v-else>
        <span class="material-symbols-outlined text-xl mr-2">person</span>
        <span class="text">{{ connectedUser.pseudo }}</span>
      </router-link>
    </div>

    <div class="menu">
      <h3 class="text-lg font-medium mb-2 ml-5">Menu</h3>
      <router-link to="/" class="button flex items-center mb-2">
        <span class="material-symbols-outlined text-xl mr-2">home</span>
        <span class="text">Accueil</span>
      </router-link>
      <router-link :to="{name: 'channel', params:{id: userId} }" class="button flex items-center mb-2" v-if="userId !== ''">
        <span class="material-symbols-outlined text-xl mr-2">account_box</span>
        <span class="text">Ma chaîne</span>
      </router-link>
      <router-link :to="{name: 'Upload Video', params:{id: userId} }" class="button flex items-center mb-2" v-if="userId !== ''">
        <span class="material-symbols-outlined text-xl mr-2">publish</span>
        <span class="text">Publier</span>
      </router-link>
      <div class="button flex items-center mb-2" v-if="userId !== ''">
        <span class="material-symbols-outlined text-xl mr-2">subscriptions</span>
        <span class="text">Abonnements</span>
      </div>
      <div class="pl-5 pt-1">
        <div v-if="is_expanded">
          <div v-for="(subscription, index) in subscriptions" :key="index">
            <router-link :to="{name: 'channel', params:{id: subscription.id}}" class="flex items-center button mb-2">
              <img :src="subscription.profile_photo" alt="" class="w-7 rounded-full" />
              <span class="text ml-3">{{ subscription.pseudo }}</span>
            </router-link>
          </div>
        </div>
      </div>
    </div>

    
</aside>
</template>

<style lang="scss" scoped>
.material-symbols-outlined {
  font-variation-settings: 'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 48;
}
.material-symbols-outlined.weight {
  font-variation-settings: 'FILL' 0, 'wght' 500, 'GRAD' 0, 'opsz' 48;
}
.material-symbols-outlined.active {
  font-variation-settings: 'FILL' 1, 'wght' 200, 'GRAD' 0, 'opsz' 48;
}
aside {
  color: var(--light);
  width: calc(2rem + 32px);
  height: 100vh;
  .flex {
    flex: 1 1 0%;
  }
  .logo {
    margin-bottom: 1rem;
    img {
      width: 2rem;
    }
  }
  .text {
    font-size: 1rem;
  }
  .menu-toggle-wrap {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 1rem;
    position: relative;
    top: 0;
    transition: 0.2s ease-in-out;
    .menu-toggle {
      transition: 0.2s ease-in-out;
      .material-icons {
        font-size: 2rem;
        color: var(--light);
        transition: 0.2s ease-out;
      }

      &:hover {
        .material-icons {
          transform: translateX(0.5rem);
        }
      }
    }
  }
  h3,
  .button .text {
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
  }
  h3 {
    color: var(--grey);
    font-size: 0.875rem;
    margin-bottom: 0.5rem;
    text-transform: uppercase;
  }
  .menu {
    margin: 0 -1rem;
    .button {
      display: flex;
      align-items: center;
      text-decoration: none;
      transition: 0.2s ease-in-out;
      padding: 0.5rem 1rem;
      .material-icons {
        font-size: 2rem;
        color: var(--light);
        transition: 0.2s ease-in-out;
      }
      .text {
        color: var(--light);
        transition: 0.2s ease-in-out;
      }
      &:hover {
        background-color: #393941;
      }
      &.router-link-exact-active {
        background-color: #393941;
        border-right: 5px solid var(--primary);
        .material-icons,
        .text {
          font-weight: 500;
        }
        .material-symbols-outlined {
          font-variation-settings: 'FILL' 1, 'wght' 200, 'GRAD' 0, 'opsz' 48;
        }
      }
    }
  }
  .footer {
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
    p {
      font-size: 1rem;
      color: var(--grey);
    }
  }
  &.is-expanded {
    width: var(--sidebar-width);
    height: 100vh;
    .menu-toggle-wrap {
      top: -3rem;

      .menu-toggle {
        transform: rotate(-180deg);
      }
    }
    h3,
    .button .text {
      opacity: 1;
    }
    .button {
      .material-icons {
        margin-right: 1rem;
      }
    }
    .footer {
      opacity: 0;
    }
  }
  @media (max-width: 700px) {
    position: fixed;
    z-index: 99;
    height: 10%;
    overflow: hidden;
  }
}
</style>
