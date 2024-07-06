<script setup lang="ts">
import { onMounted, watch, ref } from "vue"
import Card from 'primevue/card'
import Chip from 'primevue/chip'
import Button from 'primevue/button'
import { type News } from '@/api/news'
import { pushClickData } from '@/api/analytics'
import { useAuth0 } from "@auth0/auth0-vue"
import { useProfileStore } from "@/stores/profile"

const props = defineProps<{
  news: News
}>();

const profileStore = useProfileStore();
const auth0 = useAuth0();

async function redirectToNews() {
    const profile = await profileStore.getOrFetch(auth0);
    await pushClickData({
      timestamp: Date.now(),
      elementId: props.news.id,
      elementType: 'NEWS',
      userId: profile?.id,
      userPostalCode: profile?.postalCode,
      userCurrentOccupation: profile?.currentSocCode,
      userGoalOccupation: profile?.goalSocCode
    });
    window.location = props.news.externalLink.url;
}

</script>

<template>
  <v-card>
    <v-card-title>{{ news.title }}</v-card-title>
    <v-card-subtitle>Published at {{ news.published }}</v-card-subtitle>
    <v-card-text>{{ news.description }}</v-card-text>
    <v-card-actions><v-btn @click="redirectToNews">Read more at {{ news.source }}</v-btn></v-card-actions>
  </v-card>
</template>

<style scoped>
.footer {
    display: flex;
    flex-direction: row;
    justify-content: end;
}
</style>
