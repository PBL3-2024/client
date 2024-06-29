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

function redirectToLearning(url: string & Location) {
    window.location = url;
}

</script>

<template>
  <Card>
    <template #title>{{ learning.title }}</template>
    <template #subtitle>
        <div><Chip :label="learning.type"/></div>
    </template>
    <template #content>
        <VueMarkdown :source="learning.description"/>
    </template>
    <template #footer>
        <div class="footer">
            <Button v-for="link in learning.externalLink" :label="link.label" @click="redirectToLearning(link.url)" />
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
