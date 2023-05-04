<template>
  <div class="player-page-content">
    <div class="video-player-container">
      <div class="video-player">
        <div class="video-container">
          <video
            ref="video"
            class="video-player-video"
            :src="`http://localhost:8080/flux/${id}`"
            @play="handlePlay"
            :poster="`http://localhost:8080/thumbnail/${id}`"
            @pause="handlePause"
          ></video>
        </div>
        <div class="video-player__controls">
          <button class="video-player__play-pause" @click="handlePlayPauseClick">
            <span v-if="isPlaying" v-html="pauseIcon"></span>
            <span v-else v-html="playIcon"></span>
          </button>
          <div class="video-player__progress-bar" @click="handleProgressBarClick">
            <progress :max="100" :value="progressBarWidth"></progress>
          </div>
          <span class="video-player__time">{{ currentTime }} / {{ duration }}</span>
          <div class="video-player__volume">
            <button class="video-player__volume-btn" @click="toggleMute">
              <span v-if="isMuted" v-html="muteIcon"></span>
              <span v-else v-html="noMuteIcon"></span>
            </button>
            <div
              class="video-player__volume-slider-container"
              @click="setVolumeWithProgressBar($event)"
            >
              <progress
                class="video-player__volume-slider"
                min="0"
                max="1"
                step="0.1"
                :value="volume"
              ></progress>
            </div>
          </div>
          <button class="video-player__full-screen" @click="fullScreenVideo">
            <span v-html="fullScreenIcon"></span>
          </button>
        </div>
      </div>
      <h1 class="text-white">{{ video.title }}</h1>
      <div class="video-player-bottom-controls">
        <div class="video-player-channel-content">
          <div class="video-player-channel-infos">
            <img class="video-player-channel-img bg-white" :src="channelImg" />
            <div class="video-player-channel">
              <span class="video-player-channel-name">DarkSasuke</span>
              <span class="video-player-channel-subscribers">113K</span>
            </div>
          </div>
        </div>

        <div class="bottom-controls-buttons">
          <span>{{ likeNumber }}</span>
          <button @click="addLike(id)"><span v-html="likeIcon"></span></button>
          <span>{{ dislikeNumber }}</span>
          <button @click="addDislike(id)"><span v-html="dislikeIcon"></span></button>
          <button @click="copyLink()"><span v-html="shareIcon"></span></button>
        </div>
      </div>

      <div class="description-case">
        <div class="video-informations">
          <span class="video-views">{{ video.views }} views </span>
          <span class="video-date">2 hours ago</span>
        </div>
        <p>
          {{ video.description }}
        </p>
      </div>

      <section class="comments-section">
        <div class="comments-infos">
          <span class="text-white">27 Comments</span>
          <select class="text-white">
            <option value="">Sort by</option>
            <option value="Top">Top Comments</option>
            <option value="Recent">Recent Comments</option>
          </select>
        </div>
        <div class="add-comment-row">
          <img :src="channelImg" alt="channel img" />
          <input type="text" placeholder="Add a comment..." />
        </div>

        <div class="comments-list">
          <Comment />
          <Comment />
          <Comment />
          <Comment />
        </div>
      </section>
    </div>
    <div class="video-list">
      <VideoItem v-for="(video, index) in videos" :key="index" :video="video" />
    </div>
  </div>
</template>

