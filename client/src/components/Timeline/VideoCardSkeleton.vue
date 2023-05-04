<template>
  <div class="aspect-video">
    <div class="w-54 aspect-video bg-zinc-500 rounded-2xl animate-pulse"></div>
    <div class="flex flex-row gap-4 mt-4">
      <div class="w-12 h-12 bg-zinc-500 rounded-full animate-pulse"></div>
      <div class="flex flex-col space-y-2">
        <div class="h-4 bg-zinc-500 rounded w-40 animate-pulse"></div>
        <div class="h-4 bg-zinc-500 rounded w-24 animate-pulse"></div>
        <div class="h-4 bg-zinc-500 rounded w-28 animate-pulse"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.publisher__avatar {
  width: 50px;
  height: 50px;
}
.animate-pulse {
  animation: pulse 1.5s ease-in-out infinite;
}
@keyframes pulse {
  0% {
    opacity: 0.4;
  }
  50% {
    opacity: 0.8;
  }
  100% {
    opacity: 0.4;
  }
}
</style>
