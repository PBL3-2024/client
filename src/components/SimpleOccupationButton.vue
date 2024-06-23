<script setup lang="ts">

import { type Occupation } from '@/api/occupation'
import Card from 'primevue/card';
import Button from 'primevue/button';

defineProps<{
  occupation: Occupation
}>()

const emit = defineEmits(['occupationSelected'])

</script>

<template>
  <Card>
    <template #title>{{ occupation.title }}</template>
    <template #footer>
      <div class="card-body">
        <Button @click="() => emit('occupationSelected')">Learn More</Button>
      </div>
    </template>
  </Card>
</template>

<style scoped>
.card-body {
  display: flex;
  flex-direction: row;
  justify-content: end;
}
</style>
