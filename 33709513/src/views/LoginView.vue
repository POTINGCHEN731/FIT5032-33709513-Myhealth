<script setup>
import { ref } from 'vue'
import { isAuthenticated, isAdmin } from '../router/index.js'
import { useRouter } from 'vue-router'
import icons from '../assets/icons.json'

const formData = ref({
  username: '',
  password: ''
})
const router = useRouter()

const submitForm = () => {
  const users = JSON.parse(localStorage.getItem('users') || '[]')
  const user = users.find(
    (user) => user.username === formData.value.username && user.password === formData.value.password
  )
  if (user) {
    if (user.username.toLowerCase() === 'admin') {
      isAdmin.value = true
      isAuthenticated.value = true
    }
    isAuthenticated.value = true
    alert('Login successful')
    if (isAdmin.value) {
      router.push('/appointment')
    } else {
      router.push('/')
    }
  } else {
    alert('Login failed please check your username and password')
  }
}
</script>

<template>
  <div class="background">
    <div class="row"></div>
    <div class="container login-box">
      <div class="row">
        <div class="col-md-8 col-sm-8 offset-md-2">
          <h1 class="text-center font-change">
            <img
              src="../components/icons/logo.jpg"
              style="width: 90%; height: auto; margin-left: -10%"
            />
          </h1>
          <div class="row mb-3">
            <div class="col-md-16 col-sm-16 d-flex align-items-center justify-content-center">
              <hr class="flex-grow-1" />
              <hr class="flex-grow-1" />
            </div>
          </div>
          <form @submit.prevent="submitForm">
            <div class="row mb-3 mt-2">
              <div class="col-md-12 col-sm-12">
                <label for="username" class="form-label">Username</label>
                <input type="text" class="form-control" id="username" v-model="formData.username" />
              </div>
            </div>
            <div class="row mb-3">
              <div class="col-sm-12">
                <label for="password" class="form-label">Password</label>
                <input
                  type="password"
                  class="form-control"
                  id="password"
                  v-model="formData.password"
                />
                <div class="mt-5">
                  <button type="submit" class="btn btn-primary me-5" style="width: 100%">
                    Login
                  </button>
                </div>
                <div class="mt-4 col-md-12 col-sm-12">
                  <router-link
                    to="/SignUp"
                    class="nav-link"
                    active-class="active"
                    aria-current="page"
                    >No account? Sign Up</router-link
                  >
                </div>
              </div>
            </div>
          </form>

          <div class="row mb-3">
            <div class="col-md-16 col-sm-16 d-flex align-items-center justify-content-center">
              <hr class="flex-grow-1" />
              <span class="mx-2">or</span>
              <hr class="flex-grow-1" />
            </div>
          </div>

          <div class="row mt-4">
            <div
              class="col-md-6 col-sm-6 offset-md-3 d-flex justify-content-around icons-container"
            >
              <div v-for="icon in icons.icons" :key="icon.name">
                <img :src="icon.image_path" :alt="icon.alt_text" class="responsive-icon" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row"></div>
    </div>
  </div>
</template>

<style scoped>
.background {
  background-color: #e0f0e9;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.container {
  width: 100%;
  max-width: 40%;
  padding: 20px;
}

.login-box {
  background-color: #ffffff;
  border-radius: 10px;
  padding: 30px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.responsive-icon {
  width: 1.5em;
  height: auto;
  max-width: 40px;
}

@media (max-width: 768px) {
  .container {
    max-width: 90%;
  }

  .responsive-icon {
    width: 50%;
    max-width: 40px;
  }
}

@media (max-width: 576px) {
  .container {
    max-width: 95%;
  }

  .responsive-icon {
    width: 50%;
    max-width: 40px;
  }
}
</style>
