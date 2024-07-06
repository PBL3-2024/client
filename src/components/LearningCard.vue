<script setup lang="ts">
import { onMounted, watch, ref } from "vue"
import VueMarkdown from 'vue-markdown-render'
import Card from 'primevue/card'
import Chip from 'primevue/chip'
import Button from 'primevue/button'
import { type Learning } from '@/api/learning'
import { pushClickData } from '@/api/analytics'
import { useAuth0 } from "@auth0/auth0-vue"
import { useProfileStore } from "@/stores/profile"

const props = defineProps<{
  learning: Learning
}>()

const profileStore = useProfileStore();
const auth0 = useAuth0();

async function redirectToLearning(url: string) {
    const profile = await profileStore.getOrFetch(auth0);
    await pushClickData({
      timestamp: Date.now(),
      elementId: props.learning.id,
      elementType: 'LEARNING_MATERIAL',
      userId: profile?.id,
      userPostalCode: profile?.postalCode,
      userCurrentOccupation: profile?.currentSocCode,
      userGoalOccupation: profile?.goalSocCode
    });
    window.location = url;
}

</script>

<template>
  <v-card>
    <v-card-title>{{ learning.title }}</v-card-title>
    <v-card-subtitle>{{ learning.type }}</v-card-subtitle>
    <v-card-text><VueMarkdown :source="learning.description"/></v-card-text>
    <v-card-actions><v-btn v-for="link in learning.externalLink" @click="redirectToLearning(link.url)">{{ link.label }}</v-btn></v-card-actions>
  </v-card>
</template>

<style scoped>
.footer {
    display: flex;
    flex-direction: row;
    justify-content: end;
}
</style>
