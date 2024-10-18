<script setup>
import { username } from '../router/index.js'
import { ref } from 'vue'
import StarRating from 'vue-star-rating'
import newsData from '../assets/news_anorexia.json'
const newsItems = ref(newsData.newsItems)


const submitScore = (newsId, newsTitle, rating) => {
  if (!username.value) {
    alert('please login first')
    return
  }
  const scores = JSON.parse(localStorage.getItem('newsScores') || '{}')
  const isScore = scores[newsId]?.find(
    (score) => score.username === username.value && score.title === newsTitle
  )
  if (isScore) {
    scores[newsId] = scores[newsId].filter((score) => score.username !== username.value)
    alert('your score for this news has been updated')
  }
  if (!scores[newsId]) {
    scores[newsId] = []
  }
  scores[newsId].push({
    username: username.value,
    title: newsTitle,
    rating: rating
  })

  localStorage.setItem('newsScores', JSON.stringify(scores))
  alert('submit success')
}

const getAverageScore = (newsId, newsTitle) => {
  const scores = JSON.parse(localStorage.getItem('newsScores') || '{}');
  const newsScores = scores[newsId] || [];
  
  const matchingScores = newsScores.filter(score => score.title === newsTitle);
  
  if (matchingScores.length === 0) {
    return 0; 
  }
  
  const totalScore = matchingScores.reduce((acc, score) => acc + score.rating, 0);
  return totalScore / matchingScores.length;
};



const insomniaInfo = {
  title: ' What is Insomnia',
  description:
    'Insomnia is a common sleep disorder characterized by difficulty falling asleep, staying asleep, or both. It can lead to daytime fatigue, mood disturbances, and decreased performance in work or daily activities. Chronic insomnia can have significant impacts on overall health and quality of life.',
  image: 'src/components/icons/Insomia.jpg'
}
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

          <h2 class="text-center mb-4">Latest Insomnia News</h2>

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
                        @click="submitScore(news.id, news.title, rating)"
                        class="btn btn-primary btn-sm"
                      >
                        submit
                      </button>
                      <div class="average-score">
                        <span class="fw-bold">{{ getAverageScore(news.id, news.title).toFixed(1) }}</span>
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
