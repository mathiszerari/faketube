<template>
    <html>
      <head>
      <link href="/dist/output.css" rel="stylesheet">
    </head>
      <body>
        <div>
        <h1>FakeTube</h1>
          <div class="div-input">
            <input v-model="msg" class="block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm" >
          </div>
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