<script setup lang="ts">
import { computed } from 'vue';
import { getUserCurrentOccupationReport, getUserGoalOccupationReport, getCertificationEngagementReport, getNewsEngagementReport, getLearningMaterialEngagementReport } from '@/api/analytics';
import ReportCard from '@/components/ReportCard.vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const report = computed(() => {
  switch (route.params.type as string) {
    case 'currentOccupation': return 'Users Currently Employed in this Occupation';
    case 'goalOccupation': return 'Users With This Occupation as Their Goal';
    case 'certificationEngagement': return 'Engagement With Certifications for This Occupation';
    case 'newsEngagement': return 'Engagement With News for This Occupation';
    case 'learningMaterialEngagement': return 'Engagement With Learning Material for This Occupation';
    default: return 'Unknown';
  }
});
const func = computed(() => {
  switch (route.params.type as string) {
    case 'currentOccupation': return getUserCurrentOccupationReport;
    case 'goalOccupation': return getUserGoalOccupationReport;
    case 'certificationEngagement': return getCertificationEngagementReport;
    case 'newsEngagement': return getNewsEngagementReport;
    case 'learningMaterialEngagement': return getLearningMaterialEngagementReport;
    default: return () => ({ charts: [] });
  }
});
</script>

<template>
  <v-row>
    <v-col cols="12">
      <v-card>
        <v-card-title>Reports / {{ report }}</v-card-title>
        <v-card-actions>
          <v-btn variant="text" color="blue-accent-4" :to="{ name: 'reports', params: { ...route?.params }}">Back to All Reports</v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
  <ReportCard :func="func"/>
</template>