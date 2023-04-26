<!-- eslint-disable vue/no-parsing-error -->
<template>
  <html>
    <head>
      <link href="/dist/output.css" rel="stylesheet">
    </head>
    <body class="bg-gray-900">
      <div class="container mx-0 px-0">
        <h1 class="text-red-500 text-2xl font-bold mt-5">FakeTube</h1>
        <div class="w-2/3 mx-auto relative">
          <input v-model="msg" @keyup="logMsg" class="w-full py-2 pl-10 pr-3 leading-5 border border-gray-400 bg-gray-800 text-white rounded-l-full rounded-r-full placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent" type="text" placeholder="Search" />
          <div class="loop absolute inset-y-0 right-5  flex items-center pointer-events-none">
            <div class="h-full w-16 rounded-r-full border border-gray-400 bg-gray-700 ml-2">
              <svg class="w-5 h-5 mt-2 ml-4" viewBox="0 0 20 20" fill="none" stroke="white">
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
        
        <div v-if="msg.length > 0" class="flex justify-center items-center">
          <div class="bg-blue w-2/3 mx-auto relative flex justify-center items-center">
            <div class="w-full rounded-xl mt-1 boder h-64 bg-gray-700">
              <a href="{{ content.link }}" v-for="content in contents.slice(0, 4)" :key="content.text" class="block left-1  py-4">
                <svg class="w-5 mt-2 ml-4 px-0 ml-0 mr-0" viewBox="0 0 20 20" fill="none" stroke="white">
                  <path
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M13.447 12.764l4.83 4.828a1 1 0 01-1.415 1.415l-4.828-4.83a7 7 0 111.413-1.413zM7 12a5 5 0 100-10 5 5 0 000 10z"
                  />
                </svg>
                <span class="mx-5 px-3">{{ content.text }}</span><br>
              </a>
            </div>
          </div>
        </div>
      </div>
    </body>
  </html>
</template>

<script setup>
  import { ref } from 'vue';

  const msg = ref('');
  const contents = ref([
    { text: 'iPhone 15', link: 'https://www.youtube.com/results?search_query=iphone+15' },
    { text: 'iPhone 14', link: 'https://www.youtube.com/results?search_query=iphone+14' },
    { text: 'iPhone 13', link: 'https://www.youtube.com/results?search_query=iphone+13' },
    { text: 'iPhone 12', link: 'https://www.youtube.com/results?search_query=iphone+12' },
    { text: 'iPhone 11', link: 'https://www.youtube.com/results?search_query=iphone+11' },
    { text: 'iPhone X', link: 'https://www.youtube.com/results?search_query=iphone+X' },
  ]);

  const logMsg = () => {
    console.log(msg.value);
  };
</script>

<script>
  export default {
    name: 'MyComponent',
    // autres options du composant
  };
</script>

<style scoped>
@tailwind base;
@tailwind components;
@tailwind utilities;

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
</style>
