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
  <Card>
    <template #title>{{ cert.title }}</template>
    <template #subtitle>
        <div>{{ cert.source }}</div>
    </template>
    <template #content>
        {{ cert.description }}
    </template>
    <template #footer>
        <div class="footer">
            <Button :label="cert.externalLink.label" @click="redirectToCertification" />
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
