<script setup lang="ts">
import Chart from 'primevue/chart'
import { ref } from 'vue'

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

const lineChartData = ref({
  labels: ['a', 'n', 'd', 'i', 'b', 'c', 'z'],
  datasets: [{
    label: 'My First Dataset',
    data: [65, 59, 80, 81, 56, 55, 40],
    fill: false,
    borderColor: 'rgb(75, 192, 192)',
    tension: 0.1
  }]
})
const lineChartOptions = ref({})

</script>

<template>
  <main>
    <h1>Explore All Occupations</h1>
    <p> nice </p>
    <Chart type="pie" :data="pieChartData" :options="pieChartOptions" class="w-full md:w-[30rem]" />
    <Chart type="line" :data="lineChartData" :options="lineChartOptions" class="w-full md:w-[30rem]" />

  </main>
</template>