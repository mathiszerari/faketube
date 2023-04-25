<template>
    <div class="video-player">
      <div class="video-container">
        <video ref="video" class="video-player-video" :src="videoUrl" @play="handlePlay" @pause="handlePause"></video>
      </div>
      <div class="video-player__controls">
        <button class="video-player__play-pause" @click="handlePlayPauseClick">{{ isPlaying ? 'Pause' : 'Play' }}</button>
        <div class="video-player__progress-bar" @click="handleProgressBarClick">
          <div class="video-player__progress-bar__fill" :style="{ width: progressBarWidth }"></div>
        </div>
        <span class="video-player__time">{{ currentTime }} / {{ duration }}</span>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        isPlaying: false,
        currentTime: '00:00',
        duration: '00:00',
        progressBarWidth: 100,
        videoUrl: '/src/assets/plage.mp4' 
      };
    },
    methods: {
      handlePlay() {
        this.isPlaying = true;
      },
      handlePause() {
        this.isPlaying = false;
      },
      handlePlayPauseClick() {
        if (this.isPlaying) {
          this.$refs.video.pause();
        } else {
          this.$refs.video.play();
        }
      },
      handleProgressBarClick(event) {
        const progressBar = event.currentTarget;
        const progressBarWidth = progressBar.offsetWidth;
        const clickX = event.offsetX;
        const percentage = clickX / progressBarWidth;
        const currentTime = percentage * this.$refs.video.duration;
        this.$refs.video.currentTime = currentTime;
      },
      updateTime() {
        const video = this.$refs.video;
        const currentTime = Math.floor(video.currentTime);
        const minutes = Math.floor(currentTime / 60);
        const seconds = currentTime - minutes * 60;
        const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        this.currentTime = formattedTime;
  
        const duration = Math.floor(video.duration);
        const durationMinutes = Math.floor(duration / 60);
        const durationSeconds = duration - durationMinutes * 60;
        const formattedDuration = `${durationMinutes.toString().padStart(2, '0')}:${durationSeconds.toString().padStart(2, '0')}`;
        this.duration = formattedDuration;
  
        const percentage = (currentTime / duration) * 100;
        this.progressBarWidth = `${percentage}%`;
      }
    },
    mounted() {
      this.$refs.video.addEventListener('timeupdate', this.updateTime);
    },
    beforeUnmount() {
      this.$refs.video.removeEventListener('timeupdate', this.updateTime);
    }
  };
  </script>
  
  <style>
  .video-player {
    position: relative;
    width: 100%;
    height: 0;
    padding-bottom: 56.25%; /* 16:9 aspect ratio */
  }
  
  .video-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
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
   
  }  
  </style>