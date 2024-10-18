<script setup>
import { username } from '../router/index.js'
import { ref, onMounted } from 'vue'
import {submitScore } from '../components/NewsRating.js';
import StarRating from 'vue-star-rating'
import newsData from '../assets/news_anorexia.json'
import { AverageRating } from '../components/AverageRating.js';
const newsItems = ref(newsData.newsItems)
const type = 'Anorexia';

const insomniaInfo = {
  title: ' What is Anorexia',
  description:
    'Anorexia nervosa is a serious eating disorder characterized by an intense fear of gaining weight, leading to extreme food restriction, severe weight loss, and a distorted body image. People with anorexia often see themselves as overweight even when they are underweight. It can have severe health consequences, including malnutrition, bone density loss, heart problems, and organ failure. Anorexia affects both physical and mental health, and it often coexists with conditions like anxiety and depression. Early intervention and treatment, such as therapy and medical support, are crucial for recovery.',
  image: 'src/components/icons/Anorexia_1.jpg'
}
onMounted(async () => {
  for (let i = 0; i < newsItems.value.length; i++) {
    const item = newsItems.value[i];
    try {
      const averageRating = await AverageRating(item.id, type); 
      newsItems.value[i].averageRating = averageRating; 
    } catch (error) {
      console.error('Error fetching average rating:', error);
      newsItems.value[i].averageRating = 'N/A'; 
    }
  }
});
</script>

<template>
  <div class="insomnia-view">
    <div class="background-image" :style="{ backgroundImage: `url(${insomniaInfo.image})` }"></div>
    <div class="overlay"></div>
    <div class="container py-5">
      <div class="content-wrapper">
        <div class="content">
          <div class="row mb-5">
            <div class="col-12">
              <div class="card insomnia-overview">
                <div class="row g-0">
                  <div class="col-md-3 d-flex flex-column justify-content-center title-container">
                    <h2 class="card-title">{{ insomniaInfo.title }}</h2>
                  </div>
                  <div class="col-md-8">
                    <div class="card-body">
                      <p class="card-text">{{ insomniaInfo.description }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <h2 class="text-center mb-4">Latest News</h2>

          <div class="row">
            <div class="col-12 mb-4" v-for="(news, index) in newsItems" :key="index">
              <div class="card card-news">
                <div class="row g-0 h-100">
                  <div class="col-md-4">
                    <img
                      :src="news.image"
                      class="img-fluid rounded-start h-100 object-fit-cover"
                      :alt="news.title"
                    />
                  </div>
                  <div class="col-md-8 d-flex flex-column">
                    <div class="card-body flex-grow-1">
                      <h5 class="card-title">{{ news.title }}</h5>
                      <p class="card-text">{{ news.summary }}</p>
                      <StarRating
                        v-model:rating="rating"
                        increment="0.5"
                        :star-size="20"
                        active-color="#007bff"
                        inactive-color="#b0c4de"
                      ></StarRating>
                    </div>
                    <div
                      class="card-footer bg-transparent border-0 d-flex justify-content-between align-items-center"
                    >
                      <button
                        @click="submitScore(type,news.id, news.title, rating,username)"
                        class="btn btn-primary btn-sm"
                      >
                        submit
                      </button>
                      <div class="average-score">
                        <span class="fw-bold">{{ news.averageRating || 'Loading...' }}</span>
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