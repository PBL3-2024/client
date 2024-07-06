<script setup lang="ts">
import { onMounted, watch, ref } from "vue"
import Card from 'primevue/card'
import Chip from 'primevue/chip'
import Button from 'primevue/button'
import { type JobPosting } from '@/api/jobs'
import { type ExternalLink } from '@/api/common'
import { pushClickData } from '@/api/analytics'
import { useAuth0 } from "@auth0/auth0-vue"
import { useProfileStore } from "@/stores/profile"

const props = defineProps<{
  job: JobPosting
}>()

const profileStore = useProfileStore();
const auth0 = useAuth0();

async function redirectToJob(link: ExternalLink) {
    const profile = await profileStore.getOrFetch(auth0);
    await pushClickData({
      timestamp: Date.now(),
      elementId: props.job.id,
      elementType: 'JOB_POSTING',
      userId: profile?.id,
      userPostalCode: profile?.postalCode,
      userCurrentOccupation: profile?.currentSocCode,
      userGoalOccupation: profile?.goalSocCode
    });
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