<script>
import commentCompVue from '../components/chaine/commentComp.vue'
import videoItemVue from '../components/chaine/videoItem.vue'
import axios from 'axios'
export default {
  data() {
    return {
      volume: 0.5,
      isMuted: false,
      isPlaying: false,
      currentTime: '00:00',
      duration: '00:00',
      progressBarWidth: 0,
      channelImg: '/src/assets/channelimg.png',
      playIcon:
        '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" /></svg>',
      pauseIcon:
        '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 5.25v13.5m-7.5-13.5v13.5" /></svg>',
      fullScreenIcon:
        '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" /></svg>',
      noMuteIcon:
        '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" /></svg>',
      muteIcon:
        '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M17.25 9.75L19.5 12m0 0l2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6l4.72-4.72a.75.75 0 011.28.531V19.94a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.506-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.395C2.806 8.757 3.63 8.25 4.51 8.25H6.75z" /></svg>',
      likeIcon:
        '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z" /></svg>',
      dislikeIcon:
        '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M7.5 15h2.25m8.024-9.75c.011.05.028.1.052.148.591 1.2.924 2.55.924 3.977a8.96 8.96 0 01-.999 4.125m.023-8.25c-.076-.365.183-.75.575-.75h.908c.889 0 1.713.518 1.972 1.368.339 1.11.521 2.287.521 3.507 0 1.553-.295 3.036-.831 4.398C20.613 14.547 19.833 15 19 15h-1.053c-.472 0-.745-.556-.5-.96a8.95 8.95 0 00.303-.54m.023-8.25H16.48a4.5 4.5 0 01-1.423-.23l-3.114-1.04a4.5 4.5 0 00-1.423-.23H6.504c-.618 0-1.217.247-1.605.729A11.95 11.95 0 002.25 12c0 .434.023.863.068 1.285C2.427 14.306 3.346 15 4.372 15h3.126c.618 0 .991.724.725 1.282A7.471 7.471 0 007.5 19.5a2.25 2.25 0 002.25 2.25.75.75 0 00.75-.75v-.633c0-.573.11-1.14.322-1.672.304-.76.93-1.33 1.653-1.715a9.04 9.04 0 002.86-2.4c.498-.634 1.226-1.08 2.032-1.08h.384" /></svg>',
      shareIcon:
        '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" /></svg>',
      video: {}, // Define when the comp is mounted
      likeNumber: 0, // Define when the comp is mounted
      dislikeNumber: 0, // Define when the comp is mounted
      ifLiked: false,
      ifDisliked: false,
      id: 0,
      videos: {} // Define when the comp is mounted
    }
  },
  methods: {
    handlePlay() {
      this.isPlaying = true
    },
    handlePause() {
      this.isPlaying = false
    },
    handlePlayPauseClick() {
      if (this.isPlaying) {
        this.$refs.video.pause()
      } else {
        this.$refs.video.play()
      }
    },
    handleProgressBarClick(event) {
      const progressBar = event.currentTarget
      const progressBarWidth = progressBar.offsetWidth
      const clickX = event.offsetX
      const percentage = clickX / progressBarWidth
      const currentTime = percentage * this.$refs.video.duration
      this.$refs.video.currentTime = currentTime
    },
    updateTime() {
      const video = this.$refs.video
      const currentTime = Math.floor(video.currentTime)
      const minutes = Math.floor(currentTime / 60)
      const seconds = currentTime - minutes * 60
      const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds
        .toString()
        .padStart(2, '0')}`
      this.currentTime = formattedTime
      const duration = Math.floor(video.duration)
      const durationMinutes = Math.floor(duration / 60)
      const durationSeconds = duration - durationMinutes * 60
      const formattedDuration = `${durationMinutes.toString().padStart(2, '0')}:${durationSeconds
        .toString()
        .padStart(2, '0')}`
      this.duration = formattedDuration
      const percentage = Math.floor((currentTime / duration) * 100)
      this.progressBarWidth = `${percentage}`
    },
    fullScreenVideo() {
      const video = this.$refs.video
      if (video.requestFullscreen) {
        video.requestFullscreen()
      } else if (video.webkitRequestFullscreen) {
        /* Safari */
        video.webkitRequestFullscreen()
      } else if (video.msRequestFullscreen) {
        /* IE11 */
        video.msRequestFullscreen()
      }
    },
    toggleMute() {
      this.isMuted = !this.isMuted
      this.$refs.video.muted = this.isMuted
    },
    setVolumeWithProgressBar(event) {
      const progressBar = event.currentTarget
      const rect = progressBar.getBoundingClientRect()
      const x = event.clientX - rect.left
      const width = rect.width
      const volume = x / width
      this.volume = volume
      this.$refs.video.volume = volume
    },
    async getVideo(id) {
      try {
        const response = await axios.get(`http://localhost:8080/video/${id}`)
        console.log(response)
        this.video = response.data.video[0]
        console.log(this.video)
      } catch (error) {
        console.log(error)
      }
    },
    async getVideos() {
      try {
        const response = await axios.get(`http://localhost:8080/videos`)
        /* console.log(response); */
        this.videos = response.data.videos
      } catch (error) {
        console.log(error)
      }
    },
    addLike(id) {
      if (this.ifLiked) {
        this.likeNumber--
        this.ifLiked = false
      } else {
        this.likeNumber++
        this.ifLiked = true
      }
      axios.patch(`http://localhost:8080/video/${id}`, {
        like_number: this.likeNumber
      })
    },
    addDislike(id) {
      if (this.ifDisliked) {
        this.dislikeNumber--
        this.ifDisliked = false
      } else {
        this.dislikeNumber++
        this.ifDisliked = true
      }
      axios.patch(`http://localhost:8080/video/${id}`, {
        dislike_number: this.dislikeNumber
      })
    },
    addView(id) {
      this.video = {
        ...this.video, // create a copy of this.video
        views: this.video.views + 1
      }
      console.log(this.video)
      axios.patch(`http://localhost:8080/video/${id}`, {
        views: this.video.views
      })
    },
    async loadData() {
      const queryString = window.location.search
      const urlParams = new URLSearchParams(queryString)
      const id = urlParams.get('id')
      this.id = id
      await this.getVideo(this.id)
      this.addView(this.id)
      this.likeNumber = this.video.like_number
      this.dislikeNumber = this.video.dislike_number
    },
    copyLink() {
      const url = window.location
      navigator.clipboard.writeText(url)
    }
  },
  components: {
    Comment: commentCompVue,
    VideoItem: videoItemVue
  },
  async mounted() {
    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString)
    const id = urlParams.get('id')
    this.id = id
    this.$refs.video.addEventListener('timeupdate', this.updateTime)
    await this.getVideo(this.id)
    await this.getVideos()
    this.addView(this.id)
    this.likeNumber = this.video.like_number
    this.dislikeNumber = this.video.dislike_number
  },
  beforeUnmount() {
    this.$refs.video.removeEventListener('timeupdate', this.updateTime)
  },
  watch: {
    $route: function () {
      this.loadData()
    }
  }
}
</script>

