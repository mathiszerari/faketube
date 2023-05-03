<!-- eslint-disable vue/no-parsing-error -->
<template>
  <!-- search bar -->
  <div class="container bg-gray-900">
    <!-- header -->
    <div class="flex justify-center items-center">
      <div class="burger-simulator">
        <svg width="30" height="20" viewBox="0 0 10 15">
          <path fill="#FFF" d="M2 14h26v-2H2v2zm0-5h26v-2H2v2zm0-6v2h26v-2H2z"/>
        </svg>
      </div>

      <div class="title bg-red ml-5 mt-1">
        <h1 class="text-red-500 text-m font-bold border-4 border-red-500 p-2 rounded-full">Fake<span class="text-white">Tube</span></h1>
      </div>


      <div class="div-input w-2/5 mx-auto relative">
        <input v-model="msg" @keyup="onkeyUp" class="input w-full py-2 pl-10 pr-3 leading-5 border border-gray-400 bg-gray-800 text-white rounded-l-full rounded-r-full placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent" type="text" placeholder="Search"/>
        <div class="loop absolute inset-y-0 right-5 flex items-center">
          <button v-if="msg.length > 0" @click="clearmsg" class="p-4" id="cross-clear">
            <span class="absolute top-1/2 w-5 h-0.5 bg-gray-100 transform -translate-x-1/2 -translate-y-1/2 rotate-45"></span>
            <span class="absolute top-1/2 w-0.5 h-5 bg-gray-100 transform -translate-x-1/2 -translate-y-1/2 rotate-45"></span>
          </button>

          <!-- loupe svg -->
          <div class="loupe h-full w-16 rounded-r-full border border-gray-400 bg-gray-700 ml-2">
            <svg class="w-5 h-5 mt-2 m-4" viewBox="0 0 20 20" fill="none" stroke="white" style="cursor: pointer">
              <path
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M13.447 12.764l4.83 4.828a1 1 0 01-1.415 1.415l-4.828-4.83a7 7 0 111.413-1.413zM7 12a5 5 0 100-10 5 5 0 000 10z"
              />
            </svg>
          </div>
        </div>
      </div>

      <div class="logo rounded-full ml-5 mt-1 mr-5">
        <img src="logo.jpeg" class="h-10 w-10">
      </div>
    </div>
    
    <!-- suggestion section -->
    <div v-if="msg.length > 0 && clear === true" class="suggestion-container ml-10 flex justify-center items-center relative">
      <div class="suggestion w-2/5 bg-gray-700 pr-15 rounded-xl pb-3">
        <div v-for="content in filteredContent.slice(0,4)" :key="content.text" class="max-h-16">
          <a @click="clearmsg" ref="mySuggestions" href="{{ content.link }}" class="block items-center justify-center left-1 py-4 mt-1.5">
            <svg class="w-5 ml-4 px-0 mx-5 ml-0 ml-5" viewBox="0 0 20 20" fill="none" stroke="white" style="cursor: pointer">
              <path
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M13.447 12.764l4.83 4.828a1 1 0 01-1.415 1.415l-4.828-4.83a7 7 0 111.413-1.413zM7 12a5 5 0 100-10 5 5 0 000 10z"
              />
            </svg>
            <span class="mx-5 h-12">{{ content.text }}</span><br>
          </a>
        </div>
      </div>
    </div>
  </div>

  <div class="h-64 w-64">{{ formattedVideo }}</div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useFetch } from "@vueuse/core";

// Requête sur le serveur
const {isFetching, error, data:video} = useFetch('http://localhost:1010/')

const formattedVideo = computed(()=>{
    return JSON.parse(video.value)
})

const msg = ref('');
const clear = ref(false);
const mySuggestions = ref(null);

onMounted(() => {
  window.addEventListener('click', handleClick);
});

