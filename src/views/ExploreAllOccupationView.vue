<script setup lang="ts">
import Chart from 'primevue/chart'
import { ref } from 'vue'
import { fetchUnemployment } from '@/api/unemployment'
import { onMounted } from 'vue';

const pieChartData = ref({
  labels: [
    'Red',
    'Blue',
    'Yellow'
  ],
  datasets: [{
    label: 'My First Dataset',
    data: [300, 50, 100],
    backgroundColor: [
      'rgb(255, 99, 132)',
      'rgb(54, 162, 235)',
      'rgb(255, 205, 86)'
    ],
    hoverOffset: 5
  }]
})
const pieChartOptions = ref({})

const lineChartData = ref({})
const lineChartOptions = ref({})

onMounted(async () => {
  const unemployment = (await fetchUnemployment('00-0000')).data;
  unemployment.unemployment.reverse();
  lineChartData.value = {
    labels: unemployment.unemployment.map(u => u.date.substring(0, 10)),
    datasets: [{
      label: 'Unemployment',
      data: unemployment.unemployment.map(u => u.value),
      fill: false,
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1
    }]
  }
});

</script>

<template>
  <main>
    <h1>Explore All Occupations</h1>
    <p> nice </p>
    <Chart type="line" :data="lineChartData" :options="lineChartOptions" class="w-full md:w-[30rem]" />
    <Chart type="pie" :data="pieChartData" :options="pieChartOptions" class="w-full md:w-[30rem]" />
  </main>
</template>