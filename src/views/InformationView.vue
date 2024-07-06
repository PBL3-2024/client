<script setup lang="ts">
import { watch, ref, onMounted } from 'vue';
import { fetchChildOccupation, fetchOccupation, type Occupation } from '@/api/occupation';
import { useRoute } from 'vue-router';
import Chart from 'primevue/chart';
import { fetchEmployment } from '@/api/employment';
import { isDetailedSoc } from '@/util/soc-support';
import { randomizeColors } from '@/util/color-support';
import ChildOccupationChart from '@/components/ChildOccupationChart.vue';
import UnemploymentChart from '@/components/UnemploymentChart.vue';

const route = useRoute();

const description = ref<string | undefined>();

const refreshContent = async () => {
  const socCode = route.params.socCode as string;
  const { data: occupation } = await fetchOccupation(socCode);

  description.value = occupation.description;
};

watch(route, refreshContent);
onMounted(refreshContent);
</script>

<template>
<v-row>
  <v-col cols="12" md="6" v-if="!isDetailedSoc(route.params.socCode as string)">
    <ChildOccupationChart :socCode="route.params.socCode as string"/>
  </v-col>
  <v-col cols="12" md="6" v-if="route.params.socCode === '00-0000'">
    <UnemploymentChart :socCode="route.params.socCode as string"/>
  </v-col>
  <v-col cols="12" v-if="description">
    <v-card title="About" :text="description">
      <v-card-actions v-if="isDetailedSoc(route.params.socCode as string)">
        <v-btn color="blue-accent-4" variant="outlined">Select As Occupation Goal</v-btn>
      </v-card-actions>
    </v-card>
  </v-col>
</v-row>
</template>

<style scoped>
.pieChartSize {
  width: 100%;
  height: 500px;
}
</style>
