<template>
  <div class="app">
    <!-- Sidebar -->
    <Sidebar />

    <div class="w-full bg-zinc-800">
      <SearchBar></SearchBar>
      <!-- Content -->
      <router-view />
    </div>
  </div>

</template>

<script setup>
import Sidebar from './components/Timeline/Sidebar.vue'

import SearchBar from './components/recherche/SearchBar.vue'

</script>

<style lang="scss">
:root {

  --primary: #ff0015;
  --primary-alt: #fc0000;
  --grey: #64748b;
  --dark: #010101;
  --dark-alt: #334155;
  --light: #f1f5f9;
  --sidebar-width: 300px;
}

body {
  background-color: #27272a;
  width: 100%;
}

button {
  cursor: pointer;
  appearance: none;
  border: none;
  outline: none;
  background: none;
}

#app{
  width: 100%;
}

.app {
  display: flex;
  width: 100%;

  main {
    flex: 1 1 0;
    padding: 2rem;
    background: #27272a;
    @media (max-width: 1024px) {
      padding-left: 6rem;
    }
  }

}
</style>
