<script setup lang="ts">
import { onMounted, watch, ref } from "vue"
import VueMarkdown from 'vue-markdown-render'
import Card from 'primevue/card'
import Chip from 'primevue/chip'
import Button from 'primevue/button'
import { type Learning } from '@/api/learning'

const props = defineProps<{
  learning: Learning
}>()

function redirectToLearning(url: string) {
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
