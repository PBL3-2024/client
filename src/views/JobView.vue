<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import JobPostingCard from '@/components/JobPostingCard.vue'
import { useRoute, useRouter } from 'vue-router'
import { fetchJobs, type JobPosting } from '@/api/jobs';


const route = useRoute()

const jobs = ref<JobPosting[]>([])

const refreshContent = async function() {
  const socCode = route.params.socCode as string;
  const jobResponse = (await fetchJobs(socCode)).data;
  
  jobs.value = jobResponse.jobPosting;
}

onMounted(refreshContent);
watch(route, refreshContent);

</script>

<template>
  <v-row v-for="j in jobs">
    <v-col>
      <JobPostingCard :job="j"/>
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