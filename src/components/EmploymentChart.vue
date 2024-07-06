<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import Chart from 'primevue/chart';
import { fetchEmployment } from '@/api/employment';

const props = defineProps<{
  socCode: string
}>()

const lineChartData = ref<any>({});
const lineChartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
});

const refreshContent = async () => {
  const employment = await fetchEmployment(props.socCode as string);

  const employmentData = employment.data.employment.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  lineChartData.value = {
    labels: employmentData.map(u => u.date.substring(0, 10)),
    datasets: [{
      label: 'Historical Employment',
      data: employmentData.filter(e => !e.forecasted).map(u => u.value),
      fill: false,
      borderColor: 'rgb(0, 0, 0)',
      tension: 0.1
    }, {
      label: 'Forecasted Employment',
      data: employmentData.map((e, i, a) => e.forecasted || a[i + 1].forecasted ? e.value : undefined),
      fill: false,
      borderColor: 'rgb(255, 0, 0)',
      tension: 0.1
    }]
  };
};

onMounted(refreshContent);
watch(props, refreshContent);
</script>

<template>
  <v-card title="Historical Employment">
    <v-card-text>
      <Chart type="line" :data="lineChartData" :options="lineChartOptions" class="lineChartSize" />
    </v-card-text>
  </v-card>
</template>

<style scoped>
.lineChartSize {
    min-height: 500px;
}
</style>
