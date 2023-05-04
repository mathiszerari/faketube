<template>
  <div>
    <!-- composant video -->
    <div
      class="bg-green-600 flex flex-row justify-center items-center items-start sm:bg-sky-300 sm:w-1/4"
    >
      <router-link to="/video"
        ><img src="../../assets/pp.jpg" alt="" class="rounded-lg border-sky-950"
      /></router-link>
      <div>
        <p class="">titre de la video</p>
        <p class="flex">10 k vues</p>
        <p>il y a temps</p>
      </div>

      <button class="w-full w-auto">X</button>
    </div>
  </div>
</template>

<script setup()>
export default {}
</script>
