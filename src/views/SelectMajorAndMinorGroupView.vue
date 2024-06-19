<script setup lang="ts">
import { ref, watch } from 'vue'
import { fetchOccupation } from '@/api/occupation'
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute()
const title = ref('plumber')
const desciption = ref('andi make a lot of money')

onMounted(async () => {
  const occupation = (await fetchOccupation(route.params.socCode)).data;
  
  title.value = occupation.title
  desciption.value = occupation.description
});


</script>

<template>
  <main>
    <h1>Certification Information</h1>
    <h2>{{ $route.params.socCode }}</h2>
    <h2>{{ title }}</h2>
    <p>{{ desciption }}</p>

    <p> </p>

  </main>
</template>