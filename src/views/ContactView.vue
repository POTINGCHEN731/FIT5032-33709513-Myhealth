<script setup>
import { ref } from 'vue'
import { userInfo } from '../router/index.js';
import db from '../Firebase/init.js'
import {  addDoc, collection } from 'firebase/firestore'
const appointments = ref([]);
import { fetchAppointments } from '../components/GetAppointments';

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

const formData = ref({
  firstname: '',
  lastname: '',
  appointmentDate: '',
  appointmentDoctor: ''
})

const errors = ref({
  firstname: null,
  lastname: null,
  appointmentDate: null,
  appointmentDoctor: null
})


const validateFirstName = (blur) => {
  const namePattern = /^[a-zA-Z]+$/;
  if (!namePattern.test(formData.value.firstname)) {
    if (blur) errors.value.firstname= 'First name must contain only English letters'
  } else {
    errors.value.firstname = null
  }
}

const validateLastName = (blur) => {
  const namePattern = /^[a-zA-Z]+$/;
  if (!namePattern.test(formData.value.lastname)) {
    if (blur) errors.value.lastname= 'Last name must contain only English letters'
  } else {
    errors.value.lastname = null
  }
}

const validateDate = (blur) => {
  if (!formData.value.appointmentDate) {
    if (blur) errors.value.appointmentDate= 'Date cannot be empty'
  } else {
    errors.value.appointmentDate = null
  }
}
const validateDoctor = (blur) => {
  if (!formData.value.appointmentDoctor) {
    if (blur) errors.value.appointmentDoctor = 'Please select a doctor'
  } else {
    errors.value.appointmentDoctor= null
  }
}
const currentDatePlusTwo = new Date()
currentDatePlusTwo.setDate(currentDatePlusTwo.getDate() + 2)
const minDate = currentDatePlusTwo.toISOString().split('T')[0]
const clearForm = () => {
  formData.value = {
    appointmentDate: '',
    appointmentDoctor: ''
  }
}

const submitForm = async() => {

    formData.value.firstname = sanitizeInput(formData.value.firstname),
    formData.value.lastname = sanitizeInput(formData.value.lastname),
    formData.value.appointmentDate =  sanitizeInput(formData.value.appointmentDate),
    formData.value.appointmentDoctor = sanitizeInput(formData.value.appointmentDoctor)

  validateFirstName(true)
  validateLastName(true)
  validateDate(true)
  validateDoctor(true)

  const hasErrors = Object.values(errors.value).some((error) => error !== null)

if (!hasErrors) {
  const data = await fetchAppointments();
    const filteredAppointments = data.filter(appointment => appointment.email === userInfo.value.email);
    appointments.value = filteredAppointments;
    if (appointments.value.length >= 5) {
      alert('You already have 5 or more appointments, booking is not allowed.');
      return;
    }
  book()
  alert('Appointment booked successfully')
  clearForm()
}
}

const book = async () => {
  try {
    await addDoc(collection(db, "Appointment"), {
    email: userInfo.value.email,
    gender: userInfo.value.gender,
    age: userInfo.value.age,
    name: formData.value.firstname + ' ' + formData.value.lastname,
    appointmentDate: formData.value.appointmentDate,
    appointmentDoctor: formData.value.appointmentDoctor 
  }) }catch (error) {
    console.error("Error adding document: ", error)
  }
}

</script>

<template>
  <div>
    <div class="background">
      <div class="container">
        <div class="signup-box">
          <h2 class="welcome-text">Appointment</h2>
          <form @submit.prevent="submitForm">
            <div>
              <label for="firstname">First Name:</label>
              <input
                type="text"
                v-model="formData.firstname"
                id="firstname"
              />
            </div>
            <div v-if="errors.firstname" class="error-message">{{ errors.firstname }}</div>
            <div>
              <label for="lastname">Last Name:</label>
              <input
                type="text"
                v-model="formData.lastname"
                id="lastname"
              />
            </div>
            <div v-if="errors.lastname" class="error-message">{{ errors.lastname }}</div>
            <div>
              <label for="appointmentDate">Appointment Date:</label>
              <input
                type="date"
                v-model="formData.appointmentDate"
                id="appointmentDate"
                :min="minDate"
              />
            </div>
            <div v-if="errors.appointmentDate" class="error-message">{{ errors.appointmentDate }}</div>
            <div>
              <label for="appointmentDoctor">Appointment Doctor:</label>
              <select
                v-model="formData.appointmentDoctor"
                id="appointmentDoctor"
              >
                <option value="" disabled>Select Doctor</option>
                <option value="Dr. Emily Chen">Dr. Emily Chen</option>
                <option value="Mr. John Miller">Mr. John Miller</option>
                <option value="Mr. Jordan Lin">Mr. Jordan Lin</option>
              </select>
            </div>
            <div v-if="errors.appointmentDoctor" class="error-message">{{ errors.appointmentDoctor }}</div>
            <div class="button-group mt-3">
            <button type="submit" class="signup-btn ">Book</button>
            <button  class="signup-btn " @click="clearForm">Clear</button>
            </div>
          </form>
        </div>
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
  background-color: lightblue;  
  color: black;            
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  font-size: 16px;
  border-radius: 5px;
}


.signup-btn:focus {
  outline: none;  
}

.links {
  text-align: center;
  margin-top: 20px;
}

.login-link {
  color: #b8d8e8;
  text-decoration: none;
}

.button-group {
  justify-content: center;
  display: flex;
  gap: 10px; 
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
  margin-top: 3px;
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