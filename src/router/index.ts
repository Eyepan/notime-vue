import { createRouter, createWebHistory } from 'vue-router'
import SignInPage from '@/views/SignInPage.vue'
import EditNotebook from '@/views/EditNotebook.vue'
import Home from '@/views/Home.vue'
import SignUpPage from '@/views/SignUpPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'signin',
      component: SignInPage
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignUpPage
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/home/:notebook_id',
      name: 'notebook',
      component: EditNotebook
    }
  ]
})

export default router
