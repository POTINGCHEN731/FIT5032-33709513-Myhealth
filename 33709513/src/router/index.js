import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import { ref } from 'vue'
import SignUpView from '../views/SignUpView.vue'
import InsomiaView from '../views/InsomiaView.vue'
import ContactView from '../views/ContactView.vue'
import AboutView from '../views/AboutView.vue'
import AppointmentView from '../views/AppointmentView.vue'
import UserAppointmentView from '../views/UserAppointmentView.vue'
import AnorexiaView from '../views/AnorexiaView.vue'
import OCDView from '../views/OCDView.vue'
import AddictionView from '../views/AddictionView.vue'
import DepressionView from '../views/DepressionView.vue'
import AnxietyView from '../views/AnxietyView.vue'
import MyAppointmentView from '@/views/MyAppointmentView.vue'


const isAuthenticated = ref(null)
const username = ref('')

const userInfo = ref({
  email: '',
  gender: '',
  age: '',
})

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
    path:'/AnorexiaView',
    name: 'AnorexiaView',
    component: AnorexiaView

  },
  {
    path:'/OCDView',
    name: 'OCDView',
    component: OCDView

  },
  {
  path:'/AddictionView',
  name: 'AddictionView',
  component:AddictionView
  },
  {
    path:'/DepressionView',
    name: 'DepressionView',
    component:DepressionView
    },
    {
      path:'/AnxietyView',
      name: 'AnxietyView',
      component:AnxietyView
      },

  {
    path: '/Contact',
    name: 'Contact',
    component: ContactView,
    beforeEnter: (to, from, next) => {
      if (!isAuthenticated.value) {
        next({ name: 'Login' })
      } else {
        next()
      }
    }
  },
  {
    path: '/About',
    name: 'About',
    component: AboutView,
    beforeEnter: (to, from, next) => {
      if (!isAuthenticated.value) {
        next({ name: 'Login' })
      } else {
        next()
      }
    }
  },
  {
    path: '/MyAppointment',
    name: 'MyAppointment',
    component: MyAppointmentView,
    beforeEnter: (to, from, next) => {
      if (!isAuthenticated.value) {
        next({ name: 'Login' })
      } else {
        next()
      }
    }
  },

  {
    path: '/Appointment',
    name: 'Appointment',
    component: AppointmentView,
    beforeEnter: (to, from, next) => {
      if (isAuthenticated.value !=='Admin') {
        next({ name: 'Login' })
      } else {
        next()
      }
    }
  },
  { path: '/UserAppointment',
    name: 'UserAppointment',
    component: UserAppointmentView,
    beforeEnter: (to, from, next) => {
      if (isAuthenticated.value ==='Admin' || !isAuthenticated.value) {
        next({ name: 'Login' })
      } else {
        next()
      }
  }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
export { isAuthenticated, username, userInfo }
