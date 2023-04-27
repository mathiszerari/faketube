<template>
    <div class="pop-up-content">
        <div class="pop-up">
            <p class="pop-up-title">Voici comment les autres vous verront</p>

            <img :src="avatarPath" alt="Avatar">
            <label for="file-upload" class="upload-container">
                <span class="upload-label">Sélectionner un fichier</span>
            </label>
            <input id="file-upload" type="file" name="file" style="display:none;">
            <label for="channelname">Channel name</label>
            <input type="text" name="channelname" id="channelname">
            <label for="username">Username</label>
            <input type="text" name="username">
            <button class="valid-button">Valider</button>
            <button class="cancel-button">Cancel</button>


        </div>

    </div>
</template>
<script>
export default {
    data() {
        return {
            avatarPath: "/src/assets/logo.svg"

        }
    },

}
</script>

<style>
.pop-up-content {
    width: 100%;
    height: 100vh;
    position: absolute;
    background-color: rgba(0, 0, 0, 0.592);
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
  background-color: #e1e1e1;
  color: #333;
  border-radius: 5px;
  font-size: 16px;
  transition: background-color 0.3s ease;
}

/* Style au survol */
.upload-container:hover {
  background-color: #ccc;
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

/* Style pour afficher l'icône de téléchargement à côté du label */
.upload-icon {
  position: absolute;
  top: 50%;
  right: 20px;
  transform: translateY(-50%);
  font-size: 24px;
  color: #333;
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
    
}

input[type="text"]:active,input[type="text"]:focus{
    outline: none;
    border: 1px solid blue;
}

</style>