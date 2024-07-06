<script setup lang="ts">
import { watch, ref, onMounted } from 'vue';
import { fetchChildOccupation, fetchOccupation, type Occupation } from '@/api/occupation';
import { useRoute } from 'vue-router';
import Chart from 'primevue/chart';
import { fetchEmployment } from '@/api/employment';
import { isDetailedSoc } from '@/util/soc-support';
import { randomizeColors } from '@/util/color-support';

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
  }).filter(e => e !== undefined);

  const occupationNames = await Promise.all(children.map(o => fetchOccupation(o.socCode)));

  pieChartData.value = {
    labels: employmentData.map(data => {
      const occupation = occupationNames.find(c => c.data.socCode === data.socCode);
      return occupation ? occupation.data.title : data.socCode;
    }),
    datasets: [{
      label: 'Employment',
      data: employmentData.map(data => data.value),
      backgroundColor: randomizeColors(employmentData.length)
    }]
  };
};

onMounted(refreshContent);
watch(route, refreshContent);
</script>

<template>
  <main>
    <Chart type="pie" :data="pieChartData" :options="pieChartOptions" class="pieChartSize" />
  </main>
</template>

<style scoped>
.pieChartSize {
  width: 100%;
  height: 500px;
}
</style>
