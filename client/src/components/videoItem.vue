<template>
  <div class="video-list-item">
    <img alt="thumbnail" :src="thumbnailVideo" class="video-list-thumbnail object-cover rounded-sm" />
    <div class="video-list-item-infos">
      <span class="text-white font-bold text-base">Title video</span>
      <span class="video-list-item-channel-name">VlogUS</span>
      <div>
        <span class="video-list-item-views">2.1m</span>
        <span class="video-list-item-date">2 days ago</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      thumbnailVideo: '/src/assets/thumbnail.jpg'
    }
  },
}
</script>
<style scoped>
  .video-list-thumbnail {
  width: 200px;
  height: 120px;
}

.video-list-item {
  display: flex;
  flex-direction: row;
  margin-bottom: 20px;
}

.video-list-item-infos {
  margin-left: 10px;
  display: flex;
  flex-direction: column;
}

.video-list-item-infos div {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

</style>