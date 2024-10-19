<template>
  <div class="chart-card">
    <h2 class="chart-title">Charts</h2>

    <div class="charts-container">
      <div class="chart-wrapper">
        <h3 class="chart-subtitle">Gender Distribution</h3>
        <Chart :type="chartType1" :data="chartData1" :options="chartOptions1" class="chart-item" />
      </div>
      <div class="chart-wrapper">
        <h3 class="chart-subtitle">Consultants Distribution</h3>
        <Chart :type="chartType2" :data="chartData2" :options="chartOptions2" class="chart-item" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Chart from 'primevue/chart'
import { getFirestore, collection, getDocs } from 'firebase/firestore'

const chartData1 = ref({})
const chartData2 = ref({})
const chartType1 = ref('bar')
const chartType2 = ref('pie')
const chartOptions1 = ref({
  responsive: true,
  plugins: {
    legend: {
      position: 'top'
    },
    tooltip: {
      mode: 'index',
      intersect: false
    }
  }
})
const chartOptions2 = ref({
  responsive: true,
  plugins: {
    legend: {
      position: 'top'
    }
  }
})

const db = getFirestore()

async function fetchAppointmentsData() {
  try {
    const querySnapshot = await getDocs(collection(db, 'Appointment'))
    const fetchedData = []
    querySnapshot.forEach((doc) => {
      fetchedData.push(doc.data())
    })

    const genderDistribution = fetchedData.reduce((acc, item) => {
      acc[item.gender] = (acc[item.gender] || 0) + 1
      return acc
    }, {})

    chartData1.value = {
      labels: Object.keys(genderDistribution),
      datasets: [
        {
          label: 'Gender Distribution',
          data: Object.values(genderDistribution),
          backgroundColor: ['#42A5F5', '#66BB6A']
        }
      ]
    }

    const doctorDistribution = fetchedData.reduce((acc, item) => {
      acc[item.appointmentDoctor] = (acc[item.appointmentDoctor] || 0) + 1
      return acc
    }, {})

    chartData2.value = {
      labels: Object.keys(doctorDistribution),
      datasets: [
        {
          data: Object.values(doctorDistribution),
          backgroundColor: ['#42A5F5', '#66BB6A', '#FF6384']
        }
      ]
    }
  } catch (error) {
    console.error('Error fetching data from Firestore:', error)
  }
}

onMounted(() => {
  fetchAppointmentsData()
})
</script>

<style scoped>
.chart-card {
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 24px;
  margin-bottom: 30px;
}

.chart-title {
  color: #2c3e50;
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 20px;
  text-align: center;
}

.charts-container {
  display: flex;
  justify-content: space-between;
  gap: 30px;
}

.chart-wrapper {
  flex: 1;
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.chart-subtitle {
  color: #3498db;
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 15px;
  text-align: center;
}

.chart-item {
  width: 100%;
  height: 300px;
}

@media (max-width: 768px) {
  .charts-container {
    flex-direction: column;
  }

  .chart-wrapper {
    max-width: 100%;
  }
}
</style>
