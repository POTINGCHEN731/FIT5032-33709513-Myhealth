<script setup>
import { ref } from 'vue'
import therapistData from '../assets/consultants.json'
import { useRouter } from 'vue-router'

const router = useRouter()
const consultantItems = ref(therapistData.therapists)


</script>

<template>
  <div class="insomnia-view">
    <div class="overlay"></div>
    <div class="container py-5">
      <div class="content-wrapper">
        <div class="content">

          <h2 class="text-center mb-4">Consultants</h2>

          <div class="row">
            <div class="col-12 mb-4" v-for="(consultant, index) in consultantItems" :key="index">
              <div class="card card-news">
                <div class="row g-0 h-100">
                  <div class="col-md-4">
                    <img
                      :src="consultant.image"
                      class="img-fluid rounded-start h-100 object-fit-cover"
                      :alt="consultant.name"
                    />
                  </div>
                  <div class="col-md-8 d-flex flex-column">
                    <div class="card-body flex-grow-1">
                      <h5 class="card-title">{{ consultant.name }}</h5>
                      <p class="card-text">{{ consultant.description }}</p>
                    </div>
                    <div
                      class="card-footer bg-transparent border-0 d-flex justify-content-between align-items-center"
                    >
                    <button class="btn btn-primary" @click="router.push('/Contact')">
                        Book Appointment
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.insomnia-view {
  position: relative;
  min-height: 100vh;
  padding: 20px 0;
}

.background-image {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  z-index: -2;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
}

.content-wrapper {
  background-color: white;
  border-radius: 15px;
  overflow: hidden;
}

.content {
  padding: 30px;
}

.card {
  background-color: #f8f9fa;
  border: none;
}

.card-news {
  height: 250px;
  overflow: hidden;
}

.card-body {
  overflow-y: auto;
}

.card-footer {
  padding: 1.5rem 1rem;
}

.average-score {
  font-size: 0.9rem;
  color: #6c757d;
}

@media (max-width: 767px) {
  .card-news {
    height: auto;
  }

  .card-footer {
    flex-direction: column;
    align-items: flex-start;
  }

  .average-score {
    margin-top: 0.5rem;
  }
}
</style>

