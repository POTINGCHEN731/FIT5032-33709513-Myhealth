<script setup>
import { ref } from 'vue';

const description = "Hello, this is a simple health app that includes information about diseases and related news reports. In addition, it offers personal consultations with therapists and appointment scheduling services. We will contact the therapist to help address your concerns. If you have further questions, please contact us:"

</script>

<template>
  <div>
    <div class="background">
      <div class="container">
        <div class="signup-box">
          <h2 class="welcome-text">Welcome to My Health</h2>
          <p>{{ description }}</p>
          <p>Email: felix0000000@gmail.com </p>
          <p>Phone: 0412345678 </p>
          <p>Time: 9:00a.m. - 6:00p.m.</p>
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
