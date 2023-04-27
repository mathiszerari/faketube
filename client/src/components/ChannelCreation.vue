<template>
    <div class="pop-up-content">
        <div class="pop-up">
            <p class="pop-up-title">Voici comment les autres vous verront</p>

            <img :src="avatarUrl" alt="Avatar">
            <label for="file-upload" class="upload-container">
                <span class="upload-label">Sélectionner un fichier</span>
            </label>
            <input id="file-upload" type="file" name="file" style="display:none;" @change="onFileChange">
            <input type="text" name="channelname" id="channelname" placeholder="Channel name">
            <input type="text" name="username" placeholder="Username">
            <button class="valid-button">Valider</button>
            <button class="cancel-button">Cancel</button>


        </div>

    </div>
</template>
<script>
export default {
    data() {
        return {
            avatarPath: null
        }
    },
    computed: {
    avatarUrl() {
      if (this.avatarPath) {
        return URL.createObjectURL(this.avatarPath);
      } else {
        return null;
      }
    }
  },
  methods: {
    onFileChange(event) {
      this.avatarPath = event.target.files[0];
    }
  }

}
</script>

<style>
.pop-up-content {
    width: 100%;
    height: 100vh;
    position: absolute;
    background-color: rgba(0, 0, 0, 0.525);
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
}

.pop-up {
    padding: 10px;
    background-color: rgb(43, 43, 43);
    color: white;
    width: 50%;
    height: 700px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
}

.pop-up img {
    background-color: white;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    object-fit: cover;
}

.valid-button {
    position: absolute;
    bottom: 20px;
    right: 20px;
    color: rgb(16, 131, 165);
    border: 2px solid rgb(16, 131, 165);
    padding: 5px 20px;
    font-weight: bold;
    transition: all 500ms;

}

.cancel-button {
    position: absolute;
    bottom: 20px;
    right: 130px;
    color: rgb(165, 16, 16);
    border: 2px solid rgb(165, 16, 16);;
    padding: 5px 20px;
    font-weight: bold;
    transition: all 500ms;

}

.pop-up>* {
    margin: 10px;
}

/* Styles de base pour l'élément input */
input[type="file"] {
  display: none; /* Cacher l'élément de base */
}

/* Styles pour le conteneur qui remplace l'élément input */
.upload-container {
  position: relative;
  display: inline-block;
  cursor: pointer;
  padding: 25px 120px;
  background-color: #e1e1e100;
  color: #0ba4f0;
  border-radius: 50px;
  font-weight: bold;
  font-size: 16px;
  transition: background-color 0.3s ease;
}

/* Style au survol */
.upload-container:hover {
  background-color: #46a6f050;
}

/* Style lorsque l'on clique dessus */
.upload-container:active {
  background-color: #999;
}

/* Style pour le label affichant le nom du fichier sélectionné */
.upload-label {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 80%;
}


.valid-button:hover{
    background-color: rgb(16, 131, 165);
    color:white;
}

.cancel-button:hover{
    background-color: rgb(165, 16, 16);
    color:white;
}

.pop-up-title{
    font-weight: bold;
    color: white;
    font-size:25px;
    position: absolute;
    top :20px;
    left: 20px;
}

input[type="text"]{
    width: 65%;
    padding: 15px;
    border-radius: 5px;
    background-color: transparent;
    border: 1px solid rgb(169, 167, 167);
    color: white;
    position:relative;
}
input[type="text"]::placeholder{
    position: absolute;
    top:5px;
    left:5px;
    font-size: 10px;
}

input[type="text"]:active,input[type="text"]:focus, input[type="text"]:focus::placeholder, input[type="text"]:active::placeholder{
    outline: none;
    border-color:  rgb(0, 191, 255);
    color:rgb(0, 191, 255);
}

</style>