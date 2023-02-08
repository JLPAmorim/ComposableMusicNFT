import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Register from '../views/Register.vue'
import UploadSample from '../views/UploadSample.vue'
import Generate from '../views/Generate.vue'
import UserPage from '../views/UserPage.vue'
import AboutUs from '../views/AboutUs.vue'

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
      path: '/uploadsample',
      name: 'uploadsample',
      component: UploadSample
    },
    {
      path: '/generate',
      name: 'generate',
      component: Generate
    },
    {
      path: '/userpage',
      name: 'userpage',
      component: UserPage
    },
    {
      path: '/aboutus',
      name: 'aboutus',
      component: AboutUs
    }
  ]
})

export default router