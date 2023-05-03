import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import TestView from "@/views/TestView.vue";
import SearchVideo from "@/views/SearchVideoView.vue"
import SearchPage from "@/views/SearchPage.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/search',
      name: 'test',
      component: SearchPage
    },
    {
      path: '/searchVideo',
      name: 'test',
      component: SearchVideo
      
    }
  ]
})

export default router
