import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Register from '../views/Register.vue'
import ArtistMint from '../views/ArtistMint.vue'
import UploadSample from '../views/UploadSample.vue'
import Generate from '../views/Generate.vue'
import Confirmpurchase from '../views/Confirmpurchase.vue'

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
      path: '/uploadsample',
      name: 'uploadsample',
      component: UploadSample
    },
    {
      path: '/generate',
      name: 'Generate',
      component: Generate
    },
    {
      path: '/confirmpurchase',
      name: 'Confirmpurchase',
      component: Confirmpurchase
    }
  ]
})

export default router
