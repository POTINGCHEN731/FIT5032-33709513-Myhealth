<script setup>
import { ref } from 'vue';
import Table from '../components/TableComponent.vue';
import Menubar from 'primevue/menubar' 
const activeSection = ref('table')

const items = [
    {
        label: 'Appointment', command: () => { activeSection.value = 'table' },
    },
    {
        label: 'Chart', command: () => { activeSection.value = 'chart' }
    }
]
</script>
<template>
  <div class="mt-5 row">
    <div class="col-md-8 offset-md-2">
    <Menubar :model="items" />
    <div v-if="activeSection === 'table'">
      <Table />
    </div>
    <div v-if="activeSection === 'chart'">
      <Chart />
    </div>
  </div>
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
