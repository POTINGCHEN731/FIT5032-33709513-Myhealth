<script setup>
import { ref, watch, computed } from 'vue';
import { FilterMatchMode } from '@primevue/core/api';
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext';
import axios from 'axios'

const data = ref([]);
const selectedData = ref([]);
const filters = ref({
    name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    gender: { value: null, matchMode: FilterMatchMode.STARTS_WITH }});

async function fetchData(functionUrl) {
  try {
    const response = await axios.get(functionUrl);
    console.log(response.data)
    data.value = response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

const filteredData = computed(() => {
const nameFilter = filters.value.name.value?.toLowerCase() || '';
const genderFilter = filters.value.gender.value?.toLowerCase() || '';
    return data.value.filter(item =>
        (!nameFilter || item.name.toLowerCase().startsWith(nameFilter)) &&
        (!genderFilter || item.gender.toLowerCase().startsWith(genderFilter))
    );
});

</script>

<template>
  <div class="container">
    <div class="card">
      <DataTable paginator :rows="10" dataKey="id" filterDisplay="row" v-model:selection="selectedData" :filters="filters">
        <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
        <Column field="name" header="Name" style="min-width: 12rem" :showFilterMenu="false" sortable >
          <template #filter = "{filterModel, filterCallback}">
            <InputText v-model="filterModel.value" type="text" placeholder="Search by name" @input="filterCallback()" />
          </template>
        </Column>
        <Column field="gender" header="Gender" style="min-width: 10rem" :showFilterMenu="false" sortable>
          <template #filter>
            <InputText type="text" placeholder="Search by gender" />
          </template>
        </Column>
        <Column field="dob" header="DOB" style="min-width: 12rem" sortable></Column>
        <Column field="rating" header="Email" style="min-width: 8rem" sortable></Column>
        <Column header="Send Email" style="min-width: 10rem">
          <template #body>
            <Button label="Send Email" class="p-button-sm p-button-success" />
          </template>
        </Column>
      </DataTable>

      <div class="mt-3">
        <Button label="Export to CSV" />
        <Button label="Send Email to Selected" class="ml-2 p-button-warning" />
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>