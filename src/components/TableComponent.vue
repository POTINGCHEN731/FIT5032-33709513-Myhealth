<script setup>
import { ref, computed, onMounted } from 'vue';
import { FilterMatchMode } from '@primevue/core/api';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import axios from 'axios';
import { saveAs } from 'file-saver';


const data = ref([]);
const selectedData = ref([]);
const filters = ref({
  name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  gender: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  age: { value: null, matchMode: FilterMatchMode.EQUALS },
  appointmentDate: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  appointmentDoctor: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  email: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
});


async function fetchData(functionUrl) {
  try {
    const response = await axios.get(functionUrl);
    console.log(response.data);
    data.value = response.data.data
    data.value = response.data.data.map(item => {
      return {
        ...item, 
        age: String(item.age) 
      };
    });
    console.log(data.value)
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

const filteredData = computed(() => {
    const nameFilter = filters.value.name.value?.toLowerCase() || '';
    const genderFilter = filters.value.gender.value?.toLowerCase() || '';
    const ageFilter = filters.value.age.value || '';
    const appointmentDateFilter = filters.value.appointmentDate.value?.toLowerCase() || '';
    const appointmentDoctorFilter = filters.value.appointmentDoctor.value?.toLowerCase() || '';
    const emailFilter = filters.value.email.value?.toLowerCase() || '';
    return data.value.filter(item =>
        (!nameFilter || item.name.toLowerCase().startsWith(nameFilter)) &&
        (!genderFilter || item.gender.toLowerCase().startsWith(genderFilter)) &&
        (!ageFilter || item.age.startsWith(ageFilter)) && // 
        (!appointmentDateFilter || item.appointmentDate.toLowerCase().startsWith(appointmentDateFilter)) &&
        (!appointmentDoctorFilter || item.appointmentDoctor.toLowerCase().startsWith(appointmentDoctorFilter)) &&
        (!emailFilter || item.email.toLowerCase().startsWith(emailFilter))
    );
});


onMounted(() => {
  fetchData('https://getallappointments-3eohwb7mca-uc.a.run.app');
});

function exportCSV() {
  let csvContent = "Name,Gender,Age,Appointment Date,Doctor,Email\n";

  const csvData = filteredData.value.map(row => {
    return `${row.name},${row.gender},${row.age},${row.appointmentDate},${row.appointmentDoctor},${row.email}`;
  }).join("\n");

  csvContent += csvData;

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });

  saveAs(blob, 'appointment_data.csv');
}

</script>

<template>
  <div class="container">
    <div class="card">
      <DataTable v-model:filters="filters" v-model:selection="selectedData" :value="filteredData" paginator :rows="10"
            dataKey="id" filterDisplay="row">
        <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
        <Column field="name" header="Name" style="min-width: 12rem" :showFilterMenu="false" sortable>
          <template #filter="{filterModel, filterCallback}">
            <InputText v-model="filterModel.value" type="text" placeholder="Search by name" @input="filterCallback" />
          </template>
        </Column>
        <Column field="gender" header="Gender" style="min-width: 10rem" :showFilterMenu="false" sortable>
          <template #filter="{filterModel, filterCallback}">
            <InputText v-model="filterModel.value" type="text" placeholder="Search by gender" @input="filterCallback" />
          </template>
        </Column>
        <Column field="age" header="Age" style="min-width: 6rem" :showFilterMenu="false" sortable>
          <template #filter="{filterModel, filterCallback}">
            <InputText v-model="filterModel.value" type="text" placeholder="Search by age" @input="filterCallback" />
          </template>
        </Column>
        <Column field="appointmentDate" header="Appointment Date" style="min-width: 12rem" :showFilterMenu="false" sortable>
          <template #filter="{filterModel, filterCallback}">
            <InputText v-model="filterModel.value" type="text" placeholder="Search by appointment date" @input="filterCallback" />
          </template>
        </Column>
        <Column field="appointmentDoctor" header="Doctor" style="min-width: 12rem" :showFilterMenu="false" sortable>
          <template #filter="{filterModel, filterCallback}">
            <InputText v-model="filterModel.value" type="text" placeholder="Search by doctor" @input="filterCallback" />
          </template>
        </Column>
        <Column field="email" header="Email" style="min-width: 16rem" :showFilterMenu="false" sortable>
          <template #filter="{filterModel, filterCallback}">
            <InputText v-model="filterModel.value" type="text" placeholder="Search by email" @input="filterCallback" />
          </template>
        </Column>
        <Column header="Send Email" style="min-width: 10rem">
          <template #body="slotProps">
            <Button label="Send Email" class="p-button-sm p-button-success" @click="sendEmail(slotProps.data)" />
          </template>
        </Column>
      </DataTable>

      <div class="mt-3">
        <Button label="Export to CSV" @click="exportCSV" :disabled="!filteredData.length" />
        <Button label="Send Email to Selected" class="ml-2 p-button-warning" @click="sendEmailToSelected" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  padding: 20px;
}
</style> 


