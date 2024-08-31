<script setup>
import MenuBar from '../components/MenuBar.vue'
</script>
<template>
  <MenuBar />
  <div class="about">
    <h1>Here is your appointment</h1>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
