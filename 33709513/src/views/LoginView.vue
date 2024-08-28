<script setup>
import { ref } from 'vue'
import { isAuthenticated } from '../router/index.js';
import { useRouter } from 'vue-router'
import icons from '../assets/icons.json' // Importing icons from JSON file

const formData = ref({
  username: '',
  password: '',})
  const router = useRouter()
  
  const submitForm = () => {
 if (formData.value.username == 'user' && formData.value.password == 'password') {
    alert('Login successful')
  isAuthenticated.value = true
  router.push('/about')
}
    else{
      alert('Login failed')
    }
  }

</Script>

<template>
  <div class="background">
    <div class='row'></div>
  <div class="container ">
    <div class="row">
      <div class="col-md-8 col-sm-8 offset-md-2">
        <h1 class="text-center font-change"> <img src="../components/icons/logo.jpg" style="width: 90%; height: auto; margin-left:-10%"></h1>
        <div class="row mb-3">
          <div class="col-md-16 col-sm-16  d-flex align-items-center justify-content-center">
            <hr class="flex-grow-1" />
            <hr class="flex-grow-1" />
          </div>
        </div>
        <form @submit.prevent="submitForm">
          <div class="row mb-3 mt-2">
            <div class="col-md-12 col-sm-12 ">
              <label for="username" class="form-label">Username</label>
              <input
                type="text"
                class="form-control"
                id="username"
                v-model="formData.username"
              />
            </div>
          </div>
          <div class="row mb-3">
            <div class=" col-sm-12 ">
              <label for="password" class="form-label">Password</label>
              <input
                type="password"
                class="form-control"
                id="password"
                v-model="formData.password"
              />
              <div class="mt-5">
                <button type="submit" class="btn btn-primary me-5 "  style="width: 100%;">Login</button>
              </div>
              <div class="mt-4 col-md-12 col-sm-12">
                <router-link to="/SignUp" class="nav-link" active-class="active" aria-current="page"
            >No account? Sign Up</router-link>
                </div>
            </div>
          </div>
        </form>

        <div class="row mb-3">
          <div class="col-md-16 col-sm-16  d-flex align-items-center justify-content-center">
            <hr class="flex-grow-1" />
            <span class="mx-2">or</span>
            <hr class="flex-grow-1" />
          </div>
        </div>

        <div class="row mt-4">
          <div class="col-md-6 col-sm-6 offset-md-3 d-flex justify-content-around icons-container">
            <div v-for="icon in icons.icons" :key="icon.name"  >
              <img :src="icon.image_path" :alt="icon.alt_text" class="responsive-icon" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class = 'row'></div>
  </div>
  </div>
</template>


<style scoped>
.background {
  margin-top: 0rem;
 height: 100vh;
  padding: 5;
    background-color: pink; 
}
.container {
  background-color: white;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  max-width: 30%;
  height: 90vh;
  margin: 0 auto;
  margin-top: 3rem;
  margin-bottom: 4rem;
  padding: 10px;
  border-radius: 10px;
}

/* Class selectors */
.form {
  text-align: center;
  margin-top: 50px;
}


.list-group-item {
  padding: 6px;
}
.custom-col {
    width: 12%; 
}
.responsive-icon {
    width: 70%; 
    max-width: 40px; 
    height: auto; 
}
.scalable-text {
    font-size: 1rem; 
}



@media (max-width: 768px) {
  .container {
    max-width: 50%;
    font-size: 0.5rem;
    .responsive-icon {
    width: 50%; 
    max-width: 40px; 
    height: auto; 
}
button {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 20px;
  padding: 10px;
  font-size: 0.5rem;
  border-radius: 5px;
  border: none;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  text-align: center;
}

input[type="text"],
input[type="password"] {
  width: 100%;
  height: 20px;
  padding: 0 10px;
  font-size: 16px;
  line-height: 50px; 
  border-radius: 5px;
  border: 1px solid #ccc;
  box-sizing: border-box;
  text-align: center; 
}
  }
}

@media (max-width: 576px) {

  .container {
    max-width: 80%;
    font-size: 0.5rem;
    .responsive-icon {
    width: 50%; 
    max-width: 40px; 
    height: auto; 
}
button {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 20px;
  padding: 10px;
  font-size: 0.5rem;
  border-radius: 5px;
  border: none;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  text-align: center;
}

input[type="text"],
input[type="password"] {
  width: 100%;
  height: 20px;
  padding: 0 10px;
  font-size: 16px;
  line-height: 50px; 
  border-radius: 5px;
  border: 1px solid #ccc;
  box-sizing: border-box;
  text-align: center; 
}
  }


}
</style>


