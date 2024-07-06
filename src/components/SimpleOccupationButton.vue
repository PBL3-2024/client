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
  <v-card :title="occupation.title">
    <v-card-actions>
      <v-btn color="blue-accent-4" variant="outlined" @click="() => emit('occupationSelected')">Learn More</v-btn>
    </v-card-actions>
  </v-card>
</template>

<style scoped>
.card-body {
  display: flex;
  flex-direction: row;
  justify-content: end;
}
</style>
