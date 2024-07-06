<script setup lang="ts">
import { onMounted, watch, ref } from "vue"
import Card from 'primevue/card'
import Chip from 'primevue/chip'
import Button from 'primevue/button'
import { type News } from '@/api/news'

const props = defineProps<{
  news: News
}>()

function redirectToNews() {
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
