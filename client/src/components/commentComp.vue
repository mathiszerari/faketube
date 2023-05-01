<template>
          <div class="comments-list-item">
            <img alt="channel img" :src="channelImg" />
            <div class="comment-content">
              <div class="comment-infos">
                <span>Channel name</span>
                <span> 1 hour ago</span>
                <!-- Add edited or not here ? -->
              </div>
              <p class="comment-text">
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
    
}
</script>
<style>
    
</style>