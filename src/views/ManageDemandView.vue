<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { fetchDemand, editDemand, type Demand } from '@/api/demand'
import { useRoute, useRouter } from 'vue-router'


const route = useRoute();

const demand = ref<Demand>({
  "socCode": "00-0000",
  "value": 0
});

const oldDemand = ref(0);

const refreshContent = async function() {
  const socCode = route.params.socCode as string;
  demand.value = (await fetchDemand(socCode)).data;
  oldDemand.value = demand.value.value;
}

const submit = async function() {
  const socCode = route.params.socCode as string;
  await editDemand(socCode, demand.value);
}

const reset = async function() {
  demand.value.value = oldDemand.value;
}

onMounted(refreshContent);
watch(route, refreshContent);

</script>

<template>
  <v-row>
    <v-col>
      <v-card>
        <v-card-text>
          <v-text-field
            v-model="demand.value"
            label="Demand"
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn @click="submit">Update</v-btn>
          <v-btn @click="reset">Reset</v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<style>
</style>