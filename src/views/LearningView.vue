<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { fetchLearningMaterial, type Learning } from '@/api/learning'
import { useRoute, useRouter } from 'vue-router'
import LearningCard from '@/components/LearningCard.vue';

const route = useRoute()

const learning = ref<Learning[]>([])

const refreshContent = async function() {
  const socCode = route.params.socCode as string;
  const learningResponse = (await fetchLearningMaterial(socCode)).data;
  
  learning.value = learningResponse.learningMaterial
}

onMounted(refreshContent);
watch(route, refreshContent);

</script>

<template>
  <v-row v-for="l in learning">
    <v-col>
      <LearningCard :learning="l"/>
    </v-col>
  </v-row>
</template>

<style scoped>
.content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>