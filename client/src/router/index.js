import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import UploadView from '../views/UploadView.vue'
import PlayerVideo from '../views/PlayerVideo.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/upload',
      name: 'Upload Video',
      component: UploadView
    },
    {
        path: '/video/:id',
        name: 'Player',
        component: PlayerVideo
    }
  ]
})

export default router
