<!-- eslint-disable vue/no-parsing-error -->
<template>
  <div class="container mx-0 px-0 bg-gray-900">
    <div class="div-input w-2/3 mx-auto relative">
      <input v-model="msg" @keyup="logMsg" class="input w-full py-2 pl-10 pr-3 leading-5 border border-gray-400 bg-gray-800 text-white rounded-l-full rounded-r-full placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent" type="text" placeholder="Search" />
      <div class="loop absolute inset-y-0 right-5  flex items-center">
        <button v-if="msg.length > 0" @click="clearmsg" class="p-4" id="cross-clear">
          <span class="absolute top-1/2 w-5 h-0.5 bg-gray-100 transform -translate-x-1/2 -translate-y-1/2 rotate-45"></span>
          <span class="absolute top-1/2 w-0.5 h-5 bg-gray-100 transform -translate-x-1/2 -translate-y-1/2 rotate-45"></span>
        </button>
        <div class="h-full w-16 rounded-r-full border border-gray-400 bg-gray-700 ml-2">
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
    
    <div v-if="msg.length > 0 && clear === true" class="flex justify-center items-center">
      <div class="suggestion bg-blue w-2/3 mx-auto relative flex justify-center items-center">
        <div class="w-full rounded-xl mt-1 boder h-64 bg-gray-700">
          <a href="{{ content.link }}" v-for="content in contents.slice(0, 4)" :key="content.text" @click="clearmsg" class="block left-1  py-4">
            <svg class="w-5 mt-2 ml-4 px-0 mx-5 ml-0 ml-5" viewBox="0 0 20 20" fill="none" stroke="white" style="cursor: pointer">
              <path
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M13.447 12.764l4.83 4.828a1 1 0 01-1.415 1.415l-4.828-4.83a7 7 0 111.413-1.413zM7 12a5 5 0 100-10 5 5 0 000 10z"
              />
            </svg>
            <span class="mx-5">{{ content.text }}</span><br>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const msg = ref('');
const clear = ref(false);

onMounted(() => {
  window.addEventListener('click', handleClick);
});

const handleClick = (event) => {
  const targetClass = event.target.classList;
  if (!targetClass.contains('div-input') && !targetClass.contains('suggestion')) {
    clear.value = false;
  }
  if (targetClass.contains('input') && clear.value === false) {
    clear.value = true;
  }
};

const contents = ref([
  { text: 'allume cigare', link: 'https://www.youtube.com/results?search_query=iphone+15' },
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
]);

const logMsg = () => {
  clear.value = true;
};
const clearmsg = () => {
  msg.value = '';
  clear.value = true;
};

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
  padding: 20rem 0rem 72rem 0rem;
  max-width: 100%;
}
</style>