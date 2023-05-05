<!-- eslint-disable vue/no-parsing-error -->
<template>
  <!-- search bar -->
  <!-- <div class="container bg-gray-900"> -->
  <!-- header -->
  <div class="global flex justify-center items-center">
    <!-- <div class="burger-simulator">
      <svg width="30" height="20" viewBox="0 0 10 15">
        <path fill="#FFF" d="M2 14h26v-2H2v2zm0-5h26v-2H2v2zm0-6v2h26v-2H2z" />
      </svg>
    </div> -->

    <!-- <div class="title bg-red ml-5 mt-1">
      <h1 class="text-red-500 text-m font-bold border-4 border-red-500 p-2 rounded-full">Fake<span
          class="text-white">Tube</span></h1>
    </div> -->

    <div class="div-input w-2/5 mt-5 mx-auto relative">
      <input v-model="msg" @keyup="onkeyUp" v-on:keyup.enter="loupeAction"
        class="input w-full py-2 pl-10 pr-3 leading-5 border border-gray-400 bg-gray-800 text-white rounded-l-full rounded-r-full placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent"
        type="text" placeholder="Search" />
      <div class="loop absolute inset-y-0 right-5 flex items-center">
        <button v-if="msg.length > 0" @click="clearmsg" class="p-4" id="cross-clear">
          <span
            class="absolute top-1/2 w-5 h-0.5 bg-gray-100 transform -translate-x-1/2 -translate-y-1/2 rotate-45"></span>
          <span
            class="absolute top-1/2 w-0.5 h-5 bg-gray-100 transform -translate-x-1/2 -translate-y-1/2 rotate-45"></span>
        </button>

        <!-- loupe svg -->
        <div class="loupe h-full w-16 rounded-r-full border border-gray-400 bg-gray-700 ml-2">
          <svg @click="loupeAction" class="w-5 h-5 mt-2 m-4" viewBox="0 0 20 20" fill="none" stroke="white"
            style="cursor: pointer">
            <path stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
              d="M13.447 12.764l4.83 4.828a1 1 0 01-1.415 1.415l-4.828-4.83a7 7 0 111.413-1.413zM7 12a5 5 0 100-10 5 5 0 000 10z" />
          </svg>
        </div>
      </div>
    </div>

    <!-- <div class="logo rounded-full ml-5 mt-1 mr-5">
      <img src="logo.jpeg" class="h-10 w-10">
    </div> -->
  </div>

  <!-- suggestion section -->
  <div v-if="msg.length > 0 && clear === true"
    class="suggestion-container w-full absolute flex justify-center items-center">
    <div class="suggestion z-9999 bg-gray-700 mt-1 pr-15 rounded-xl w-2/5">
      <div @click="suggestAction(content.text)" v-for="content in filteredContent.slice(0, 4)" :key="content.text"
        class="max-h-16">
        <a @click="clearmsg" ref="mySuggestions" class="block items-center justify-center left-1 py-4">
          <svg class="w-5 ml-4 px-0 mx-5 ml-0 ml-5" viewBox="0 0 20 20" fill="none" stroke="white"
            style="cursor: pointer">
            <path stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
              d="M13.447 12.764l4.83 4.828a1 1 0 01-1.415 1.415l-4.828-4.83a7 7 0 111.413-1.413zM7 12a5 5 0 100-10 5 5 0 000 10z" />
          </svg>
          <span class="mx-5 h-12">{{ content.text }}</span><br />
        </a>
      </div>
    </div>
  </div>

  <!-- </div> -->
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useFetch } from '@vueuse/core'
import { useRouter } from 'vue-router'
const router = useRouter()
// Requête sur le serveur
const { isFetching, error, data: video } = useFetch('http://localhost:8080/')
const formattedVideo = computed(() => {
  return JSON.parse(video.value)
})
const msg = ref('')
const clear = ref(false)
const mySuggestions = ref(null)
onMounted(() => {
  window.addEventListener('click', handleClick)
})
const handleClick = (event) => {
  const targetClass = event.target.classList
  if (
    !targetClass.contains('div-input') &&
    !targetClass.contains('suggestion') &&
    !targetClass.contains('loupe')
  ) {
    clear.value = false
  }
  if (targetClass.contains('input') && clear.value === false) {
    clear.value = true
  }
}
function loupeAction() {
  if (msg.value) {
    clear.value = false
    router.push({ name: 'searchVideo', params: { userResearch: toLowercaseMsgValue.value } })
  }
}

