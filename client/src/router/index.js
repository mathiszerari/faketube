import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ChannelCreation from '../components/ChannelCreation.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/PopUp',
      name: 'ChannelCreation',
      component: ChannelCreation
    },
  ]
})

export default router
