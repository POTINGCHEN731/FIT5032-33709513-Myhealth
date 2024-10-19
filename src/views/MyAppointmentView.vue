<script setup>
import { ref, onMounted } from 'vue';
import { fetchAppointments } from '../components/GetAppointments'; 
import { userInfo } from '../router/index.js';
import {sendEmail} from '../components/SendEmail';

const appointments = ref([]);

const confirmDelete = async (appointmentId) => {
  const isConfirmed = confirm("Are you sure you want to delete this appointment?");
  if (isConfirmed) {
    await deleteAppointment(appointmentId);
    alert("Appointment deleted successfully!");
  }
};
const deleteAppointment = async (appointmentId) => {
  try {
    const response = await fetch(`https://deleteappointment-3eohwb7mca-uc.a.run.app?id=${appointmentId}`, {
      method: 'DELETE',
    });
    
    const data = await response.json();

    if (response.ok) {
      console.log("Success:", data.message); 
    } else {
      console.error("Error:", data.message); 
    }
  } catch (error) {
    console.error("Error deleting appointment:", error); 
  }
};

onMounted(async () => {
  try {
    const data = await fetchAppointments();
    const filteredAppointments = data.filter(appointment => appointment.email === userInfo.value.email);
    appointments.value = filteredAppointments;
    console.log("Filtered Appointments fetched:", appointments.value);
  } catch (error) {
    console.error("Error fetching appointments:", error);
  }
});
const sendReminder = (Email, name, date, consultants) => {
  sendEmail({
    toEmail: Email,
    name: name,
    date: date,
    consultants: consultants,
  });
};

</script>

<template>
  <div>
    <div class="background">
      <div class="container">
        <div class="signup-box">
          <h2 class="welcome-text">Your Appointment</h2>
          <ul>
            <li v-for="appointment in appointments" :key="appointment.id">
  <div class = 'mt-1'>
    <strong>Name:</strong> {{ appointment.name }}
  </div>
  <div>
    <strong>Date:</strong> {{ appointment.appointmentDate }}
  </div>
  <div>
    <strong>Doctor:</strong> {{ appointment.appointmentDoctor }}
  </div>
  <div>
    <strong>Email:</strong> {{ appointment.email }}
  </div>
  <button class="signup-btn" @click="confirmDelete(appointment.id)">Delete</button>
  <button class="signup-btn" @click="sendReminder(appointment.email, appointment.name, appointment.appointmentDate, appointment.appointmentDoctor)">Send Reminder</button>
</li>
          </ul>
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
  padding: 5px 10px;
  border: none;
  cursor: pointer;
  font-size: 16px;
  border-radius: 5px;
  margin-right: 10px;
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
