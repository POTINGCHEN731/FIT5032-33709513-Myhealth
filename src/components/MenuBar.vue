<script setup>
import { isAuthenticated} from '../router/index.js'
import Menubar from 'primevue/menubar'
import { useRouter } from 'vue-router'

const router = useRouter()

const signIn = () => {
  router.push('/login')
}

const signOut = () => {
  localStorage.removeItem('isAuthenticated')
  localStorage.removeItem('userInfo')
  isAuthenticated.value = null
  router.push('/Login')
}


</script>

<template>
  <Menubar>
    <template #start>
      <a class="p-menuitem-link sign-in-item button-spacing" @click="router.push('/')">
        <span class="p-menuitem-icon pi pi-fw pi-user"></span>
        <span class="p-menuitem-text">Home</span>
      </a>     
      <a v-if="isAuthenticated && isAuthenticated!=='Admin' " class="p-menuitem-link sign-in-item button-spacing" @click="router.push('/About')">
        <span class="p-menuitem-icon pi pi-fw pi-user"></span>
        <span class="p-menuitem-text"> About</span>
      </a>
      <a v-if="isAuthenticated==='Admin'" class="p-menuitem-link sign-in-item button-spacing" @click="router.push('/Appointment')">
        <span class="p-menuitem-icon pi pi-fw pi-user"></span>
        <span class="p-menuitem-text"> Admin</span>
      </a>
      <a v-if="isAuthenticated && isAuthenticated!=='Admin' " class="p-menuitem-link sign-in-item button-spacing" @click="router.push('/UserAppointment')">
        <span class="p-menuitem-icon pi pi-fw pi-user"></span>
        <span class="p-menuitem-text"> Consultants</span>
      </a>
      <a v-if="isAuthenticated && isAuthenticated!=='Admin' " class="p-menuitem-link sign-in-item button-spacing" @click="router.push('/MyAppointment')">
        <span class="p-menuitem-icon pi pi-fw pi-user"></span>
        <span class="p-menuitem-text"> Appointment</span>
      </a>
      <a v-if="isAuthenticated && isAuthenticated!=='Admin' " class="p-menuitem-link sign-in-item button-spacing" @click="router.push('/Map')">
        <span class="p-menuitem-icon pi pi-fw pi-user"></span>
        <span class="p-menuitem-text"> Map</span>
      </a>

    </template>
    <template #end>
      <template v-if="!isAuthenticated">
        <a class="p-menuitem-link sign-in-item" @click="signIn">
          <span class="p-menuitem-icon pi pi-fw pi-user"></span>
          <span class="p-menuitem-text">Sign In</span>
        </a>
      </template>
      <template v-if="isAuthenticated">
        <a class="p-menuitem-link sign-in-item" @click="signOut">
          <span class="p-menuitem-icon pi pi-fw pi-user"></span>
          <span class="p-menuitem-text">Sign Out</span>
        </a>
      </template>
    </template>
  </Menubar>
</template>

<style scoped>
.sign-in-item {
  cursor: pointer;
}
.button-spacing {
  margin-right: 15px;
}
</style>
