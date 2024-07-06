<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue';
import { fetchChildOccupation, fetchOccupation, type Occupation } from '@/api/occupation'; 
import { useRoute, useRouter } from 'vue-router';
import { isDetailedSoc } from '@/util/soc-support';
import SimpleOccupationButton from '@/components/SimpleOccupationButton.vue'; 
import OccupationBreadcrumb from '@/components/OccupationBreadcrumb.vue'; 
import Chart from 'primevue/chart';
import { fetchUnemployment } from '@/api/unemployment'; 
import { fetchEmployment } from '@/api/employment'; 
import TabMenu from 'primevue/tabmenu';

const props = defineProps<{
  socCode: string
}>()

const lineChartData = ref<any>({});
const lineChartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
});

const refreshContent = async () => {
  const unemployment = await fetchUnemployment('00-0000');

  const unemploymentData = unemployment.data.unemployment.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  lineChartData.value = {
    labels: unemploymentData.map(u => u.date.substring(0, 10)),
    datasets: [{
      label: 'Unemployment',
      data: unemploymentData.map(u => u.value),
      fill: false,
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1
    }]
  };
};

onMounted(refreshContent);
watch(props, refreshContent);
</script>

<template>
  <v-card title="Historical Unemployment">
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
