<template>
  <div class="profile dark-theme">
    <div class="flex flex-col items-center w-full mb-10">
      <img :src="profileImage" class="w-[120px] h-[120px] object-cover mb-5 rounded-[50%]" alt="Profile Image" />
      <div class="profile-titles">
        <h1 class="text-4xl flex justify-center items-center">{{ profileUsername }}</h1>
        <p class="text-2xl text-[#bbb] m-0">Membre depuis le {{ memberSince }}</p>
      </div>
      <button class="profile-logout-btn" @click="logout">↪ Déconnexion</button>
    </div>
    <div class="flex flex-col w-full">
      <div class="mb-5">
        <h2 class="mb-2.5">Informations de compte</h2>
        <div class="profile-info">
          <div class="profile-info-label">Pseudo :</div>
          <div class="profile-info-value">
            {{ profileUsername }} <button class="profile-edit-btn" @click="editUsername">Modifier</button>
          </div>
        </div>
        <div class="profile-info">
          <div class="profile-info-label">Email :</div>
          <div class="profile-info-value">
            {{ profileEmail }} <button class="profile-edit-btn" @click="editEmail">Modifier</button>
          </div>
        </div>
        <div class="profile-info">
          <div class="profile-info-label">Mot de passe :</div>
          <div class="profile-info-value">
            ******** <button class="profile-edit-btn" @click="editPassword">Modifier</button>
          </div>
        </div>
      </div>
    </div>
    <div class="w-full bg-[#0d0d0d] text-center text-sm text-[#ccc] mt-auto px-5 py-2.5">
      <p>© 2023 Faketube</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TheProfile',
  data() {
    return {
      profileImage: 'https://education.l214.com/wp-content/uploads/2020/09/15-animaux-moches-04.jpg',
      profileUsername: 'Mathis95c',
      profileEmail: 'mathis95c@gmail.com',
      memberSince: '28 avril 2023'
    }
  },
  methods: {
    editUsername() {
      const newUsername = prompt('Nouveau pseudo :', this.profileUsername)
      if (newUsername !== null) {
        this.profileUsername = newUsername
      }
    },
    editEmail() {
      let newEmail = prompt('Nouvel email :', this.profileEmail)
      while (newEmail !== null && !isValidEmail(newEmail)) {
        alert('Adresse e-mail invalide.')
        newEmail = prompt('Nouvel email :')
      }
      if (newEmail !== null) {
        this.profileEmail = newEmail
      }
    },
    editPassword() {
      const newPassword = prompt('Nouveau mot de passe :')
      if (newPassword !== null) {
        // En réalité, il faudrait appeler une API pour modifier le mot de passe enregistré côté serveur.
        console.log('Le mot de passe a été modifié avec succès.')
      }
    },
    logout() {
      window.location.href = 'index.html'
    }
  }
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}
</script>

<style>


body {
  @apply flex justify-center items-center bg-[#1a1a1a] text-white text-base leading-normal m-0 p-0;
  font-family: Arial, sans-serif;
}



.profile-info {
  @apply flex items-center mb-2.5;
}
.profile-info-label {
  @apply mr-2.5;
}
.profile-info-value {
  @apply text-[#bbb];
}
.profile-info-value button {
  @apply text-[black];
}
.btn {
  @apply inline-block bg-[#2196f3] text-white text-base cursor-pointer text-center ml-2.5 px-4 py-2 rounded-[5px] border-[none] hover:bg-[#0c7cd5] active:bg-[#0c7cd5] active:translate-y-px;
}


</style>