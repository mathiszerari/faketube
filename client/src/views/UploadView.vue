<template>
    <main>
        <div v-if="!showUpload">
        <div @dragover.prevent @drop.stop.prevent>
            <p>Video</p>
            <input type="file" @change="onFileChange" />
            <div @drop="dragFile">
                Or drag the file here
            </div>
        </div>
        <br>
        <p v-if='File==="invalid"'>Invalid format ? Only .mp4, .ogg and .webm are accepted</p>
        </div>
        <div v-if="showUpload">
        <div class="file-upload">
            <p>Publisher</p>
            <input v-model="publisher_id"/>
            <p>Title</p>
            <input v-model="title"/>
            <p>Description</p>
            <input v-model="description"/>
            <p>Tags</p>
            <input v-model="tags"/>
            <p>Miniature</p>
            <div @dragover.prevent @drop.stop.prevent>
                <input type="file" @change="onThumbnailChange" />
                <div @drop="dragThumbnail">
                    Or drag the file here
                </div>
            </div>
            <p v-if='thumbnail==="invalid"'>Invalid format ? Only .jpg, .jpeg and .png are accepted</p>
            <br><br>
            <button @click="generateThumbnail">TEST</button>
            <br><br>
            <img :src="this.preview" alt=""/>

            <br><br>
            <button @click="onUploadFile" class="upload-button" :disabled="!this.File">Upload file</button>
        </div>
    </div>
    </main>
</template>

<script>
import axios from "axios";
import path from "path-browserify"
export default {
  data() {
    return {
        showUpload: false,
        File: "",
        awesome: true,
        thumbnail: "",
        preview: "",
        publisher_id: "",
        title: "",
        description: "",
        tags: ""
    };
  },
  methods: {
    dragFile(e) {
        const ArrayExtension = [".mp4",".ogg",".webm"]
        if (ArrayExtension.indexOf(path.extname(e.dataTransfer.files[0].name)) != -1) {
            this.File = e.dataTransfer.files;
            this.showUpload = !this.showUpload
        } else {
            this.File = "invalid"
        }
    },
    dragThumbnail(e) {
        const ArrayExtension = [".jpg",".jpeg",".png"]
        if (ArrayExtension.indexOf(path.extname(e.dataTransfer.files[0].name)) != -1) {
            this.thumbnail = e.dataTransfer.files[0];
            console.log(this.thumbnail)
        } else {
            this.thumbnail = "invalid"
        }
    },
    onFileChange(e) {
        const ArrayExtension = [".mp4",".ogg",".webm"]
        if (ArrayExtension.indexOf(path.extname(e.target.files[0].name)) != -1) {
            this.File = e.target.files;
            this.showUpload = !this.showUpload
        } else {
            this.File = "invalid"
        }
    },
    onThumbnailChange(e) {
        // https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Image_types
        const ArrayExtension = [".jpg",".jpeg",".png"]
        if (ArrayExtension.indexOf(path.extname(e.target.files[0].name)) != -1) {
            this.thumbnail = e.target.files[0];
            this.preview = ""
            console.log(this.thumbnail)
        } else {
            this.thumbnail = "invalid"
        }
    },
    async generateThumbnail(){
        console.log(this.File)
        const formData = new FormData();
        formData.append("file", this.File[0]);
        const test = this
        await axios.post("http://localhost:8080/thumbnail", formData )
        .then(function (response) {
            console.log(response)
            const file = new File([response.data.image], response.data.name, {type: response.data.type})

            test.thumbnail = file
            test.preview = response.data.data
        })
        .catch(function (error) {
            console.log(error)
        })
    },
    async onUploadFile() {
        const formData = new FormData();
        formData.append("file", this.File[0]);

        const thumbnailData = new FormData();
        thumbnailData.append("file", this.thumbnail);
        thumbnailData.append("base64", this.preview);
        if (this.preview != "") {
            thumbnailData.append("type", "generated");
        }

        let Data = new FormData();
        Data.append('publisher_id', this.publisher_id);
        Data.append('title', this.title);
        Data.append('description', this.description);
        Data.append('tags', this.tags);
        Data.append('video_path', this.File[0].name);
        Data.append('miniature_path', this.thumbnail.name);
        
        await axios.post("http://localhost:8080/upload/data", Data)
        .then(function (response) {
            console.log(response)
        })
        .catch(function (error) {
            console.log(error)
        })
        await axios.post("http://localhost:8080/upload/thumbnail", thumbnailData)
        .then(res => {
            console.log(res);
        })
        .catch(err => {
            console.log(err);
        });
        await axios.post('http://localhost:8080/upload/video', formData)
        .then(res => {
            console.log(res);
        })
        .catch(err => {
            console.log(err);
        });
    }
}
};
</script>


<style scoped>
.upload-button {
  width: 7rem;
  padding: 0.5rem;
  background-color: #278be9;
  color: #fff;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  border-radius: 1rem;
}
.upload-button:disabled {
  background-color: #b3bcc4;
  cursor: no-drop;
}
</style>
