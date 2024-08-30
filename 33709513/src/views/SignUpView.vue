<script setup>
import { ref,watch, onMounted } from 'vue'
import { useRouter } from 'vue-router';

const router = useRouter();

const months = Array.from({ length: 12 }, (_, i) => i + 1)
const days = ref([])
const years = ref([])

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
  isAustralian: false,
})

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


const submitForm = () => {
  validateName(true)
  validatePassword(true)
  validateEmail(true)
  validatePhoneNumber(true)
  validateYear(true)
  validateGender(true)
  validateConfirmPassword(true)
  validateDay(true)
  validateMonth(true)
  if (!errors.value.username && !errors.value.password && !errors.value.userEmail && !errors.value.phoneNumber && !errors.value.birthYear && !errors.value.gender && !errors.value.birthMonth && !errors.value.birthDay && !errors.value.confirmPassword) {
    alert('Sign up successfully')
    clearForm()
    router.push('/Login')
  }else{
    alert('Please fill in all the required fields correctly.')
  }
}

const clearForm = () => {
  formData.value = {
    userEmail: '',
    username: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
    gender: '',
    birthYear: '',
  birthMonth: '',
  birthDay: '',
    isAustralian: false,
  }
}

const errors = ref({
  userEmail: null,
  username: null,
  phoneNumber: null,
  password: null,
  confirmPassword: '',
  gender: null,
  birthYear: null,
  birthMonth: null,
  birthDay: null,
  isAustralian: false,
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
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(formData.value.userEmail)) {
    if (blur) errors.value.userEmail = 'Invalid email format';
  } else {
    errors.value.userEmail = null;
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
  const phonePattern = /^[0-9]{10,15}$/; 
  if (!phonePattern.test(formData.value.phoneNumber)) {
    if (blur) errors.value.phoneNumber = 'Invalid phone number format';
  } else {
    errors.value.phoneNumber = null;
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
    if (blur) errors.value.birthMonth = 'Month cannot be empty';
  } else {
    errors.value.birthMonth = null;
  }
}
const validateDay = (blur) => {
  if (!formData.value.birthDay) {
    if (blur) errors.value.birthDay = 'Day cannot be empty';
  } else {
    errors.value.birthDay = null;
  }
}
watch(
  [() => formData.value.birthYear, () => formData.value.birthMonth],
  ([newYear, newMonth]) => {
    updateDays(true);
  }
);

</Script>

<template>
  <div class="background">
    <div class="container">
      <div class="signup-box">
        <img src="../components/icons/logo.jpg" alt="Logo" class="logo">
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
              type="email"
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
          <div v-if="errors.confirmPassword" class="error-message">{{ errors.confirmPassword }}</div>
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
          <div v-if="errors.phoneNumber" class="error-message ">{{ errors.phoneNumber }}</div>
          <div class="input-group">
            <label for="gender" class="label">Gender</label>
            <select id="gender" v-model="formData.gender" @blur="validateGender(true)" @input="validateGender(false)">
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
              <select v-model="formData.birthYear" @blur="validateYear(true)" @input="validateYear(false)">
                <option value="">Year</option>
                <option v-for="year in years" :key="year" :value="year">{{ year }}</option>
              </select>
              <select v-model="formData.birthMonth" @blur="validateMonth(true)" @input="validateMonth(false)">
                <option value="">Month</option>
                <option v-for="month in months" :key="month" :value="month">{{ month }}</option>
              </select>
              <select v-model="formData.birthDay" @blur="validateDay(true)" @input="validateDay(false)">
                <option value="">Day</option>
                <option v-for="day in days" :key="day" :value="day">{{ day }}</option>
              </select>
            </div>
          </div>
          <div v-if="errors.birthYear" class="error-message">{{ errors.birthYear }}</div>
          <div class="input-group checkbox">
            <input
              type="checkbox"
              id="isAustralian"
              v-model="formData.isAustralian"
            />
            <label for="isAustralian">I am an Australian resident</label>
          </div>
          <button type="submit" class="signup-btn">Sign Up</button>
        </form>
        <div class="links">
          <router-link to="/Login" class="login-link">Already have an account? Log in</router-link>
        </div>
        <div class="terms">
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.background {
  background-color: #E0F0E9;
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
  background-color: #FFFFFF;
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
  color: #4A4A4A;
  text-align: center;
  margin-bottom: 30px;
}

.input-group {
  margin-bottom: 15px;
  margin-right: 15px;
  width: 100%
}

label {
  display: block;
  margin-bottom: 5px;
  color: #6B6B6B;
}

input {
  width: 100%;
  padding: 10px;
  border: 1px solid #E0F0E9;
  border-radius: 5px;
  font-size: 16px;
}

.signup-btn {
  width: 100%;
  padding: 12px;
  background-color: #B8D8E8;
  color: #4A4A4A;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.signup-btn:hover {
  background-color: #A0C8D8;
}

.links {
  text-align: center;
  margin-top: 20px;
}

.login-link {
  color: #B8D8E8;
  text-decoration: none;
}

.terms {
  margin-top: 20px;
  text-align: center;
  font-size: 14px;
  color: #6B6B6B;
}

.terms-link {
  color: #B8D8E8;
  text-decoration: none;
}
.label {
  width: 100%;
}

@media (max-width: 576px) {
  .signup-btn {
  width: 100%;
  padding: 6px;
  background-color: #B8D8E8;
  color: #4A4A4A;
  border: none;
  border-radius: 5px;
  font-size: 10px;
  cursor: pointer;
  transition: background-color 0.3s;
}
.welcome-text{
  font-size: 10px;
}
  .logo {
  display: block;
  width: 50px;
  height: auto;
  margin: 0 auto 20px;
}

select{
  font-size: 0.5rem; 
    width: 30%; 
    height: auto; 
    border: 1px solid #E0F0E9;
    border-radius: 3px; 
    background-color: white;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
}


  .container {
    padding: 10px;
    font-size: 6pt;
    max-height: 600pt;
  }
  input {
  height: 10pt;
  width: auto;
  padding: 10px;
  border: 1px solid #E0F0E9;
  border-radius: 5px;
  font-size: 6px;
}


  .signup-box {
    padding: 20px;
  }
  .error-message{
    font-size: 4pt;
    margin-top: -3px;
  }
  .date-inputs {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
  .date-inputs-mobile select {
    font-size: 12px; 
    transform: scale(0.7); 
    transform-origin: left top; 
    width: calc(30% / 0.7); 
}
}
@media screen and (max-width: 1440px) {
  .date-inputs {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
}


.date-inputs {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
.date-inputs select {
  flex: 1;
  padding: 10px;
  border: 1px solid #E0F0E9;
  border-radius: 5px;
  font-size: 16px;
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

select {
  width: 100%;
  padding: 10px;
  border: 1px solid #E0F0E9;
  border-radius: 5px;
  background-color: white;
}
</style>