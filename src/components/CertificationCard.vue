<script setup lang="ts">
import { onMounted, watch, ref } from "vue"
import Card from 'primevue/card'
import Button from 'primevue/button'
import { type Certification } from '@/api/certifications'
import { pushClickData } from '@/api/analytics'
import { useAuth0 } from "@auth0/auth0-vue"
import { useProfileStore } from "@/stores/profile"

const props = defineProps<{
  cert: Certification
}>()

const profileStore = useProfileStore();
const auth0 = useAuth0();

async function redirectToCertification() {
    const profile = await profileStore.getOrFetch(auth0);
    await pushClickData({
      timestamp: Date.now(),
      elementId: props.cert.id,
      elementType: 'CERTIFICATIONS',
      userId: profile?.id,
      userPostalCode: profile?.postalCode,
      userCurrentOccupation: profile?.currentSocCode,
      userGoalOccupation: profile?.goalSocCode
    });
    window.location = props.cert.externalLink.url;
}

</script>

<template>
  <v-card>
    <v-card-title>{{ cert.title }}</v-card-title>
    <v-card-subtitle>{{ cert.source }}</v-card-subtitle>
    <v-card-text>{{ cert.description }}</v-card-text>
    <v-card-actions><v-btn @click="redirectToCertification">{{ cert.externalLink.label }}</v-btn></v-card-actions>
  </v-card>
</template>

<style scoped>
.footer {
    display: flex;
    flex-direction: row;
    justify-content: end;
}
</style>
