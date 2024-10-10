<script setup>
import { ref } from 'vue'
import db from '../Firebase/init.js'
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth'
import {isAuthenticated, isAdmin,username } from '../router/index.js'
import { app } from '../Firebase/init.js'
import { useRouter } from 'vue-router'
import icons from '../assets/icons.json'
import { doc, getDoc } from 'firebase/firestore'


const auth = getAuth(app)
const formData = ref({
  email: '',
  password: ''
})
const router = useRouter()

const sanitizeInput = (input) => {
  if (typeof input !== 'string') {
    return input
  }

  const sanitizedInput = input.replace(/<[^>]*>?/gm, '')

  if (sanitizedInput !== input) {
    alert('Your input has been sanitized to remove potentially unsafe content.')
  }

  return sanitizedInput
}

const signIn = (email, password) => {
  signInWithEmailAndPassword(auth, email, password)
    .then(async(userCredential) => { 
      const userRef = doc(db, 'users',userCredential.user.uid);
      const user = await getDoc(userRef);
      if (user.exists()) {
        username.value = user.data().username;
        if (user.data().username === 'Admin') {
          isAdmin.value = true;
        }
      }
      alert(username.value);
      console.log('User signed in');
      router.push('/');
      alert('You have successfully signed in.');
      isAuthenticated.value = true;
      console.log(auth.currentUser);
    }).catch((error) => {
      const errorCode = error.code;
  let errorMessage = '';

  if (errorCode === 'auth/invalid-credential') {
    errorMessage = 'Invalid credentials. Please check your email and password.';
  } else if (errorCode === 'auth/invalid-email') {
    errorMessage = ' Please check your email first.';
  } else if (errorCode === 'auth/missing-password') {
    errorMessage = 'Missing password. Please try again.';
  } else {
    errorMessage = 'Error signing in: ' + error.message;
  }

  console.error(errorCode, errorMessage);
  alert(errorMessage);
    });
};

const submitForm = () => {
  const sanitizedEmail = sanitizeInput(formData.value.email);
  const sanitizedPassword = sanitizeInput(formData.value.password);
  formData.value.email = sanitizedEmail;
  formData.value.password = sanitizedPassword;
  signIn(sanitizedEmail, sanitizedPassword);
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
                <label for="username" class="form-label">Email</label>
                <input type="text" class="form-control" id="username" v-model="formData.email" />
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
