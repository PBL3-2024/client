<script setup lang="ts">
import { watch, ref, onMounted, computed } from 'vue';
import { fetchChildOccupation, fetchOccupation, type Occupation } from '@/api/occupation';
import { useRoute } from 'vue-router';
import Chart from 'primevue/chart';
import { fetchEmployment } from '@/api/employment';
import { isDetailedSoc } from '@/util/soc-support';
import { randomizeColors } from '@/util/color-support';

const props = defineProps<{
  socCode: string
}>()

const children = ref<Occupation[]>([]);
const pieChartData = ref<any>({});
const pieChartOptions = computed(() => ({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'right'
    }
  }
}));

const refreshContent = async () => {
    const { data: { occupation: childOccupations } } = await fetchChildOccupation(props.socCode);
    children.value = childOccupations;

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
watch(props, refreshContent);
</script>

<template>
  <v-card title="Current Employment">
    <v-card-text>
        <Chart type="pie" :data="pieChartData" :options="pieChartOptions" class="pieChartSize" />
    </v-card-text>
  </v-card>
</template>

<style scoped>
.pieChartSize {
    min-height: 500px;
}
</style>
