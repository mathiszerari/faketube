<template>
    <main>
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
            <input type="file" @change="onMiniaChange" />
            <p>Video</p>
            <input type="file" @change="onFileChange" />
            <br><br>
            <button @click="generateThumbnail">TEST</button>
            <br><br>
            <button @click="awesome = !awesome" v-if="awesome">Toggle</button>
            <div v-else>
                <img :src="image" alt=""/>
            </div>
            <br><br>
            <button @click="onUploadFile" class="upload-button" :disabled="!this.selectedFile">Upload file</button>
        </div>
    </main>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
        awesome: true,
        image: "",
        selectedFile: "",
        selectedMinia: "",
        publisher_id: "",
        title: "",
        description: "",
        tags: ""
    };
  },
  methods: {
    onFileChange(e) {
        this.selectedFile = e.target.files[0]; // accessing file      this.selectedFile = selectedFile;
    },
    onMiniaChange(e) {
        this.selectedMinia = e.target.files[0]; // accessing file      this.selectedFile = selectedFile;
    },
    async generateThumbnail(){
        const formData = new FormData();
        formData.append("file", this.selectedFile);

        const test = this

        await axios.post("http://localhost:8080/template", formData )
        .then(function (response) {
            test.image = response.data.image
        })
        .catch(function (error) {
            console.log(error)
        })
    },
    async onUploadFile() {
        const formData = new FormData();
        formData.append("file", this.selectedFile);  // appending file

        const miniaData = new FormData();
        miniaData.append("file", this.selectedMinia);  // appending file

        let Data = new FormData();
        Data.append('publisher_id', this.publisher_id);
        Data.append('title', this.title);
        Data.append('description', this.description);
        Data.append('tags', this.tags);
        Data.append('video_path', this.selectedFile.name);
        Data.append('miniature_path', this.selectedMinia.name);

        await axios.post("http://localhost:8080/upload/data", Data)
        .then(function (response) {
            console.log(response)
        })
        .catch(function (error) {
            console.log(error)
        })

        await axios.post("http://localhost:8080/upload/thumbnail", miniaData)
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