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

const route = useRoute();
const router = useRouter();

const title = ref<string | null>(null);
const description = ref<string | null>(null);
const children = ref<Occupation[]>([]);

const lineChartData = ref<any>({});
const lineChartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
});
const pieChartData = ref<any>({});
const pieChartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
});

const showTabs = ref<boolean>(true);

const menuTabs = computed(() => [
  { label: 'Information', icon: 'pi pi-home', route: `/occupations/${route.params.socCode}/information` },
  { label: 'News', icon: 'pi pi-newspaper', route: `/occupations/${route.params.socCode}/news` },
  { label: 'Learning', icon: 'pi pi-book', route: `/occupations/${route.params.socCode}/learning` },
  { label: 'Certifications', icon: 'pi pi-certificate', route: `/occupations/${route.params.socCode}/certifications` },
  { label: 'Jobs', icon: 'pi pi-briefcase', route: `/occupations/${route.params.socCode}/jobs` },
  { label: 'Reports', icon: 'pi pi-file', route: `/occupations/${route.params.socCode}/reports` },
  { label: 'Manage Demand', icon: 'pi pi-chart-line', route: `/occupations/${route.params.socCode}/demand` }
]);

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
  pullEmploymentBreakdown(children.value)

  showTabs.value = socCode !== '00-0000';
};

const pullEmploymentBreakdown = async (children: Occupation[]) => {
  const employmentResponses = await Promise.all(children.map(c => fetchEmployment(c.socCode)));
  const employmentData = employmentResponses.map(r => {
    const singleSocEmployment = r.data.employment.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).filter(e => !e.forecasted);
    return singleSocEmployment[singleSocEmployment.length - 1];
  });

const occupationNames = await Promise.all(children.map(o => fetchOccupation(o.socCode)))

  pieChartData.value = {
      labels: employmentData.map(data => {
        const occupation = occupationNames.find(c => c.data.socCode === data.socCode);
        return occupation ? occupation.data.title : data.socCode; //if title cannot be found, resort to soc code
      }),
      datasets: [{
        label: 'Employment',
        data: employmentData.map(data => data.value),
        backgroundColor: ['rgb(192, 75, 75)', 'rgb(75, 192, 192)'],
        hoverBackgroundColor: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)']
      }]
    };
}

const selectOccupation = (socCode: string) => {
  router.replace({ params: { socCode } });
  showTabs.value = socCode !== '00-0000';
};

onMounted(async () => {
  const [unemployment, employment] = await Promise.all([
    fetchUnemployment('00-0000'),
    fetchEmployment('00-0000')
  ]);

    const unemploymentData = unemployment.data.unemployment.reverse();

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
  }
);

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

    <TabMenu v-if="showTabs" :model="menuTabs">
      <template #item="{ item, props }">
        <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
          <a v-ripple :href="href" v-bind="props.action" @click="navigate">
            <span v-bind="props.icon" />
            <span v-bind="props.label">{{ item.label }}</span>
          </a>
        </router-link>
        <a v-else v-ripple :href="item.url" :target="item.target" v-bind="props.action">
          <span v-bind="props.icon" />
          <span v-bind="props.label">{{ item.label }}</span>
        </a>
      </template>
    </TabMenu>
    <div v-if="route.params.socCode !== '00-0000'">
      <RouterView/>
    </div>

    <Chart v-if="route.params.socCode === '00-0000'" type="line" :data="lineChartData" :options="lineChartOptions" class="lineChartSize" />

    <Chart v-if="route.params.socCode === '00-0000'" type="pie" :data="pieChartData" :options="pieChartOptions" class="pieChartSize" />

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
  .pieChartSize{
    width: 100%;
    height: 700px;
  }
  .lineChartSize{
    width: 100%;
    height: 400px;
  }
</style>
