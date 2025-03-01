<script setup>
import { ref, watch, onMounted } from 'vue'
import {getAuth, createUserWithEmailAndPassword} from 'firebase/auth' 
import { useRouter } from 'vue-router'
import { app } from '../Firebase/init.js'
import db from '../Firebase/init.js'
import { doc, setDoc } from 'firebase/firestore'

const router = useRouter()
const auth = getAuth(app)
const months = Array.from({ length: 12 }, (_, i) => i + 1)
const days = ref([])
const years = ref([])

const register = () => {
  createUserWithEmailAndPassword(auth, formData.value.userEmail, formData.value.password)
    .then((userCredential) => {
      const user = userCredential.user
      console.log('User registered successfully:', user)
      alert('Sign up successfully')
      addUser(user.uid)
      clearForm()
      router.push('/Login')
    })
    .catch((error) => {
      const errorCode = error.code;
      let errorMessage = '';
      if (errorCode === 'auth/email-already-in-use') {
        errorMessage = 'This email is already in use. Please use a different email.';
      } else if (errorCode === 'auth/invalid-email') {
        errorMessage = 'The email address is not valid. Please enter a valid email.';
      } else {
        errorMessage = 'Error registering user: ' + error.message;
      }

      console.error('Error registering Email:', error);
      alert(errorMessage);
    });
}
const currentYear = new Date().getFullYear()
const formData = ref({
  userEmail: '',
  username: '',
  password: '',
  confirmPassword: '',
  phoneNumber: '',
  gender: '',
  birthYear: '',
  birthMonth: '',
  birthDay: '',
  isAustralian: false
})
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

onMounted(() => {
  years.value = Array.from({ length: currentYear - 1900 + 1 }, (_, i) => currentYear - i)
})

const updateDays = () => {
  const year = parseInt(formData.value.birthYear, 10)
  const month = parseInt(formData.value.birthMonth, 10)

  let maxDays = 31

  if (month === 4 || month === 6 || month === 9 || month === 11) {
    maxDays = 30
  } else if (month === 2) {
    if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
      maxDays = 29
    } else {
      maxDays = 28
    }
  }

  days.value = Array.from({ length: maxDays }, (_, i) => i + 1)

  if (formData.value.birthDay > maxDays) {
    formData.value.birthDay = ''
  }
}
const addUser = async (uid) => {
  try {
    await setDoc(doc(db, "users", uid), {
    userEmail: formData.value.userEmail,
    username: formData.value.username,
    password: formData.value.password,
    phoneNumber: formData.value.phoneNumber,
    gender: formData.value.gender,
    birthYear: formData.value.birthYear,
    birthMonth: formData.value.birthMonth,
    birthDay: formData.value.birthDay,
    isAustralian: formData.value.isAustralian  
  }) }catch (error) {
    console.error("Error adding document: ", error)
  }
}


const submitForm = () => {
  formData.value.username = sanitizeInput(formData.value.username)
  formData.value.password = sanitizeInput(formData.value.password)
  formData.value.confirmPassword = sanitizeInput(formData.value.confirmPassword)
  formData.value.userEmail = sanitizeInput(formData.value.userEmail)
  formData.value.phoneNumber = sanitizeInput(formData.value.phoneNumber)
  
  validateName(true)
  validatePassword(true)
  validateEmail(true)
  validatePhoneNumber(true)
  validateYear(true)
  validateGender(true)
  validateConfirmPassword(true)
  validateDay(true)
  validateMonth(true)

  const hasErrors = Object.values(errors.value).some((error) => error !== null)

  if (!hasErrors) {
    register()
  }
}

const clearForm = () => {
  formData.value = {
    userEmail: '',
    username: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    gender: '',
    birthYear: '',
    birthMonth: '',
    birthDay: '',
    isAustralian: false
  }
  Object.keys(errors.value).forEach((key) => {
    errors.value[key] = null
  })
}

const errors = ref({
  userEmail: null,
  username: null,
  password: null,
  confirmPassword: null,
  phoneNumber: null,
  gender: null,
  birthYear: null,
  birthMonth: null,
  birthDay: null
})

const validateYear = (blur) => {
  const year = parseInt(formData.value.birthYear, 10)
  if (!year || year < 1900 || year > currentYear) {
    if (blur) errors.value.birthYear = `Please finish all the required fields correctly.`
  } else {
    errors.value.birthYear = null
  }
}

