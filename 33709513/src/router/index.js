import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import {ref} from 'vue'
import SignUpView from '@/views/SignUpView.vue'
import InsomiaView from '@/views/InsomiaView.vue'
import ContactView from '@/views/ContactView.vue'
const isAuthenticated = ref(false)
const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/Login',
    name: 'Login',
    component: LoginView
  },
  {
    path: '/SignUp',
    name: 'SignUp',
    component: SignUpView
  },
  {
    path: '/InsomiaView',
    name: 'InsomiaView',
    component: InsomiaView
  },
  {
    path: '/Contact',
    name: 'Contact',
    component: ContactView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
export { isAuthenticated }
