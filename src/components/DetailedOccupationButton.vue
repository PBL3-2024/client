<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { type Occupation } from '@/api/occupation'
import Card from 'primevue/card';
import Button from 'primevue/button';
import { fetchEmployment } from '@/api/employment';
import { fetchDemand } from '@/api/demand';

const props = defineProps<{
  occupation: Occupation
}>()

const emit = defineEmits(['occupationSelected'])

const value = ref([200, 675, 410, 390, 310, 460, 250, 240]);
const gradient = ref(['black', 'black']);
const demandText = ref();
const demandColor = ref('grey');

const refreshEmployment = async () => {
  const [employment, demand] = await Promise.allSettled([
    fetchEmployment(props.occupation.socCode),
    fetchDemand(props.occupation.socCode)
  ]);

  if (employment.status !== 'fulfilled') {
    return;
  }

  const sortedEmployment = employment.value.data.employment.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  value.value = sortedEmployment.map(e => e.value);
  
  gradient.value = sortedEmployment.map(e => {
    if (e.forecasted) {
      return 'red';
    } else {
      return 'black';
    }
  });

  if (demand.status !== 'fulfilled') {
    return;
  }

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
  <v-sheet class="card-sheet" elevation="1">
    <h3 class="card-title">{{ occupation.title }}</h3>
    <v-sparkline
    class="card-sparkline"
    :model-value="value"
    :gradient="gradient"
    gradient-direction="left"
    color="black"
    line-width="2"
    padding="16"
    :smooth="true"
  ></v-sparkline>
    <h3 v-if="demandText" :class="[demandColor, 'demand']">{{ demandText }}</h3>
    <v-btn color="blue-accent-4" variant="outlined" @click="() => emit('occupationSelected')">Learn More</v-btn>
  </v-sheet>
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
