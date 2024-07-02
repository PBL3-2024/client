<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { fetchDemand, editDemand, type Demand } from '@/api/demand'
import { useRoute, useRouter } from 'vue-router'


const route = useRoute();

const demand = ref<Demand>({
  "socCode": "00-0000",
  "value": 0
});

const refreshContent = async function() {
  const socCode = route.params.socCode as string;
  demand.value = (await fetchDemand(socCode)).data;
}

const submit = async function() {
  const socCode = route.params.socCode as string;
  await editDemand(socCode, demand.value);
}

onMounted(refreshContent);
watch(route, refreshContent);

</script>

<template>
  <main>
    <h1>Manage Demand</h1>
    <p>{{ demand?.socCode }}</p>
    <p>{{ demand?.value }}</p>
    <input type="number" v-model="demand.value" />
    <button @click="submit">Submit</button>



  </main>
</template>