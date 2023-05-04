<template>
  <div class="video-list-item">
    <router-link :to="`/watch?id=${video.id}`">
      <img
        alt="thumbnail"
        :src="`http://localhost:8080/thumbnail/${video.id}`"
        class="video-list-thumbnail object-cover rounded-sm"
      />
      <div class="video-list-item-infos">
        <span class="text-white font-bold text-base">{{ video.title }}</span>
        <span class="video-list-item-channel-name">VlogUS</span>
        <div class="video-list-item-bottom-infos">
          <span class="video-list-item-views">{{ video.views }} views</span>
          <span class="video-list-item-date">2 days ago</span>
        </div>
      </div>
    </router-link>
  </div>
</template>
<script>
export default {
  props: {
    video: {
      type: Object,
      required: true
    }
  }
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
  width: 220px;
}
.video-list-item-infos div {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}
.video-list-item-bottom-infos {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}
</style>
