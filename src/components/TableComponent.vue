<script setup>
import { ref, computed, onMounted } from 'vue'
import { FilterMatchMode } from '@primevue/core/api'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import axios from 'axios'
import { saveAs } from 'file-saver'
import { sendEmail } from '../components/SendEmail'

const data = ref([])
const selectedData = ref([])
const filters = ref({
  name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  gender: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  age: { value: null, matchMode: FilterMatchMode.EQUALS },
  appointmentDate: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  appointmentDoctor: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  email: { value: null, matchMode: FilterMatchMode.STARTS_WITH }
})

async function fetchData(functionUrl) {
  try {
    const response = await axios.get(functionUrl)
    console.log(response.data)
    data.value = response.data.data
    data.value = response.data.data.map((item) => {
      return {
        ...item,
        age: String(item.age)
      }
    })
    console.log(data.value)
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}

const sendReminder = (Email, name, date, consultants) => {
  sendEmail({
    toEmail: Email,
    name: name,
    date: date,
    consultants: consultants,
  });
  alert("Reminder sent successfully!");
};

const filteredData = computed(() => {
  const nameFilter = filters.value.name.value?.toLowerCase() || ''
  const genderFilter = filters.value.gender.value?.toLowerCase() || ''
  const ageFilter = filters.value.age.value || ''
  const appointmentDateFilter = filters.value.appointmentDate.value?.toLowerCase() || ''
  const appointmentDoctorFilter = filters.value.appointmentDoctor.value?.toLowerCase() || ''
  const emailFilter = filters.value.email.value?.toLowerCase() || ''
  return data.value.filter(
    (item) =>
      (!nameFilter || item.name.toLowerCase().startsWith(nameFilter)) &&
      (!genderFilter || item.gender.toLowerCase().startsWith(genderFilter)) &&
      (!ageFilter || item.age.startsWith(ageFilter)) && //
      (!appointmentDateFilter ||
        item.appointmentDate.toLowerCase().startsWith(appointmentDateFilter)) &&
      (!appointmentDoctorFilter ||
        item.appointmentDoctor.toLowerCase().startsWith(appointmentDoctorFilter)) &&
      (!emailFilter || item.email.toLowerCase().startsWith(emailFilter))
  )
})

onMounted(() => {
  fetchData('https://getallappointments-3eohwb7mca-uc.a.run.app')
})

function exportCSV() {
  let csvContent = 'Name,Gender,Age,Appointment Date,Doctor,Email\n'

  const csvData = filteredData.value
    .map((row) => {
      return `${row.name},${row.gender},${row.age},${row.appointmentDate},${row.appointmentDoctor},${row.email}`
    })
    .join('\n')

  csvContent += csvData

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })

  saveAs(blob, 'appointment_data.csv')
}
</script>

<template>
  <div class="admin-dashboard">
    <div class="dashboard-header">
      <h1>Admin-Dashboard</h1>
    </div>
    <div class="dashboard-content">
      <div class="data-table-container">
        <DataTable
          v-model:filters="filters"
          v-model:selection="selectedData"
          :value="filteredData"
          paginator
          :rows="10"
          dataKey="id"
          filterDisplay="row"
        >
          <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
          <Column
            field="name"
            header="Name"
            style="min-width: 12rem"
            :showFilterMenu="false"
            sortable
          >
            <template #filter="{ filterModel, filterCallback }">
              <InputText
                v-model="filterModel.value"
                type="text"
                placeholder="Search by name"
                @input="filterCallback"
              />
            </template>
          </Column>
          <Column
            field="gender"
            header="Gender"
            style="min-width: 10rem"
            :showFilterMenu="false"
            sortable
          >
            <template #filter="{ filterModel, filterCallback }">
              <InputText
                v-model="filterModel.value"
                type="text"
                placeholder="Search by gender"
                @input="filterCallback"
              />
            </template>
          </Column>
          <Column field="age" header="Age" style="min-width: 6rem" :showFilterMenu="false" sortable>
            <template #filter="{ filterModel, filterCallback }">
              <InputText
                v-model="filterModel.value"
                type="text"
                placeholder="Search by age"
                @input="filterCallback"
              />
            </template>
          </Column>
          <Column
            field="appointmentDate"
            header="Appointment Date"
            style="min-width: 12rem"
            :showFilterMenu="false"
            sortable
          >
            <template #filter="{ filterModel, filterCallback }">
              <InputText
                v-model="filterModel.value"
                type="text"
                placeholder="Search by appointment date"
                @input="filterCallback"
              />
            </template>
          </Column>
          <Column
            field="appointmentDoctor"
            header="Doctor"
            style="min-width: 12rem"
            :showFilterMenu="false"
            sortable
          >
            <template #filter="{ filterModel, filterCallback }">
              <InputText
                v-model="filterModel.value"
                type="text"
                placeholder="Search by doctor"
                @input="filterCallback"
              />
            </template>
          </Column>
          <Column
            field="email"
            header="Email"
            style="min-width: 16rem"
            :showFilterMenu="false"
            sortable
          >
            <template #filter="{ filterModel, filterCallback }">
              <InputText
                v-model="filterModel.value"
                type="text"
                placeholder="Search by email"
                @input="filterCallback"
              />
            </template>
          </Column>
          <Column header="Send Email" style="min-width: 10rem">
            <template #body="slotProps">
              <Button
                label="Send Email"
                class="p-button-sm p-button-success ml-2 p-button-warning signup-btn"
                @click="sendReminder(slotProps.data.email, slotProps.data.name, slotProps.data.appointmentDate, slotProps.data.appointmentDoctor)"
              />
            </template>
          </Column>
        </DataTable>

        <div class="mt-3">
          <Button label="Export to CSV" class=" p-button-sm p-button-success ml-2 p-button-warning signup-btn" @click="exportCSV" :disabled="!filteredData.length" />
          <Button
            label="Send Email to Selected"
            class="ml-2 p-button-warning signup-btn"
            @click="sendEmailToSelected"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.admin-dashboard {
  background-color: #f0f2f5;
  min-height: 100vh;
  padding: 20px;
  box-sizing: border-box;
}

.dashboard-header {
  margin-bottom: 20px;
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

.dashboard-header h1 {
  color: #1a1a1a;
  font-size: 24px;
  font-weight: 600;
}

.dashboard-content {
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: 20px;
}

.data-table-container {
  overflow-x: auto;
}

:deep(.p-datatable) {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
}

:deep(.p-datatable .p-datatable-header) {
  background-color: #f8f9fa;
  border: none;
  padding: 1rem;
  font-weight: 600;
}

:deep(.p-datatable .p-datatable-thead > tr > th) {
  background-color: #f8f9fa;
  border-color: #e9ecef;
  color: #495057;
  font-weight: 600;
  padding: 1rem;
}

:deep(.p-datatable .p-datatable-tbody > tr) {
  background-color: #ffffff;
  transition: background-color 0.2s;
}

:deep(.p-datatable .p-datatable-tbody > tr:hover) {
  background-color: #f1f3f5;
}

:deep(.p-datatable .p-datatable-tbody > tr > td) {
  border-color: #e9ecef;
  padding: 0.75rem 1rem;
}

:deep(.p-paginator) {
  background-color: #ffffff;
  border: none;
  padding: 1rem;
}

:deep(.p-button) {
  border-radius: 4px;
}

:deep(.p-inputtext) {
  border-radius: 4px;
}
</style>
