<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { getUserCurrentOccupationReport } from '@/api/analytics'
import AnalyticsGeoChart from '@/components/AnalyticsGeoChart.vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const props = defineProps<{
  func?: Function
}>()

const charts = ref<any[]>([])

const refreshContent = async function() {
  if (!props.func) {
    charts.value = [];
    return;
  }
  const report = await props.func(route.params.socCode as string);
  charts.value = report.data.charts;
}

onMounted(refreshContent);
watch(route, refreshContent);

</script>

<template>
    <v-row v-for="chart in charts">
        <v-col cols="12" md="6">
            <AnalyticsGeoChart v-if="chart.type === 'map'" :chart="chart"/>
        </v-col>
    </v-row>
</template>

<style scoped>
.footer {
    display: flex;
    flex-direction: row;
    justify-content: end;
}
</style>
