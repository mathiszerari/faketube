<template>
    <div class="player-page-content">
        <div class="video-player-container">
            <div class="video-player">
                <div class="video-container">
                    <video ref="video" class="video-player-video" :src="videoUrl" @play="handlePlay"
                        @pause="handlePause"></video>
                </div>
                <div class="video-player__controls">
                    <button class="video-player__play-pause" @click="handlePlayPauseClick">{{ isPlaying ? 'Pause' : 'Play'
                    }}</button>
                    <div class="video-player__progress-bar" @click="handleProgressBarClick">
                       <progress :max="100" :value="progressBarWidth"></progress>
                    </div>
                    <span class="video-player__time">{{ currentTime }} / {{ duration }}</span>
                    <button class="video-player__full-screen" @click="fullScreenVideo">Full Screen</button>
                </div>
            </div>
            <h1>OMG !! YOU ARE NOT GONNA BELIEVE THIS ! (I DELETE THIS VIDEO IN 24H)</h1>
            <div class="video-player-bottom-controls">
                <div class="video-player-channel-content">
                    <div class="video-player-channel-infos">
                        <img class="video-player-channel-img" :src="channelImg" />
                        <div class="video-player-channel">
                                <span class="video-player-channel-name">DarkSasuke</span>
                                <span class="video-player-channel-subscribers">113K</span>
                        </div>
                    </div>
                </div>

                <div class="bottom-controls-buttons">
                    <button>Like</button>
                    <button>Dislike</button>
                    <button>Share</button>
                </div>
            </div>

        </div>
        <div class="video-list">
            <div>
                <p>VIDEOOOOO</p>
            </div>
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
            progressBarWidth: 0,
            videoUrl: '/src/assets/plage.mp4',
            channelImg: '/src/assets/channelimg.png'
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

            const percentage = Math.floor((currentTime / duration) * 100);
            this.progressBarWidth = `${percentage}`;
        },
        fullScreenVideo() {
            const video = this.$refs.video;
            if (video.requestFullscreen) {
                video.requestFullscreen();
            } else if (video.webkitRequestFullscreen) { /* Safari */
                video.webkitRequestFullscreen();
            } else if (video.msRequestFullscreen) { /* IE11 */
                video.msRequestFullscreen();
            }
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
    width: 70%;
    height: 100%;
}

.video-player {
    position: relative;
    width: 100%;
    height: 550px;
}

.video-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 5px;
    overflow: hidden;
    border:2px solid transparent;
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
    margin-left: 5px;
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
    width:100%;
    justify-content: flex-end;
    align-items: center;
}

.video-player-channel-img {
    width: 50px;
    height: 50px;
    object-fit: cover;
    border-radius: 50%;
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
}
.video-player-channel{
    display:flex;
    flex-direction: column;
    margin-left:5px;
}

.video-player-channel-infos{
    display: flex;
    flex-direction: row;
    width: 100%;
}

.video-list{
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
}

.video-player-channel-content{
    margin-right: auto;
}

h1{
    font-size: 20px;
    font-weight: bold;
    color:white;
    margin:10px 0px;
}

.bottom-controls-buttons button{
margin:0px 10px;
}

.video-player__progress-bar{
    width:100%;
    display: flex;
    justify-content: center;
    align-items: center;
}


.video-player__progress-bar progress{
    width:100%;
    margin:0 10px;
}

progress[value]::-webkit-progress-value {
  background-image:
	   -webkit-linear-gradient(-45deg, 
	                           transparent 33%, rgba(0, 0, 0, .1) 33%, 
	                           rgba(0,0, 0, .1) 66%, transparent 66%),
	   -webkit-linear-gradient(top, 
	                           rgba(255, 255, 255, .25), 
	                           rgba(0, 0, 0, .25)),
	   -webkit-linear-gradient(left, rgb(0, 156, 204), rgb(20, 94, 223));

    border-radius: 2px; 
}
</style>