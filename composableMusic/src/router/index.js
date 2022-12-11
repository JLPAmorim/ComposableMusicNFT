import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Register from '../views/Register.vue'
import ArtistMint from '../views/ArtistMint.vue'
import UploadSample from '../views/UploadSample.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/artistmint',
      name: 'artistmint',
      component: ArtistMint
    },
    {
      path: '/UploadSample',
      name: 'UploadSample',
      component: UploadSample
    }

  ]
})

export default router
