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
  <Card>
    <template #title>{{ news.title }}</template>
    <template #subtitle>
        <div>Published at {{ news.published }} <Chip v-for="category in news.categories" :label="category"/></div>
    </template>
    <template #content>
        {{ news.description }}
    </template>
    <template #footer>
        <div class="footer">
            <Button :label="`Read more at ${news.source}`" @click="redirectToNews" />
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
</style>
