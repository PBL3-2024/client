

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

const lineChartData2 = ref({});
const lineChartOptions2 = ref({});

const showTabs = ref<boolean>(false); 

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
  
  if (socCode === '00-0000') {
    showTabs.value = false;
  } else {
    showTabs.value = socCode.endsWith('0');
  }
};

const selectOccupation = (socCode: string) => {
  if (socCode) {
    router.push(`/occupations/${socCode}`);
    if (socCode === '00-0000') {
      showTabs.value = false;
    } else {
      showTabs.value = socCode.endsWith('00');
    }
  } else {
    router.push('/');
  }
};

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

onMounted(async () => {
  const employment = (await fetchEmployment('00-0000')).data;
  employment.employment.reverse();
  lineChartData2.value = {
    labels: employment.employment.map(e => e.date.substring(0, 10)),
    datasets: [{
      label: 'Employment',
      data: employment.employment.map(e => e.value),
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
          <p class="m-0">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </TabPanel>
        <TabPanel value="1">
          <p class="m-0">
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim
            ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Consectetur, adipisci velit, sed quia non numquam eius modi.
          </p>
        </TabPanel>
        <TabPanel value="2">
          <p class="m-0">
            At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa
            qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus.
          </p>
        </TabPanel>
        <TabPanel value="3">
          <p class="m-0">
            At vero eos et accusamus et is praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa
            qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus.
          </p>
        </TabPanel>
        <TabPanel value="4">
          <p class="m-0">
            At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa
            qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum qa nobis est eligendi optio cumque nihil impedit quo minus.
          </p>
        </TabPanel>
        <TabPanel value="5">
          <p class="m-0">
            At vero eos et accusamus et iusto odio  laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus.
          </p>
        </TabPanel>
      </TabPanels>
    </Tabs>


    <Chart v-if="route.params.socCode === '00-0000'" type="line" :data="lineChartData" :options="lineChartOptions" class="w-full md:w-[30rem]" />

    <Chart v-if="route.params.socCode === '00-0000'" type="line" :data="lineChartData2" :options="lineChartOptions2" class="w-full md:w-[30rem]" />

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
