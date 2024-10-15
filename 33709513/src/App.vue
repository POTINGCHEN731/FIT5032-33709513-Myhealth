<script setup>
import MenuBar from './components/MenuBar.vue';
</script>

<template>
  <header>
    <MenuBar/>
    </header>
  <main>
    <router-view/>
  </main>
    
</template>

<style scoped>
/* 你的样式 */
</style>