const validateEmail = (blur) => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailPattern.test(formData.value.userEmail)) {
    if (blur) errors.value.userEmail = 'Invalid email format'
  } else {
    errors.value.userEmail = null
  }
}

const validateGender = (blur) => {
  if (!formData.value.gender) {
    if (blur) errors.value.gender = 'Must select a gender type'
  } else {
    errors.value.gender = null
  }
}

const validatePhoneNumber = (blur) => {
  const phonePattern = /^[0-9]{10,15}$/
  if (!phonePattern.test(formData.value.phoneNumber)) {
    if (blur) errors.value.phoneNumber = 'Invalid phone number format'
  } else {
    errors.value.phoneNumber = null
  }
}

const validateName = (blur) => {
  if (formData.value.username.length < 3) {
    if (blur) errors.value.username = 'Name must be at least 3 characters'
  } else {
    errors.value.username = null
  }
}

const validatePassword = (blur) => {
  const password = formData.value.password
  const minLength = 8
  const hasUppercase = /[A-Z]/.test(password)
  const hasLowercase = /[a-z]/.test(password)
  const hasNumber = /\d/.test(password)
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password)

  if (password.length < minLength) {
    if (blur) errors.value.password = `Password must be at least ${minLength} characters long.`
  } else if (!hasUppercase) {
    if (blur) errors.value.password = 'Password must contain at least one uppercase letter.'
  } else if (!hasLowercase) {
    if (blur) errors.value.password = 'Password must contain at least one lowercase letter.'
  } else if (!hasNumber) {
    if (blur) errors.value.password = 'Password must contain at least one number.'
  } else if (!hasSpecialChar) {
    if (blur) errors.value.password = 'Password must contain at least one special character.'
  } else {
    errors.value.password = null
  }
}

const validateConfirmPassword = (blur) => {
  if (formData.value.password !== formData.value.confirmPassword) {
    if (blur) errors.value.confirmPassword = 'Passwords do not match.'
  } else {
    errors.value.confirmPassword = null
  }
}

const validateMonth = (blur) => {
  if (!formData.value.birthMonth) {
    if (blur) errors.value.birthMonth = 'Month cannot be empty'
  } else {
    errors.value.birthMonth = null
  }
}

const validateDay = (blur) => {
  if (!formData.value.birthDay) {
    if (blur) errors.value.birthDay = 'Day cannot be empty'
  } else {
    errors.value.birthDay = null
  }
}
watch([() => formData.value.birthYear, () => formData.value.birthMonth], ([newYear, newMonth]) => {
  updateDays(true)
})
</script>