<style scoped>
.player-page-content {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin-top: 10vh;
  flex-wrap: nowrap;
}
.video-player-container {
  width: 65%;
  height: 100%;
  padding: 20px;
}
.video-player {
  position: relative;
  width: 100%;
  height: 550px;
}
video {
  min-height: 100%;
  min-width: 100%;
}
.video-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 5px;
  overflow: hidden;
  border: 2px solid transparent;
  border-style: none;
  box-shadow: 0px 0px 5px 1px rgb(117, 117, 117);
}
.video-player-video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.video-player__controls {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  flex-direction: row;
  padding: 5px;
  background-color: rgba(0, 0, 0, 0.563);
}
.video-player__time {
  margin-left: 10px;
  white-space: nowrap;
  display: flex;
  justify-content: center;
  align-items: center;
}
.video-player-bottom-controls {
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: flex-end;
  align-items: center;
}
.video-player-channel-img {
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.video-player-channel {
  display: flex;
  flex-direction: column;
  margin-left: 5px;
}
.video-player-channel-infos {
  display: flex;
  flex-direction: row;
  width: 100%;
}
.video-list {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 20px;
}
.video-player-channel-content {
  margin-right: auto;
}
h1 {
  font-size: 20px;
  font-weight: bold;
  margin: 10px 0px;
}
.bottom-controls-buttons {
  display: flex;
  justify-content: center;
  align-items: center;
}
.bottom-controls-buttons button {
  margin: 0px 10px;
}
.video-player__progress-bar {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.video-player__progress-bar progress {
  width: 100%;
  margin: 0 10px;
  height: 5px;
}
progress[value]::-webkit-progress-value {
  background-image: -webkit-linear-gradient(
      -45deg,
      transparent 33%,
      rgba(0, 0, 0, 0.1) 33%,
      rgba(0, 0, 0, 0.1) 66%,
      transparent 66%
    ),
    -webkit-linear-gradient(top, rgba(255, 255, 255, 0.25), rgba(0, 0, 0, 0.25)),
    -webkit-linear-gradient(left, rgb(0, 156, 204), rgb(20, 94, 223));
  border-radius: 2px;
}
.video-player__volume-slider-container {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 10px;
}
.video-player__volume-slider {
  width: 100%;
  height: 5px;
}
.video-player__volume {
  display: flex;
  flex-direction: row;
  min-width: 150px;
  align-items: center;
  justify-content: center;
  margin-left: 5px;
}
.description-case {
  margin-top: 10px;
}
.video-date {
  margin-left: 5px;
}
.comments-section {
  margin-top: 30px;
}
.comments-infos span {
  font-size: 20px;
}
.comments-infos select {
  margin-left: 20px;
  background-color: rgb(34, 34, 34);
  text-align: center;
  padding: 5px;
}
.add-comment-row {
  display: flex;
  flex-direction: row;
  width: 100%;
  margin-top: 20px;
}
.add-comment-row img {
  border-radius: 50%;
  width: 40px;
  height: 40px;
  object-fit: cover;
  background-color: white;
  /* for transparent png */
}
.add-comment-row input {
  background-color: transparent;
  border-bottom: 1px solid rgb(138, 138, 138);
  transition: all 500ms;
  margin-left: 15px;
  width: 100%;
}
.add-comment-row input:active,
.add-comment-row input:focus,
.add-comment-row input:hover {
  border-bottom: 1px solid rgb(255, 255, 255);
  outline: 0;
}
.comments-list {
  margin-top: 50px;
}
</style>
