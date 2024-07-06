<script setup lang="ts">
import { RouterLink, useRoute } from 'vue-router';

const route = useRoute();

</script>

<template>
  <v-card>
    <v-card-title>Reports</v-card-title>
    <v-row>
      <v-col cols="12">
        <v-btn variant="text" color="blue-accent-4" :to="{ name: 'reportOfType', params: { ...route?.params, type: 'currentOccupation' }}">Users Currently Employed in this Occupation</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-btn variant="text" color="blue-accent-4" :to="{ name: 'reportOfType', params: { ...route?.params, type: 'goalOccupation' }}">Users With This Occupation as Their Goal</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-btn variant="text" color="blue-accent-4" :to="{ name: 'reportOfType', params: { ...route?.params, type: 'certificationEngagement' }}">Engagement With Certifications for This Occupation</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-btn variant="text" color="blue-accent-4" :to="{ name: 'reportOfType', params: { ...route?.params, type: 'newsEngagement' }}">Engagement With News for This Occupation</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-btn variant="text" color="blue-accent-4" :to="{ name: 'reportOfType', params: { ...route?.params, type: 'learningMaterialEngagement' }}">Engagement With Learning Material for This Occupation</v-btn>
      </v-col>
    </v-row>
  </v-card>
</template>