// function suggestAction() {
//   clear.value = false
//   router.push({ name: 'searchVideo', params: contents.text })
//   console.log('suggest action');
// }

function suggestAction(text) {
  router.push(`/searchVideo/${text}`)
}

const contents = ref([
  { text: 'asmr' },
  { text: 'ariana grande' },
  { text: 'arsenal' },
  { text: 'avatar 2 trailer' },
  { text: 'animal' },
  { text: 'allemagne' },
  { text: 'bateau' },
  { text: 'cristianne' },
  { text: 'diego' },
  { text: 'elephant' },
  { text: 'fenouille' },
  { text: 'gavi' },
  { text: 'hakimi' },
  { text: 'isco' },
  { text: 'jota' },
  { text: 'kaka' },
  { text: 'luis suarez' },
  { text: 'mathis tel' },
  { text: 'nakata' },
  { text: 'odegaard' },
  { text: 'pasteis de nata' },
  { text: 'quaresma' },
  { text: 'renato' },
  { text: 'sergio roberto' },
  { text: 'tiago' },
  { text: 'upamecano' },
  { text: 'vidal' },
  { text: 'walker' },
  { text: 'xavi' },
  { text: 'yaya toure' },
  { text: 'zidane' },
  { text: 'maison' },
  { text: 'tête' },
  { text: 'ville' },
  { text: 'porte' },
  { text: 'pays' },
  { text: 'route' },
  { text: 'raison' },
  { text: 'cœur' },
  { text: 'femme' },
  { text: 'amour' },
  { text: 'monde' },
  { text: 'voiture' },
  { text: 'jour' },
  { text: 'temps' },
  { text: 'monsieur' },
  { text: 'bien' },
  { text: 'personne' },
  { text: 'fois ' },
  { text: 'part' },
  { text: 'rue' },
  { text: 'chambre' },
  { text: 'chansons 2023' },
  { text: 'cuisine facile' },
  { text: 'tutoriel maquillage' },
  { text: 'yoga pour débutants' },
  { text: 'exercices à la maison' },
  { text: 'blagues hilarantes' },
  { text: 'jeux vidéo en ligne' },
  { text: 'musique de relaxation' },
  { text: 'vidéos de chatons' },
  { text: 'recettes végétariennes' },
  { text: 'humour' },
  { text: 'chansons de rap français' },
  { text: 'astuces beauté' },
  { text: 'documentaires intéressants' },
  { text: "chansons d'amour" },
  { text: 'tutoriel coiffure' },
  { text: 'recettes de cuisine asiatique' },
  { text: 'jeux de société' },
  { text: 'podcasts populaires' },
  { text: 'conseils pour étudier' },
])
const onkeyUp = () => {
  clear.value = true
  // console.log(msg.value)
  // console.log(filteredContent.value)
}
const clearmsg = () => {
  msg.value = ''
  clear.value = true
}
// computed value qui me renvoi de smots céls en fonction de la valeur de msg.values
// computed value return array
// vaut mieux en stocker plein et les parcourir
const filteredContent = computed(() => {
  let searchValue = toLowercaseMsgValue.value.trim() // Supprime les espaces au début et à la fin de la chaîne de recherche
  if (searchValue.startsWith(' ')) {
    searchValue = searchValue.substring(1) // Supprime le premier caractère s'il s'agit d'un espace
  }
  return contents.value.filter((word) => word.text.toLowerCase().includes(searchValue))
})
const toLowercaseMsgValue = computed(() => {
  return msg.value.toLowerCase()
})
// console.log(filteredContent);
</script>

<style scoped>
.loop {
  margin-right: -1.295rem;
}

svg {
  z-index: 9999;
  display: inline-block;
}

a {
  color: white;
}

input {
  z-index: 998;
}

.loupe {
  z-index: 9999;
}

.container {
  padding: 0rem 0rem 80rem 0rem;
  max-width: 100%;
}

.suggestion-container {
  z-index: 9999;
}

a {
  cursor: pointer;
}
</style>