const handleClick = (event) => {
  const targetClass = event.target.classList;
  if (!targetClass.contains('div-input') && !targetClass.contains('suggestion')  && !targetClass.contains('loupe')) {
    clear.value = false;
  }
  if (targetClass.contains('input') && clear.value === false) {
    clear.value = true;
  }
};

const contents = ref([
  { text: 'allume cigare', link: 'https://www.youtube.com/results?search_query=iphone+15' },
  { text: 'animal', link: 'https://www.youtube.com/results?search_query=iphone+15' },
  { text: 'bateau', link: 'https://www.youtube.com/results?search_query=iphone+14' },
  { text: 'cristianne', link: 'https://www.youtube.com/results?search_query=iphone+13' },
  { text: 'diego', link: 'https://www.youtube.com/results?search_query=iphone+12' },
  { text: 'elephant', link: 'https://www.youtube.com/results?search_query=iphone+11' },
  { text: 'fenouille', link: 'https://www.youtube.com/results?search_query=iphone+X' },
  { text: 'gavi', link: 'https://www.youtube.com/results?search_query=iphone+X' },
  { text: 'hakimi', link: 'https://www.youtube.com/results?search_query=iphone+X' },
  { text: 'isco', link: 'https://www.youtube.com/results?search_query=iphone+X' },
  { text: 'jota', link: 'https://www.youtube.com/results?search_query=iphone+X' },
  { text: 'kaka', link: 'https://www.youtube.com/results?search_query=iphone+X' },
  { text: 'luis suarez', link: 'https://www.youtube.com/results?search_query=iphone+X' },
  { text: 'mathis tel', link: 'https://www.youtube.com/results?search_query=iphone+X' },
  { text: 'nakata', link: 'https://www.youtube.com/results?search_query=iphone+X' },
  { text: 'odegaard', link: 'https://www.youtube.com/results?search_query=iphone+X' },
  { text: 'pasteis de nata', link: 'https://www.youtube.com/results?search_query=iphone+X' },
  { text: 'quaresma', link: 'https://www.youtube.com/results?search_query=iphone+X' },
  { text: 'renato', link: 'https://www.youtube.com/results?search_query=iphone+X' },
  { text: 'sergio roberto', link: 'https://www.youtube.com/results?search_query=iphone+X' },
  { text: 'tiago', link: 'https://www.youtube.com/results?search_query=iphone+X' },
  { text: 'upamecano', link: 'https://www.youtube.com/results?search_query=iphone+X' },
  { text: 'vidal', link: 'https://www.youtube.com/results?search_query=iphone+X' },
  { text: 'walker', link: 'https://www.youtube.com/results?search_query=iphone+X' },
  { text: 'xavi', link: 'https://www.youtube.com/results?search_query=iphone+X' },
  { text: 'yaya toure', link: 'https://www.youtube.com/results?search_query=iphone+X' },
  { text: 'zidane', link: 'https://www.youtube.com/results?search_query=iphone+X' },

  { text: 'maison', link: 'https://www.youtube.com/results?search_query=iphone+15' },
  { text: 'tête', link: 'https://www.youtube.com/results?search_query=iphone+15' },
  { text: 'ville', link: 'https://www.youtube.com/results?search_query=iphone+14' },
  { text: 'porte', link: 'https://www.youtube.com/results?search_query=iphone+12' },
  { text: 'pays', link: 'https://www.youtube.com/results?search_query=iphone+11' },
  { text: 'route', link: 'https://www.youtube.com/results?search_query=iphone+X' },
  { text: 'raison', link: 'https://www.youtube.com/results?search_query=iphone+X' },
  { text: 'cœur', link: 'https://www.youtube.com/results?search_query=iphone+X' },
  { text: 'femme', link: 'https://www.youtube.com/results?search_query=iphone+X' },
  { text: 'dieu', link: 'https://www.youtube.com/results?search_query=iphone+X' },
  { text: 'amour', link: 'https://www.youtube.com/results?search_query=iphone+X' },
  { text: 'monde', link: 'https://www.youtube.com/results?search_query=iphone+X' },
  { text: 'voiture', link: 'https://www.youtube.com/results?search_query=iphone+X' },
  { text: 'jour', link: 'https://www.youtube.com/results?search_query=iphone+X' },
  { text: 'temps', link: 'https://www.youtube.com/results?search_query=iphone+X' },
  { text: 'monsieur', link: 'https://www.youtube.com/results?search_query=iphone+X' },
  { text: 'bien', link: 'https://www.youtube.com/results?search_query=iphone+X' },
  { text: 'personne', link: 'https://www.youtube.com/results?search_query=iphone+X' },
  { text: 'fois ', link: 'https://www.youtube.com/results?search_query=iphone+X' },
  { text: 'part', link: 'https://www.youtube.com/results?search_query=iphone+X' },
  { text: 'rue', link: 'https://www.youtube.com/results?search_query=iphone+X' },
  { text: 'chambre', link: 'https://www.youtube.com/results?search_query=iphone+X' },

  { text: 'chansons 2023', link: 'https://www.youtube.com/results?search_query=chansons+2023' },
  { text: 'cuisine facile', link: 'https://www.youtube.com/results?search_query=cuisine+facile' },
  { text: 'tutoriel maquillage', link: 'https://www.youtube.com/results?search_query=tutoriel+maquillage' },
  { text: 'yoga pour débutants', link: 'https://www.youtube.com/results?search_query=yoga+pour+débutants' },
  { text: 'exercices à la maison', link: 'https://www.youtube.com/results?search_query=exercices+à+la+maison' },
  { text: 'blagues hilarantes', link: 'https://www.youtube.com/results?search_query=blagues+hilarantes' },
  { text: 'jeux vidéo en ligne', link: 'https://www.youtube.com/results?search_query=jeux+vidéo+en+ligne' },
  { text: 'musique de relaxation', link: 'https://www.youtube.com/results?search_query=musique+de+relaxation' },
  { text: 'vidéos de chatons', link: 'https://www.youtube.com/results?search_query=vidéos+de+chatons' },
  { text: 'recettes végétariennes', link: 'https://www.youtube.com/results?search_query=recettes+végétariennes' },
  { text: 'humour noir', link: 'https://www.youtube.com/results?search_query=humour+noir' },
  { text: 'chansons de rap français', link: 'https://www.youtube.com/results?search_query=chansons+de+rap+français' },
  { text: 'astuces beauté', link: 'https://www.youtube.com/results?search_query=astuces+beauté' },
  { text: 'documentaires intéressants', link: 'https://www.youtube.com/results?search_query=documentaires+intéressants' },
  { text: 'chansons d\'amour', link: 'https://www.youtube.com/results?search_query=chansons+d\'amour' },
  { text: 'tutoriel coiffure', link: 'https://www.youtube.com/results?search_query=tutoriel+coiffure' },
  { text: 'recettes de cuisine asiatique', link: 'https://www.youtube.com/results?search_query=recettes+de+cuisine+asiatique' },
  { text: 'jeux de société', link: 'https://www.youtube.com/results?search_query=jeux+de+société' },
  { text: 'podcasts populaires', link: 'https://www.youtube.com/results?search_query=podcasts+populaires' },
  { text: 'conseils pour étudier', link: 'https://www.youtube.com/results?search_query=conseils+pour+étudier' },

]);
  
const onkeyUp = () => {
  clear.value = true;
  // console.log(msg.value)
  console.log(filteredContent.value)
};

const clearmsg = () => {
  msg.value = '';
  clear.value = true;
};

// computed value qui me renvoi de smots céls en fonction de la valeur de msg.values
// computed value return array 
// vaut mieux en stocker plein et les parcourir

const filteredContent = computed(() => {
  return contents.value.filter((word) => word.text.startsWith(msg.value));
} )

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
.container {
  padding: 0rem 0rem 80rem 0rem;
  max-width: 100%;
}
</style>