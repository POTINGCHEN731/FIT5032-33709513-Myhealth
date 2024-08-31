<script setup>
import { isAuthenticated, isAdmin } from '../router/index.js'
import Menubar from 'primevue/menubar'
import { useRouter } from 'vue-router'

const router = useRouter()

const signIn = () => {
  router.push('/login')
}

const signOut = () => {
  isAuthenticated.value = false
  isAdmin.value = false
  router.push('/Login')
}

const items = [
  {
    label: 'Home',
    icon: 'pi pi-fw ',
    command: () => {
      router.push('/')
    }
  }
]
if (isAuthenticated.value) {
  items.push(
    {
      label: 'About',
      icon: 'pi pi-fw ',
      command: () => {
        router.push('/about')
      }
    },
    {
      label: 'Contact',
      icon: 'pi pi-fw ',
      command: () => {
        router.push('/contact')
      }
    }
  )
}

if (isAdmin.value) {
  items.push({
    label: 'Appointment',
    icon: 'pi pi-fw ',
    command: () => {
      router.push('/appointment')
    }
  })
}
</script>

<template>
  <Menubar :model="items">
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
</style>
