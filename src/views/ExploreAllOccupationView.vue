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
import Tabs from 'primevue/tabs';
import TabList from 'primevue/tablist';
import Tab from 'primevue/tab';
import TabPanels from 'primevue/tabpanels';
import TabPanel from 'primevue/tabpanel';

const route = useRoute();
const router = useRouter();

const title = ref<string | null>(null);
const description = ref<string | null>(null);
const children = ref<Occupation[]>([]);

const lineChartData = ref({});
const lineChartOptions = ref({});

const pieChartData = ref({});
const pieChartOptions = ref({});

const showTabs = ref<boolean>(true); 

const refreshContent = async () => {
  const socCode = route.params.socCode as string;
  const { data: occupation } = await fetchOccupation(socCode);

  title.value = occupation.title;
  description.value = occupation.description;

  if (!isDetailedSoc(socCode)) {
    const { data: { occupation: childOccupations } } = await fetchChildOccupation(socCode);
    children.value = childOccupations;
  } else {
    children.value = [];
  }
  
  // Update tab visibility logic
  showTabs.value = socCode !== '00-0000';
};
const selectOccupation = (socCode: string) => {
  router.push(`/occupations/${socCode}`);
  showTabs.value = socCode !== '00-0000';
};

onMounted(async () => {
  const [unemployment, employment] = await Promise.all([
    fetchUnemployment('00-0000'),
    fetchEmployment('00-0000')
  ]);

  const unemploymentData = unemployment.data.unemployment.reverse();
  const employmentData = employment.data.employment.reverse();

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

  pieChartData.value = {
    labels: employmentData.map(e => e.date.substring(0, 10)),
    datasets: [{
      label: 'Employment',
      data: employmentData.map(e => e.value),
      fill: false,
      borderColor: 'rgb(192, 75, 75)',
      tension: 0.1
    }]
  };
});

watch(route, refreshContent);

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

    <h2>{{ title }}</h2>

    <Tabs v-if="showTabs" value="0">
      <TabList>
        <Tab value="0">Information</Tab>
        <Tab value="1">News</Tab>
        <Tab value="2">Learning</Tab>
        <Tab value="3">Certifications</Tab>
        <Tab value="4">Jobs</Tab>
        <Tab value="5">Reports</Tab>
      </TabList>
      <TabPanels>
        <TabPanel value="0">
          <p class="m-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        </TabPanel>
        <TabPanel value="1">
          <p class="m-0">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.</p>
        </TabPanel>
        <TabPanel value="2">
          <p class="m-0">At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores.</p>
        </TabPanel>
        <TabPanel value="3">
          <p class="m-0">Similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.</p>
        </TabPanel>
        <TabPanel value="4">
          <p class="m-0">Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus.</p>
        </TabPanel>
        <TabPanel value="5">
          <p class="m-0">Harum quidem rerum facilis est et expedita distinctio.</p>
        </TabPanel>
      </TabPanels>
    </Tabs>

    <Chart v-if="route.params.socCode === '00-0000'" type="line" :data="lineChartData" :options="lineChartOptions" class="w-full md:w-[30rem]" />

    <Chart v-if="route.params.socCode === '00-0000'" type="pie" :data="pieChartData" :options="pieChartOptions" class="w-full md:w-[30rem]" />

    <p v-if="!showTabs">{{ description }}</p>

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
