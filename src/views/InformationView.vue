<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { fetchChildOccupation, fetchOccupation, type Occupation } from '@/api/occupation';
import { useRoute } from 'vue-router';
import Chart from 'primevue/chart';
import { fetchEmployment } from '@/api/employment';
import { isDetailedSoc } from '@/util/soc-support';

const route = useRoute();

const title = ref<string | null>(null);
const children = ref<Occupation[]>([]);
const pieChartData = ref<any>({});
const pieChartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'right'
    }
  }
});

const refreshContent = async () => {
  const socCode = route.params.socCode as string;
  const { data: occupation } = await fetchOccupation(socCode);

  title.value = occupation.title;
  if (!isDetailedSoc(socCode)) {
    const { data: { occupation: childOccupations } } = await fetchChildOccupation(socCode);
    children.value = childOccupations;
  } else {
    children.value = [];
  }

  pullEmploymentBreakdown(children.value);
};

const pullEmploymentBreakdown = async (children: Occupation[]) => {
  const employmentResponses = await Promise.all(children.map(c => fetchEmployment(c.socCode)));
  const employmentData = employmentResponses.map(r => {
    const singleSocEmployment = r.data.employment.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).filter(e => !e.forecasted);
    return singleSocEmployment[singleSocEmployment.length - 1];
  });

  const occupationNames = await Promise.all(children.map(o => fetchOccupation(o.socCode)));

  pieChartData.value = {
    labels: employmentData.map(data => {
      const occupation = occupationNames.find(c => c.data.socCode === data.socCode);
      return occupation ? occupation.data.title : data.socCode;
    }),
    datasets: [{
      label: 'Employment',
      data: employmentData.map(data => data.value),
      backgroundColor: [
        'rgb(192, 75, 75)',     
        'rgb(75, 192, 192)',    
        'rgb(255, 159, 64)',    
        'rgb(75, 192, 75)',    
        'rgb(148, 159, 177)',   
        'rgb(77, 83, 96)',      
        'rgb(235, 83, 86)',     
        'rgb(173, 190, 195)',   
        'rgb(245, 199, 39)',    
        'rgb(66, 66, 66)',      
        'rgb(245, 169, 54)',    
        'rgb(239, 59, 54)',     
        'rgb(239, 108, 54)',    
        'rgb(195, 53, 53)',     
        'rgb(239, 121, 80)',    
        'rgb(239, 135, 54)',    
        'rgb(239, 151, 80)',    
        'rgb(239, 167, 54)',    
        'rgb(239, 183, 80)',    
        'rgb(205, 133, 63)',    
        'rgb(187, 224, 34)',    
        'rgb(187, 134, 34)',    
        'rgb(156, 123, 123)'    
      ],
      hoverBackgroundColor: [
        'rgb(162, 55, 55)',     
        'rgb(55, 162, 162)',    
        'rgb(210, 133, 44)',    
        'rgb(55, 162, 55)',     
        'rgb(118, 129, 147)',   
        'rgb(57, 63, 72)',      
        'rgb(195, 73, 76)',     
        'rgb(141, 155, 161)',   
        'rgb(199, 162, 32)',    
        'rgb(55, 55, 55)',      
        'rgb(199, 109, 32)',    
        'rgb(195, 53, 53)',     
        'rgb(170, 41, 54)',     
        'rgb(195, 94, 53)',     
        'rgb(195, 104, 69)',    
        'rgb(195, 115, 53)',    
        'rgb(195, 127, 69)',    
        'rgb(195, 139, 53)',    
        'rgb(195, 151, 69)',    
        'rgb(162, 104, 49)',    
        'rgb(149, 168, 28)',    
        'rgb(149, 107, 28)',    
        'rgb(124, 98, 98)'      
      ]
    }]
  };
};

onMounted(refreshContent);
</script>

<template>
  <header>
    <h1>Explore Desired Occupation</h1>
  </header>
  <main>
    <h2>{{ title }}</h2>
    <Chart type="pie" :data="pieChartData" :options="pieChartOptions" class="pieChartSize" />
  </main>
</template>

<style scoped>
.pieChartSize {
  width: 100%;
  height: 500px;
}
</style>
