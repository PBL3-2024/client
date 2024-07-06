<script setup lang="ts">
import { onMounted, watch, ref } from "vue"
import Card from 'primevue/card'
import Chip from 'primevue/chip'
import Button from 'primevue/button'
import { type JobPosting } from '@/api/jobs'
import { type ExternalLink } from '@/api/common'

const props = defineProps<{
  job: JobPosting
}>()

function redirectToJob(link: ExternalLink) {
    window.location = link.url;
}

</script>

<template>
  <v-card>
    <v-card-title>{{ job.title }}</v-card-title>
    <v-card-subtitle>
      <div>{{ job.company }}</div>
      <div>{{ job.location }}</div>
      <div>{{ job.salaryRange }}</div>
    </v-card-subtitle>
    <v-card-text>
      <div class="description">
        {{ job.description }}
      </div>
    </v-card-text>
    <v-card-actions><v-btn v-for="link in job.externalLink" @click="redirectToJob(link)">{{ link.label }}</v-btn></v-card-actions>
  </v-card>
</template>

<style scoped>
.footer {
    display: flex;
    flex-direction: row;
    justify-content: end;
}

.description {
  white-space: pre-line;
}
</style>
