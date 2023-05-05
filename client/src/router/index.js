import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PlayerPage from '../views/PlayerPage.vue'
import SearchVideo from '@/views/SearchVideoView.vue'
import SearchPage from '@/views/SearchPage.vue'
import LoginView from '@/views/LoginView.vue'
import UploadView from '../views/UploadView.vue'
import PlayerVideo from '../views/PlayerVideo.vue'
import ChannelSimple from '@/views/ChannelSimplePage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {

      path: '/watch?id=:id',
      name: 'watch',
      component: PlayerPage
    },
    {

      path: '/searchVideo/:userResearch',
      name: 'searchVideo',
      component: SearchVideo
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
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
    },
    {
      path: '/channel/:id',
      name: 'channel',
      component: ChannelSimple
    }

  ]
})

export default router