<template>
  <div class="background">
    <div class="container">
      <div class="signup-box">
        <img src="../components/icons/logo.jpg" alt="Logo" class="logo" />
        <h2 class="welcome-text">Create New Account</h2>
        <form @submit.prevent="submitForm">
          <div class="input-group">
            <label for="username" class="label">Username</label>
            <input
              type="text"
              id="username"
              @blur="validateName(true)"
              @input="validateName(false)"
              v-model="formData.username"
              placeholder="Enter your username"
            />
          </div>
          <div v-if="errors.username" class="error-message">{{ errors.username }}</div>
          <div class="input-group">
            <label for="email" class="label">Email</label>
            <input
              type="text"
              id="email"
              @blur="validateEmail(true)"
              @input="validateEmail(false)"
              v-model="formData.userEmail"
              placeholder="Enter your email"
            />
          </div>
          <div v-if="errors.userEmail" class="error-message">{{ errors.userEmail }}</div>
          <div class="input-group">
            <label for="password" class="label">Password</label>
            <input
              type="password"
              id="password"
              @blur="validatePassword(true)"
              @input="validatePassword(false)"
              v-model="formData.password"
              placeholder="Enter your password"
            />
          </div>
          <div v-if="errors.password" class="error-message">{{ errors.password }}</div>
          <div class="input-group">
            <label for="confirmPassword" class="label">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              @blur="validateConfirmPassword(true)"
              @input="validateConfirmPassword(false)"
              v-model="formData.confirmPassword"
              placeholder="Confirm your password"
            />
          </div>
          <div v-if="errors.confirmPassword" class="error-message">
            {{ errors.confirmPassword }}
          </div>
          <div class="input-group">
            <label for="phoneNumber" class="label">Phone Number</label>
            <input
              type="tel"
              id="phoneNumber"
              @blur="validatePhoneNumber(true)"
              @input="validatePhoneNumber(false)"
              v-model="formData.phoneNumber"
              placeholder="Enter your phone number"
            />
          </div>
          <div v-if="errors.phoneNumber" class="error-message">{{ errors.phoneNumber }}</div>
          <div class="input-group">
            <label for="gender" class="label">Gender</label>
            <select
              id="gender"
              v-model="formData.gender"
              @blur="validateGender(true)"
              @input="validateGender(false)"
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div v-if="errors.gender" class="error-message">{{ errors.gender }}</div>
          <div class="input-group">
            <label class="label">Date of Birth:&nbsp;</label>
            <div class="date-inputs date-inputs-mobile">
              <select
                v-model="formData.birthYear"
                @blur="validateYear(true)"
                @input="validateYear(false)"
              >
                <option value="">Year</option>
                <option v-for="year in years" :key="year" :value="year">{{ year }}</option>
              </select>
              <select
                v-model="formData.birthMonth"
                @blur="validateMonth(true)"
                @input="validateMonth(false)"
              >
                <option value="">Month</option>
                <option v-for="month in months" :key="month" :value="month">{{ month }}</option>
              </select>
              <select
                v-model="formData.birthDay"
                @blur="validateDay(true)"
                @input="validateDay(false)"
              >
                <option value="">Day</option>
                <option v-for="day in days" :key="day" :value="day">{{ day }}</option>
              </select>
            </div>
          </div>
          <div v-if="errors.birthYear" class="error-message">{{ errors.birthYear }}</div>
          <div class="input-group checkbox">
            <input type="checkbox" id="isAustralian" v-model="formData.isAustralian" />
            <label for="isAustralian">I am an Australian resident</label>
          </div>
          <button type="submit" class="signup-btn">Sign Up</button>
        </form>
        <div class="links">
          <router-link to="/Login" class="login-link">Already have an account? Log in</router-link>
        </div>
        <div class="terms"></div>
      </div>
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
  max-width: 50%;
  padding: 20px;
}

.signup-box {
  background-color: #ffffff;
  border-radius: 10px;
  padding: 30px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.logo {
  display: block;
  width: 120px;
  height: auto;
  margin: 0 auto 20px;
}

.welcome-text {
  color: #4a4a4a;
  text-align: center;
  margin-bottom: 30px;
}

.input-group {
  margin-bottom: 15px;
  width: 100%;
}

label {
  display: block;
  margin-bottom: 5px;
  color: #6b6b6b;
}

input,
select {
  width: 100%;
  padding: 10px;
  border: 1px solid #e0f0e9;
  border-radius: 5px;
  font-size: 16px;
}

.signup-btn {
  width: 100%;
  padding: 12px;
  background-color: #b8d8e8;
  color: #4a4a4a;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.signup-btn:hover {
  background-color: #a0c8d8;
}

.links {
  text-align: center;
  margin-top: 20px;
}

.login-link {
  color: #b8d8e8;
  text-decoration: none;
}

.terms {
  margin-top: 20px;
  text-align: center;
  font-size: 14px;
  color: #6b6b6b;
}

.checkbox {
  display: flex;
  align-items: center;
  gap: 10px;
}

.checkbox input {
  width: auto;
}

.error-message {
  color: red;
  margin-top: -6px;
}

.date-inputs {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.date-inputs select {
  flex: 1;
  padding: 10px;
  border: 1px solid #e0f0e9;
  border-radius: 5px;
  font-size: 16px;
}

@media (max-width: 576px) {
  .signup-btn {
    padding: 6px;
    font-size: 10px;
  }

  .welcome-text {
    font-size: 10px;
  }

  .logo {
    width: 50px;
  }

  select {
    font-size: 12px;
    transform: scale(0.7);
    transform-origin: left top;
  }

  input {
    font-size: 6px;
  }

  .signup-box {
    padding: 20px;
  }

  .error-message {
    font-size: 4pt;
    margin-top: -3px;
  }

  .date-inputs-mobile select {
    transform: scale(0.7);
    transform-origin: left top;
  }
}
</style>
