<template>
  <html>
    <head>
    <link href="/dist/output.css" rel="stylesheet">
  </head>
    <body>
      <div>
        <h1>FakeTube</h1>
        <form class="bg-dark shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div class="div-input w-2/3 mx-auto relative">
            <input
            class="w-full py-2 pl-10 pr-3 leading-5 rounded-md border border-gray-300 bg-white text-gray-500 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            type="text"
            placeholder="Search"
            />
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg class="w-5 h-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fill-rule="evenodd"
                  d="M13.447 12.764l4.83 4.828a1 1 0 01-1.415 1.415l-4.828-4.83a7 7 0 111.413-1.413zM7 12a5 5 0 100-10 5 5 0 000 10z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
          </div>
        </form>

        <div v-if="msg.length > 0"  class="div-parent">
          <div class='div-red'></div>
        </div>
      </div>
    </body>
  </html>
</template>

<script setup>

import { ref } from "vue";
// eslint-disable-next-line no-unused-vars
const msg = ref("")
</script>

<style scoped>
@tailwind base;
@tailwind components;
@tailwind utilities;


body{
  margin-top: 10rem;
  background: #0F0F0F; 
}
h1 {
color: red;
font-size: 1.5rem;
position: absolute;
}
.div-input{
text-align: center;
}
input {
width: 20rem;
/*
background: #121212;
text-align: center;
width: 20rem;
margin-top: 1.35rem;
height: 1rem;
color: white;
 */
}
.div-red {
border-radius: 0 0 15px 15px;
background:#171717; 
margin-top: 0.1rem;
width: 20.5rem;
height:15rem;
display:flex;
justify-content:center;
}
.div-parent {
display: flex;
justify-content: center;
align-items: center;
}
</style>