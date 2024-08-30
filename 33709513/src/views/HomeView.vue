<script setup>
import MenuBar from '../components/MenuBar.vue';
</script>

<template>
    <MenuBar />
    <main class="container mt-4">
      <h1 class="text-center">Welcome to My Health</h1>
      <p class="text-center">Please pick a topic.</p>


      <section class="mt-5">
        <!-- <h2 class="text-center mb-4">Common Health Issues</h2> -->
        <div class="row">
          <div class="col-md-4 mb-4">
            <div class="card h-100">
              <router-link to="/InsomiaView" class="nav-link" active-class="active" aria-current="page">
                <img src="../components/icons/insomia.jpg" class="card-img-top" alt="isomia">
              <div class="card-body">
                <h5 class="card-title">Insomia</h5>
              </div>
            </router-link>
            </div>
          </div>
          <div class="col-md-4 mb-4">
            <div class="card h-100">
              <img src="../components/icons/hate.jpg" class="card-img-top" alt="anorexia">
              <div class="card-body">
                <h5 class="card-title">Anorexia</h5>
              </div>
            </div>
          </div>
          <div class="col-md-4 mb-4">
            <div class="card h-100">
              <img src="../components/icons/OCD.jpg" class="card-img-top" alt="OCD">
              <div class="card-body">
                <h5 class="card-title">OCD</h5>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-4 mb-4">
            <div class="card h-100">
              <img src="../components/icons/Addict.jpg" class="card-img-top" alt="Addict">
              <div class="card-body">
                <h5 class="card-title">Addiction</h5>
              </div>
            </div>
          </div>
          <div class="col-md-4 mb-4">
            <div class="card h-100">
              <img src="../components/icons/depression.jpg" class="card-img-top" alt="anorexia">
              <div class="card-body">
                <h5 class="card-title">Depression</h5>
              </div>
            </div>
          </div>
          <div class="col-md-4 mb-4">
            <div class="card h-100">
              <img src="../components/icons/anxiety.jpg" class="card-img-top" alt="OCD">
              <div class="card-body">
                <h5 class="card-title">Anxiety</h5>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
</template>

<script setup>
</script>

<style scoped>
.card-img-top {
  height: 200px;
  object-fit: cover;
}

@media (max-width: 480px) {
  body {
    font-size: 1.5rem;
  }
  .card-text {
    font-size: 1.3rem;
  }
}

@media (min-width: 1441px) {
  body {
    font-size: 4rem;
  }
  .card-text {
    font-size: 3.6rem;
  }
}
</style>
