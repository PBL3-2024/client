<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { fetchChildOccupation, fetchOccupation, type Occupation } from '@/api/occupation';
import { useRoute, useRouter } from 'vue-router';
import { isDetailedSoc } from '@/util/soc-support';
import SimpleOccupationButton from '@/components/SimpleOccupationButton.vue';
import OccupationBreadcrumb from '@/components/OccupationBreadcrumb.vue';
import Chart from 'primevue/chart';
import { fetchUnemployment } from '@/api/unemployment';
import { fetchEmployment } from '@/api/employment';

const route = useRoute();
const router = useRouter();

const title = ref<string | null>(null);
const description = ref<string | null>(null);
const children = ref<Occupation[]>([]);

const lineChartData = ref({});
const lineChartOptions = ref({});

const lineChartData2 = ref({});
const lineChartOptions2 = ref({});

const refreshContent = async () => {
  const socCode = route.params.socCode as string;
  const occupation = (await fetchOccupation(socCode)).data;

  title.value = occupation.title;
  description.value = occupation.description;

  if (!isDetailedSoc(socCode)) {
    children.value = (await fetchChildOccupation(socCode)).data.occupation;
  } else {
    children.value = [];
  }
};

const selectOccupation = (socCode: string) => {
  if (socCode) {
    router.push(`/occupations/${socCode}`);
  } else {
    router.push('/');
  }
};

// Fetch unemployment data on component mount
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
  };
});

// Fetch employment data on component mount
onMounted(async () => {
  const employment = (await fetchEmployment('00-0000')).data;
  employment.employment.reverse();
  lineChartData2.value = {
    labels: employment.employment.map(e => e.date.substring(0, 10)),
    datasets: [{
      label: 'Employment',
      data: employment.employment.map(e => e.value),
      fill: false,
      borderColor: 'rgb(192, 75, 75)', // Adjusted color for employment data
      tension: 0.1
    }]
  };
});

// Watch route changes and refresh content
watch(route, refreshContent);

// Initial fetch and refresh content on component mount
onMounted(refreshContent);

</script>

<template>
  <header>
    <h1>Explore Desired Occupation</h1>
  </header>
  <main>
    <OccupationBreadcrumb 
      :soc-code="route.params.socCode as string"
      @occupation-selected="selectOccupation"
    />
    
    <!-- Display first chart for Unemployment -->
    <Chart type="line" :data="lineChartData" :options="lineChartOptions" class="w-full md:w-[30rem]" />

    <!-- Display second chart for Employment -->
    <Chart type="line" :data="lineChartData2" :options="lineChartOptions2" class="w-full md:w-[30rem]" />

    <h2>{{ title }}</h2>
    <p>{{ description }}</p>
    <div class="children" v-if="children.length">
      <SimpleOccupationButton 
        v-for="occupation in children" 
        :key="occupation.socCode" 
        :occupation="occupation" 
        @occupation-selected="selectOccupation(occupation.socCode)"
      />
    </div>
  </main>
</template>

<style scoped>
  .children {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
</style>