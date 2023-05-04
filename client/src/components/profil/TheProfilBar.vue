<template>
  <nav class="navbar w-full">
    <div class="navbar-left">
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/f/f9/Phoenicopterus_ruber_in_S%C3%A3o_Paulo_Zoo.jpg"
        alt="Photo de profil"
      />
    </div>
    <div class="navbar-center">
      <span class="navbar-title">FakeTube</span>
    </div>
    <div class="navbar-right">
      <button class="navbar-button"><i class="material-icons"></i> Paramètres</button>
    </div>
  </nav>
</template>

<script>
export default {
  methods: {
    goToSettings() {
      // Code pour rediriger vers la page des paramètres
    }
  }
}
</script>

<style>
.navbar {
  @apply h-[50000px] flex justify-between items-center bg-white h-[60px] shadow-[0_2px_4px_rgba(0,0,0,0.1)] mt-0 px-5 py-0;
}
.navbar-left img {
  @apply h-10 w-10 rounded-[50%];
}
.navbar-center .navbar-title {
  @apply text-2xl text-[#333];
}
.navbar-right .navbar-button {
  @apply bg-transparent text-[1.2rem] text-[#333] cursor-pointer border-[none];
}
.navbar-right .navbar-button i {
  @apply inline-block mr-[5px];
}
</style>
