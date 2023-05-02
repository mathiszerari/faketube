<template>
    <main class="flex justify-center align-middle">
        <div v-if="!showUpload">
            <div @dragover.prevent @drop.stop.prevent>
                
                <h1 class="flex justify-center my-10 text-5xl font-medium leading-tight text-primary">Upload video</h1>
                
                <div @drop="dragFile">
                    <label for="upload" class="flex flex-col items-center p-4 gap-3 rounded-3xl border border-gray-300 border-solid bg-gray-50 cursor-pointer">
                        <img class="h-96 w-auto" src="">
                        <h4 class="text-base font-semibold text-gray-700">Upload a file</h4>
                        <input type="file" id="upload" @change="onFileChange" hidden/>
                    </label>
                </div>
                <p v-if='File==="invalid"' class="my-4 text-base font-semibold text-gray-700">Invalid format ? Only .mp4, .ogg and .webm are accepted !</p>
                <p class="my-2 text-center text-xs font-light leading-tight">
                    Click OR Drag & Drop the file
                </p>
            </div>
        </div>
        <div v-if="showUpload">
            <h1 class="flex justify-center my-10 text-5xl font-medium leading-tight text-primary">Upload miniature</h1>
            <div>
                <input v-model="publisher_id" placeholder="Publisher" required/>
                <input v-model="title" placeholder="Title" required/>
                <input v-model="description" placeholder="Description" required/>
                <input v-model="tags" placeholder="Tags" required/>
                <div @dragover.prevent @drop.stop.prevent>
                    <div @drop="dragThumbnail">
                        <label for="upload" class="flex flex-col items-center p-4 gap-3 rounded-3xl border border-gray-300 border-solid bg-gray-50 cursor-pointer">
                            <img class="h-56 w-auto" src="">
                            <h4 class="text-base font-semibold text-gray-700">Upload a file</h4>
                            <input type="file" id="upload" @change="onThumbnailChange" hidden/>
                        </label>
                    </div>
                    <p v-if='thumbnail==="invalid"' class="my-4 text-base font-semibold text-gray-700">Invalid format ? Only .jpg, .jpeg and .png are accepted !</p>
                    <p class="my-2 text-center text-xs font-light leading-tight">
                        Click OR Drag & Drop the file
                    </p>
                </div>
                <div class="flex flex-col justify-center align-middle">
                    <button @click="generateThumbnail" class="my-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Generate Thumbnail</button>
                    <img :src="this.preview" alt=""/>
                    <button @click="onUploadFile" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" :disabled="!this.File">Upload file</button>
                </div>
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
        this.$router.push({path: "/"})
        
    }
}
};
</script>


<style scoped>
@tailwind base;
@tailwind components;
@tailwind utilities;
</style>
