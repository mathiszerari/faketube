<template>
  <div class="profile dark-theme">
    <div class="profile-header">
      <img :src="profileImage" class="profile-image" alt="Profile Image" />
      <div class="profile-titles">
        <h1 class="profile-title">{{ profileUsername }}</h1>
        <p class="profile-description">Membre depuis le {{ memberSince }}</p>
      </div>
      <button class="profile-logout-btn" @click="logout">↪ Déconnexion</button>
    </div>
    <div class="profile-content">
      <div class="profile-section">
        <h2 class="profile-section-title">Informations de compte</h2>
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
    <div class="footer">
      <p>© 2023 Faketube</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Profile',
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
  display : flex;
  justify-content : center;
  align-items : center;
  margin: 0;
  padding: 0;
  background-color: #1a1a1a;
  color: #fff;
  font-family: Arial, sans-serif;
  font-size: 16px;
  line-height: 1.5;
}

.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 40px;

}

.profile {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
}

.profile-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 40px;
  width: 100%;
}

.profile-image {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 20px;
}

.profile-title {
  font-size: 36px;
  display : flex;
  justify-content : center;
  align-items : center;
}

.profile-description {
  font-size: 24px;
  margin: 0;
  color: #bbb;
}

.profile-content {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.profile-section {
  margin-bottom: 20px;
}

.profile-section-title {
  font-size: 24px;
  margin-bottom: 20px;
}

.profile-info {
  display: flex;
  margin-bottom: 10px;
  align-items: center;
}

.profile-info-label {
  font-weight: bold;
  margin-right: 10px;
}

.profile-info-value {
  color: #bbb;
}

.profile-info-value button {
  color: black;
}

.btn {
  display: inline-block;
  background-color: #2196f3;
  color: #fff;
  border: none;
  padding: 8px 16px;
  font-size: 16px;
  cursor: pointer;
  margin-left: 10px;
  border-radius: 5px;
  text-align: center;
}

.btn:hover {
  background-color: #0c7cd5;
}

.btn:active {
  background-color: #0c7cd5;
  transform: translateY(1px);
}

.footer {
  width: 100%;
  padding: 10px 20px;
  background-color: #0d0d0d;
  text-align: center;
  font-size: 14px;
  color: #ccc;
  margin-top: auto;
}

</style>