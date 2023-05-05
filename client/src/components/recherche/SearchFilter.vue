<template>
  <div class="bg-zinc-800 p-2 flex flex-col">
    <div
      @click="menuFilter"
      class="filter-btn bg-zinc-900 inline-block w-20 px-5 py-2 rounded cursor-pointer text-center text-white hover:bg-zinc-700 transition-colors"
    >
      Filtrer
    </div>
    <div class="filters-container hidden flex-wrap justify-between">
      <div class="filter-box p-3 m-1">
        <h2 class="text-black text-white font-bold">DATE</h2>
        <hr class="h-px bg-zinc-400 border-0 my-2" />
        <div class="content">
          <p @click="" class="py-1 cursor-pointer transition-colors text-white">Dernière heure</p>
          <p class="py-1 cursor-pointer transition-colors transition-transform text-white">
            Aujourd'hui
          </p>
          <p class="py-1 cursor-pointer transition-colors transition-transform text-white">
            Cette semaine
          </p>
          <p class="py-1 cursor-pointer transition-colors transition-transform text-white">
            Ce mois-ci
          </p>
          <p class="py-1 cursor-pointer transition-colors transition-transform text-white">
            Cette année
          </p>
        </div>
      </div>
      <div class="filter-box p-3 m-1">
        <h2 class="text-black text-white font-bold">TYPE</h2>
        <hr class="h-px bg-zinc-400 border-0 my-2" />
        <div class="content">
          <p class="py-1 cursor-pointer transition-colors transition-transform text-white">Vidéo</p>
          <p class="py-1 cursor-pointer transition-colors transition-transform text-white">
            Chaîne
          </p>
        </div>
      </div>
      <div class="filter-box p-3 m-1">
        <h2 class="text-black text-white font-bold">DURÉE</h2>
        <hr class="h-px bg-zinc-400 border-0 my-2" />
        <div class="content">
          <p class="py-1 cursor-pointer transition-colors transition-transform text-white">
            Moins de 4 minutes
          </p>
          <p class="py-1 cursor-pointer transition-colors transition-transform text-white">
            Entre 4 et 20 minutes
          </p>
          <p class="py-1 cursor-pointer transition-colors transition-transform text-white">
            Plus de 20 minutes
          </p>
        </div>
      </div>
      <div class="filter-box p-3 m-1">
        <h2 class="text-black text-white font-bold">TRIER PAR</h2>
        <hr class="h-px bg-zinc-400 border-0 my-2" />
        <div class="content">
          <p class="py-1 cursor-pointer transition-colors text-white">Date de mise en ligne</p>
          <p class="py-1 cursor-pointer transition-colors transition-transform text-white">
            Nombre de vues
          </p>
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>

.content p:hover {
  transform: translateY(-2px);
}
.filter-box {
  width: 200px;
  height: 200px;
}

</style>

<script setup>
const menuFilter = () => {
  if (document.querySelector('.filters-container').style.display != 'flex') {
    document.querySelector('.filters-container').style.display = 'flex'
  } else {
    document.querySelector('.filters-container').style.display = 'none'
  }
}
const getFilteredVideos = async (filter) => {
  const {
    isFetching,
    error,
    data: video
  } = await useFetch('http://localhost:8080/getUserById/' + filter)
  const formattedVideos = computed(() => {
    return JSON.parse(video.value)
  })
  return formattedVideos
}
</script>
