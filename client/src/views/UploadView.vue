<template>
  <main class="flex justify-center align-middle">
    <div v-if="!showUpload">
      <div @dragover.prevent @drop.stop.prevent>
        <h1 class="flex justify-center my-5 text-5xl font-medium leading-tight text-primary text-white">
          Upload video
        </h1>

        <div @drop="dragFile">
          <label
            for="upload"
            class="flex flex-col items-center p-4 gap-3 rounded-3xl border border-gray-300 border-solid bg-gray-50 cursor-pointer"
          >
            <img class="h-96 w-auto" src="/upload.png" />
            <h4 class="text-base font-semibold text-gray-700">Upload a file</h4>
            <input type="file" id="upload" @change="onFileChange" hidden />
          </label>
        </div>
        <p v-if="File === 'invalid'" class="my-4 text-base font-semibold text-white">
          Invalid format ? Only .mp4, .ogg and .webm are accepted !
        </p>
        <p class="my-2 text-center text-xs font-light leading-tight text-white">
          Click OR Drag & Drop the file
        </p>
      </div>
    </div>
    <div v-if="showUpload">
      <h1 class="flex justify-center mb-2 text-5xl font-medium leading-tight text-primary text-white">
        Upload miniature
      </h1>
      <div>
        <div class="flex flex-col">
          <div class="mb-2">
            <label for="default-input" class="block mb-1 text-sm font-medium text-white">Title</label>
            <input v-model="title" type="text" id="default-input" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required/>
          </div>
          <div class="mb-2">
            <label for="default-input" class="block mb-1 text-sm font-medium text-white">Description</label>
            <textarea v-model="description" type="text" id="default-input" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required/>
          </div>
          <div class="mb-2">
            <label for="default-input" class="block mb-1 text-sm font-medium text-white">Tags</label>
            <input v-model="tags" type="text" id="default-input" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required/>
          </div>
        </div>
        <div @dragover.prevent @drop.stop.prevent class="my-4">
          <div @drop="dragThumbnail">
            <label
              for="upload"
              class="flex flex-col items-center p-4 gap-3 rounded-3xl border border-gray-300 border-solid bg-gray-50 cursor-pointer"
            >
              <img class="h-56 w-auto" src="/upload.png" />
              <h4 class="text-base font-semibold text-gray-700">Upload a file</h4>
              <input type="file" id="upload" @change="onThumbnailChange" hidden />
            </label>
          </div>
          <p v-if="thumbnail === 'invalid'" class="my-2 text-base font-semibold text-white">
            Invalid format ? Only .jpg, .jpeg and .png are accepted !
          </p>
          <p class="my-2 text-center text-xs font-light leading-tight text-white">
            Click OR Drag & Drop the file
          </p>
        </div>
        <div class="flex flex-col justify-center align-middle">
          <button
            v-if="!preview"
            @click="generateThumbnail"
            class="my-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Generate Thumbnail
          </button>
          <img :src="this.preview" alt="" />
          <button
            @click="onUploadFile"
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            :disabled="fieldsAreFilled"
          >
            Upload file
          </button>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import axios from 'axios'
import path from 'path-browserify'
export default {
  data() {
    return {
      showUpload: false,
      File: '',
      awesome: true,
      thumbnail: '',
      preview: '',
      publisher_id: localStorage.getItem('id'),
      title: '',
      description: '',
      tags: ''
    }
  },
  computed: {
    fieldsAreFilled: function () {
      return (
        !this.title ||
        !this.description ||
        !this.tags ||
        !this.File ||
        !this.thumbnail
      )
    }
  },
  methods: {
    dragFile(e) {
      const ArrayExtension = ['.mp4', '.ogg', '.webm']
      if (ArrayExtension.indexOf(path.extname(e.dataTransfer.files[0].name)) != -1) {
        this.File = e.dataTransfer.files
        this.showUpload = !this.showUpload
      } else {
        this.File = 'invalid'
      }
    },
    dragThumbnail(e) {
      const ArrayExtension = ['.jpg', '.jpeg', '.png']
      if (ArrayExtension.indexOf(path.extname(e.dataTransfer.files[0].name)) != -1) {
        this.thumbnail = e.dataTransfer.files[0]
        console.log(this.thumbnail)
      } else {
        this.thumbnail = 'invalid'
      }
    },
    onFileChange(e) {
      const ArrayExtension = ['.mp4', '.ogg', '.webm']
      if (ArrayExtension.indexOf(path.extname(e.target.files[0].name)) != -1) {
        this.File = e.target.files
        this.showUpload = !this.showUpload
      } else {
        this.File = 'invalid'
      }
    },
    onThumbnailChange(e) {
      // https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Image_types
      const ArrayExtension = ['.jpg', '.jpeg', '.png']
      if (ArrayExtension.indexOf(path.extname(e.target.files[0].name)) != -1) {
        this.thumbnail = e.target.files[0]
        this.preview = ''
        console.log(this.thumbnail)
      } else {
        this.thumbnail = 'invalid'
      }
    },
    async generateThumbnail() {
      console.log(this.File)
      const formData = new FormData()
      formData.append('file', this.File[0])
      const test = this
      await axios
        .post('http://localhost:8080/thumbnail', formData)
        .then(function (response) {
          console.log(response)
          const file = new File([response.data.image], response.data.name, {
            type: response.data.type
          })
          test.thumbnail = file
          test.preview = response.data.data
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    async onUploadFile() {
      const formData = new FormData()
      formData.append('file', this.File[0])
      const thumbnailData = new FormData()
      thumbnailData.append('file', this.thumbnail)
      thumbnailData.append('base64', this.preview)
      if (this.preview != '') {
        thumbnailData.append('type', 'generated')
      }
      let Data = new FormData()
      Data.append('publisher_id', this.publisher_id)
      Data.append('title', this.title)
      Data.append('description', this.description)
      Data.append('tags', this.tags)
      Data.append('video_path', this.File[0].name)
      Data.append('miniature_path', this.thumbnail.name)

      await axios
        .post('http://localhost:8080/upload/data', Data)
        .then(function (response) {
          console.log(response)
        })
        .catch(function (error) {
          console.log(error)
        })
      await axios
        .post('http://localhost:8080/upload/thumbnail', thumbnailData)
        .then((res) => {
          console.log(res)
        })
        .catch((err) => {
          console.log(err)
        })
      await axios
        .post('http://localhost:8080/upload/video', formData)
        .then((res) => {
          console.log(res)
        })
        .catch((err) => {
          console.log(err)
        })
      this.$router.push({ path: '/' })
    }
  }
}
</script>

<style scoped>
@tailwind base;
@tailwind components;
@tailwind utilities;
</style>
