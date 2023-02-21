import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import SignInPage from '@/views/SignInPage.vue'
import EditNotebook from '@/views/EditNotebook.vue'
import SignUpPage from '@/views/SignUpPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: SignInPage
    },
    {
      path: '/signup',
      component: SignUpPage
    },
    {
      path: '/home',
      component: Home
    },
    {
      path: '/home/:notebook_id',
      component: EditNotebook
    }
  ]
})

export default router
