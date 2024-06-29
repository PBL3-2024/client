<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { fetchLearningMaterial, type Learning } from '@/api/learning'
import CertificationCard from '@/components/LearningCard.vue'
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
  <section>
    <header>
      <h2>Learning Material</h2>
    </header>
    <main class="content">
      <LearningCard v-for="l in learning" :learning="l"/>
    </main>
  </section>
</template>

<style scoped>
.content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>