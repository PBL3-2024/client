<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { fetchEmployment } from '@/api/employment';
import { fetchDemand } from '@/api/demand';

const props = defineProps<{
  socCode: string
}>()

const demandText = ref();
const demandColor = ref('grey');

const refreshEmployment = async () => {
  const [employment, demand] = await Promise.allSettled([
    fetchEmployment(props.socCode),
    fetchDemand(props.socCode)
  ]);

  if (employment.status !== 'fulfilled' || demand.status !== 'fulfilled') {
    return;
  }

  const sortedEmployment = employment.value.data.employment.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  const filteredEmployment = sortedEmployment.filter(e => !e.forecasted);
  const latestEmployment = filteredEmployment[filteredEmployment.length - 1];
  const demandPercentChange = (demand.value.data.value / latestEmployment.value * 100.0) - 100;
  
  if (demandPercentChange > 2) {
    demandColor.value = 'positive-demand';
  } else if (demandPercentChange < -2) {
    demandColor.value = 'negative-demand';
  } else {
    demandColor.value = 'neutral-demand';
  }

  demandText.value = (demandPercentChange > 0 ? '+' : '') + demandPercentChange.toFixed(0) + "%";
};

onMounted(refreshEmployment);
watch(props, refreshEmployment);

</script>

<template>
  <v-card v-if="demandText">
    <v-card-title>Demand <h3 v-if="demandText" :class="[demandColor, 'demand']">{{ demandText }}</h3></v-card-title>
    <v-card-subtitle>This value is managed by your city's managers and reflects the anticipated change in demand for this occupation over the next five years.</v-card-subtitle>
  </v-card>
</template>

<style scoped>
.card-sheet {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0px;
  padding-left: 10px;
  padding-right: 10px;
  gap: 5px;
}

.card-title {
  flex-grow: 1;
}

.card-sparkline {
  height: 5rem;
}

.demand {
  text-align: start;
  display: block;
  width: 5rem;
}

.positive-demand {
  color: green;
}

.negative-demand {
  color: red;
}

.neutral-demand {
  color: grey;
}
</style>
