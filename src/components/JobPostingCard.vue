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
  <Card>
    <template #title>{{ job.title }}</template>
    <template #subtitle>
        <div>{{ job.company }}</div>
        <div>{{ job.location }}</div>
        <div>{{ job.salaryRange }}</div>
    </template>
    <template #content>
      <div class="description">
        {{ job.description }}
      </div>
    </template>
    <template #footer>
        <div class="footer">
            <Button v-for="link in job.externalLink" :label="link.label" @click="() => redirectToJob(link)" />
        </div>
    </template>
  </Card>
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
