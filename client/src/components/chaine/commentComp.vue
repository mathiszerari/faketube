<template>
  <div class="comments-list-item">
    <img alt="channel img" class="bg-white" :src="channelImg" />
    <div class="comment-content">
      <div class="comment-infos">
        <span class="text-white font-bold">Channel name</span>
        <span> 1 hour ago</span>
        <!-- Add edited or not here ? -->
      </div>
      <p class="comment-text text-white">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda veritatis aliquam
        aspernatur dolorum deserunt praesentium quaerat, sit minima autem, omnis iure. Animi
        perferendis, eveniet repudiandae modi laboriosam dicta. Laudantium, id!
      </p>
      <div class="bottom-comment">
        <button>Like</button>
        <button>Dislike</button>
        <span>Answer</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      channelImg: '/src/assets/channelimg.png'
    }
  }
}
</script>
<style scoped>
.comments-list-item {
  display: flex;
  flex-direction: row;
  margin-bottom: 20px;
}
.comments-list-item img {
  border-radius: 50%;
  width: 40px;
  height: 40px;
  object-fit: cover;
}
.comment-content {
  margin-left: 15px;
}
.bottom-comment > * {
  margin-right: 10px;
}
.bottom-comment span {
  color: rgb(0, 157, 255);
  font-weight: bold;
}
</style>
