<script setup lang="ts">
import { onMounted, watch, ref } from "vue"
import Card from 'primevue/card'
import Button from 'primevue/button'
import { type Certification } from '@/api/certifications'

const props = defineProps<{
  cert: Certification
}>()

function redirectToCertification() {
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
