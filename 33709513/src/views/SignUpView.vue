<script setup>
import { ref,watch} from 'vue'

const months = Array.from({ length: 12 }, (_, i) => i + 1)

const days = ref([])


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
    clearForm()
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
    if (blur) errors.value.birthYear = `Invalid year`
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
  <div class="container mt-5 breakpoint-table">
    <div class="row mb-3">
      <div class="col-md-8 offset-md-2">
        <div class="row mb-3">
        <h1 class="text-center">Register</h1>
        <p class="text-center">
          Welcome to become our member please finish the form.
        </p>
        </div>
        <form @submit.prevent="submitForm">
          <div class="row mb-3">
            <div class="col-md-7 col-sm-7">
              <label for="userEmail" class="form-label">Email</label>
              <input
                type="text"
                class="form-control"
                id="userEmail"
                @blur="() => validateEmail(true)"
                @input="() => validateEmail(false)"
                v-model="formData.userEmail"
              />
              <div v-if="errors.userEmail" class="text-danger">{{ errors.userEmail }}</div>
            </div>
            <div class="row mb-3 mt-2">
            <div class="col-md-4 col-sm-4">
              <label for="password" class="form-label">Password</label>
              <input
                type="password"
                class="form-control"
                id="password"
                @blur="() => validatePassword(true)"
                @input="() => validatePassword(false)"
                v-model="formData.password"
              />
              <div v-if="errors.password" class="text-danger">{{ errors.password }}</div>
              </div>
            <div class="col-md-4 col-sm-4">
              <label for="password" class="form-label">Confirm password</label>
              <input
                type="password"
                class="form-control"
                id="Confirm password"
                v-model="formData.confirmPassword"
                @blur="() =>  validateConfirmPassword(true)"
                @input="() => validateConfirmPassword(false)"
              />
              <div v-if="errors.confirmPassword" class="text-danger">
                {{ errors.confirmPassword }}
              </div>             

        </div>
        <div class="row mt-3 mb-3">
          <div class="col-md-16 col-sm-16  d-flex align-items-center justify-content-center">
            <hr class="flex-grow-1" />
            <span class="mx-2">Personal information</span>
            <hr class="flex-grow-1" />
          </div>
            </div>
            <div class="col-md-4 col-sm-4">
              <label for="username" class="form-label">Username</label>
              <input
                type="text"
                class="form-control"
                id="username"
                @blur="() => validateName(true)"
                @input="() => validateName(false)"
                v-model="formData.username"
              />
              <div v-if="errors.username" class="text-danger">{{ errors.username }}</div>
            </div>

            <div class="col-md-4 col-sm-4">
              <label for="gender" class="form-label">Gender</label>
              <select class="form-select" id="gender" @blur="() => validateGender(true)"
                @change="() => validateGender(false)" v-model="formData.gender">
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>   
              <div v-if="errors.gender" class="text-danger">{{ errors.gender }}</div>  
            </div>
          </div>

          <!-- Birthday Section -->
          <div class="row mb-3">

            <div class="col-md-4 col-sm-4">
              <label for="PhoneNumber" class="form-label">Phone Number</label>
              <input
                type="text"
                class="form-control"
                id="PhoneNumber"
                v-model="formData.phoneNumber"
                @blur="() =>  validatePhoneNumber(true)"
                @input="() => validatePhoneNumber(false)"
              />
              <div v-if="errors.phoneNumber" class="text-danger">
                {{ errors.phoneNumber}}
              </div>  
            </div>

            <div class="col-md-8 col-sm-8">
              <div class="row">
                <div class="col-md-4 col-sm-4">
                  <label for="birthYear" class="form-label">Year</label>
                  <input
                    type="text"
                    class="form-control"
                    id="birthYear"
                    v-model="formData.birthYear"
                    @blur="() => validateYear(true)"
                    @input="() => validateYear(false)"
                  />
                  <div v-if="errors.birthYear" class="text-danger">{{ errors.birthYear }}</div>
                </div>
                <div class="col-md-2 col-sm-2">
                  <label for="birthMonth" class="form-label">Month</label>
                  <select class="form-select" @blur="() => validateMonth(true)"
                    @change="() => validateMonth(false)" v-model="formData.birthMonth">
                    <option value="" disabled></option>
                    <option v-for="month in months" :key="month" :value="month">{{ month }}</option>
                  </select>
                  <div v-if="errors.birthMonth" class="text-danger">{{ errors.birthMonth }}</div>  
                </div>
                <div class="col-md-2 col-sm-2">
                  <label for="birthDay" class="form-label">Day</label>
                  <select class="form-select" @blur="() => validateDay(true)"
                    @change="() => validateDay(false)" v-model="formData.birthDay">
                    <option value="" disabled></option>
                    <option v-for="day in days" :key="day" :value="day">{{ day }}</option>
                  </select>
                  <div v-if="errors.birthDay" class="text-danger">{{ errors.birthDay }}</div> 
                </div>
              </div>
            </div>
          </div>
          </div>

              <div class="form-check mb-3">
                <input
                  type="checkbox"
                  class="form-check-input"
                  id="isAustralian"
                  v-model="formData.isAustralian"
                />
                <label class="form-check-label" for="isAustralian">Australian Resident?</label>
              </div>
          <div class="text-center">
            <button type="submit" class="btn btn-primary me-2">Submit</button>
            <button type="button" class="btn btn-secondary" @click="clearForm">Clear</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  max-width: 80vw;
  margin: 0 auto;
  padding: 10px;
  /* background-color: #e0bfbf; */
  border-radius: 10px;
}

/* Class selectors */
.form {
  text-align: center;
  margin-top: 50px;
}




</style>